#!/usr/bin/env node

import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const variants = [
  { id: 'general', fileName: 'kevin-mok-resume.pdf' },
  { id: 'web-dev', fileName: 'kevin-mok-resume-web-dev.pdf' },
  { id: 'aws', fileName: 'kevin-mok-resume-aws.pdf' },
  { id: 'python', fileName: 'kevin-mok-resume-python.pdf' },
  { id: 'aws-web-dev', fileName: 'kevin-mok-resume-aws-web-dev.pdf' },
  { id: 'aws-python', fileName: 'kevin-mok-resume-aws-python.pdf' },
  { id: 'web-dev-django', fileName: 'kevin-mok-resume-web-dev-django.pdf' },
  { id: 'it-support', fileName: 'kevin-mok-resume-it-support.pdf' },
  { id: 'it-support-aws', fileName: 'kevin-mok-resume-it-support-aws.pdf' },
  { id: 'sales', fileName: 'kevin-mok-resume-sales.pdf' },
  { id: 'call-centre', fileName: 'kevin-mok-resume-call-centre.pdf' },
];

const host = process.env.RESUME_PDF_HOST || '127.0.0.1';
const port = process.env.RESUME_PDF_PORT || '3100';
const chromeBin = process.env.CHROME_BIN || 'google-chrome';
const origin = `http://${host}:${port}`;
const outputDir = path.join(process.cwd(), 'public', 'resume');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServerReady(serverProcess, timeoutMs = 60000) {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    if (serverProcess.exitCode !== null) {
      throw new Error(`Next.js server exited early with code ${serverProcess.exitCode}`);
    }

    try {
      const response = await fetch(`${origin}/resume`);
      if (response.ok) {
        return;
      }
    } catch {
      // Server is not up yet.
    }

    await sleep(500);
  }

  throw new Error(`Timed out waiting for ${origin}/resume after ${timeoutMs}ms`);
}

function runCommand(command, args, label) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stderr = '';

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', (error) => {
      reject(new Error(`${label} failed to start: ${error.message}`));
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${label} failed with exit code ${code}\n${stderr}`));
    });
  });
}

function buildResumeUrl(variantId) {
  const url = new URL('/resume', origin);
  url.searchParams.set('variant', variantId);
  url.searchParams.set('render', 'pdf');
  return url.toString();
}

async function generateVariantPdf(variant) {
  const pdfPath = path.join(outputDir, variant.fileName);
  const url = buildResumeUrl(variant.id);

  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=20000',
    '--no-pdf-header-footer',
    `--print-to-pdf=${pdfPath}`,
    url,
  ];

  await runCommand(chromeBin, args, `PDF generation for ${variant.fileName}`);
}

function startNextServer() {
  const nextBin = path.join(process.cwd(), 'node_modules', '.bin', 'next');
  return spawn(nextBin, ['start', '-H', host, '-p', port], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

async function shutdownServer(serverProcess) {
  if (serverProcess.exitCode !== null) {
    return;
  }

  serverProcess.kill('SIGTERM');

  const forceKillTimer = setTimeout(() => {
    if (serverProcess.exitCode === null) {
      serverProcess.kill('SIGKILL');
    }
  }, 5000);

  await new Promise((resolve) => {
    serverProcess.once('exit', () => {
      clearTimeout(forceKillTimer);
      resolve();
    });
  });
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const server = startNextServer();
  let serverStdout = '';
  let serverStderr = '';

  server.stdout.on('data', (chunk) => {
    serverStdout += chunk.toString();
  });

  server.stderr.on('data', (chunk) => {
    serverStderr += chunk.toString();
  });

  try {
    await waitForServerReady(server);

    for (const variant of variants) {
      // Keep output visible in CI/local builds for easier diagnosis.
      console.log(`Generating ${variant.fileName} (${variant.id})`);
      await generateVariantPdf(variant);
    }

    console.log(`Generated ${variants.length} resume PDFs in ${outputDir}`);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(
      `${detail}\n\nNext.js server stdout:\n${serverStdout}\n\nNext.js server stderr:\n${serverStderr}`
    );
  } finally {
    await shutdownServer(server);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
