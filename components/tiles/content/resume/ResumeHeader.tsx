import React from 'react';
import Image from 'next/image';
import type { ContactInfo } from '@/lib/resume-data';

interface ResumeHeaderProps {
  contact: ContactInfo;
}

export const ResumeHeader: React.FC<ResumeHeaderProps> = ({ contact }) => {
  const leftContactItems = [
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
  ];

  const rightContactItems = [
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
      <h1 className="resume-name">Kevin Mok</h1>

      <div className="resume-contact-columns">
        <div className="resume-contact-column resume-contact-column-left">
          {leftContactItems.map((item) => (
            <a key={item.alt} href={item.href} className="contact-item contact-item-left">
              <Image
                src={item.icon}
                alt={item.alt}
                width={18}
                height={18}
                className="contact-icon"
              />
              <span className="contact-label">{item.label}</span>
            </a>
          ))}
        </div>

        <div className="resume-contact-column resume-contact-column-right">
          {rightContactItems.map((item) => (
            <a
              key={item.alt}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item contact-item-right"
            >
              <Image
                src={item.icon}
                alt={item.alt}
                width={18}
                height={18}
                className="contact-icon"
              />
              <span className="contact-label">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};
