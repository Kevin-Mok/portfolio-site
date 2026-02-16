import React from 'react';
import Image from 'next/image';
import type { ContactInfo } from '@/lib/resume-data';

interface ResumeHeaderProps {
  contact: ContactInfo;
}

export const ResumeHeader: React.FC<ResumeHeaderProps> = ({ contact }) => {
  const contactItems = [
    {
      icon: '/icons/resume/smartphone.svg',
      label: contact.phone,
      href: `tel:${contact.phone}`,
      alt: 'phone',
    },
    {
      icon: '/icons/resume/envelope.svg',
      label: contact.email,
      href: `mailto:${contact.email}`,
      alt: 'email',
    },
    {
      icon: '/icons/resume/linkedin.svg',
      label: contact.linkedin,
      href: `https://www.linkedin.com/in/Kev-Mok`,
      alt: 'linkedin',
    },
    {
      icon: '/icons/resume/github.svg',
      label: contact.github,
      href: `https://github.com/Kevin-Mok`,
      alt: 'github',
    },
  ];

  return (
    <header className="resume-header">
      <h1 style={{ fontSize: '1.8em', fontWeight: 'bold', margin: 0 }}>Kevin Mok</h1>
      <p style={{ fontSize: '1.1em', margin: '0.25rem 0 0 0', color: '#747369' }}>
        Software Engineer
      </p>

      <div className="resume-header-grid">
        {contactItems.map((item) => (
          <a
            key={item.alt}
            href={item.href}
            target={item.alt !== 'phone' && item.alt !== 'email' ? '_blank' : undefined}
            rel={item.alt !== 'phone' && item.alt !== 'email' ? 'noopener noreferrer' : undefined}
            className="contact-item"
          >
            <Image
              src={item.icon}
              alt={item.alt}
              width={20}
              height={20}
              className="contact-icon"
            />
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </header>
  );
};
