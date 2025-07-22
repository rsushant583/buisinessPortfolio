import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const icons = [
  {
    label: 'Logo',
    svg: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="12" fill="url(#logoGradient)" filter="url(#shadow)" />
        <defs>
          <radialGradient id="logoGradient" cx="0.5" cy="0.5" r="0.5" fx="0.3" fy="0.3" gradientTransform="matrix(1 0 0 1 0 0)">
            <stop stopColor="#fff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#6C63FF" />
          </radialGradient>
          <filter id="shadow" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.15" />
          </filter>
        </defs>
      </svg>
    ),
  },
  {
    label: 'Home',
    svg: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 14L14 6L24 14" stroke="#6C63FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="8" y="14" width="8" height="8" rx="2" fill="#fff" stroke="#6C63FF" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: 'Projects',
    svg: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="20" height="12" rx="4" fill="#fff" stroke="#6C63FF" strokeWidth="2" />
        <circle cx="14" cy="14" r="2.5" fill="#6C63FF" />
      </svg>
    ),
  },
  {
    label: 'Contact',
    svg: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="20" height="12" rx="6" fill="#fff" stroke="#6C63FF" strokeWidth="2" />
        <path d="M4 10L14 18L24 10" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const DynamicNavbar: React.FC = () => {
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    gsap.set(navbar, {
      borderRadius: '0.75rem',
      left: '50%',
      x: '-50%',
      top: '2rem',
      width: '90vw',
      maxWidth: '420px',
      boxShadow: '0 8px 32px rgba(76, 70, 255, 0.12)',
      background: 'rgba(255,255,255,0.18)',
      backdropFilter: 'blur(16px)',
      border: '1.5px solid rgba(255,255,255,0.25)',
      transform: 'translateX(-50%)',
    });

    ScrollTrigger.create({
      trigger: '.hero-section',
      start: 'bottom top+=40',
      end: '+=200',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(navbar, {
          borderRadius: progress > 0.5 ? '2.5rem' : '0.75rem',
          top: progress > 0.5 ? '2rem' : '2rem',
          width: progress > 0.5 ? '320px' : '90vw',
          maxWidth: progress > 0.5 ? '320px' : '420px',
          background: progress > 0.5 ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.18)',
          boxShadow: progress > 0.5 ? '0 8px 32px rgba(76, 70, 255, 0.18)' : '0 8px 32px rgba(76, 70, 255, 0.12)',
          duration: 0.5,
          ease: 'power2.out',
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <nav
      ref={navbarRef}
      className="fixed z-40 left-1/2 top-8 flex justify-between items-center px-4 py-2 glass-navbar"
      style={{
        transform: 'translateX(-50%)',
        transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
        background: 'rgba(255,255,255,0.18)',
        borderRadius: '0.75rem',
        boxShadow: '0 8px 32px rgba(76, 70, 255, 0.12)',
        backdropFilter: 'blur(16px)',
        border: '1.5px solid rgba(255,255,255,0.25)',
        width: '90vw',
        maxWidth: '420px',
      }}
    >
      {icons.map((icon, idx) => (
        <button
          key={icon.label}
          className="group flex flex-col items-center justify-center flex-1 py-1 mx-1 rounded-xl hover:scale-110 active:scale-95 transition-transform duration-200"
          aria-label={icon.label}
        >
          <span className="drop-shadow-lg group-hover:drop-shadow-xl">
            {icon.svg}
          </span>
          <span className="text-xs mt-1 text-[#6C63FF] font-semibold opacity-80 group-hover:opacity-100">
            {icon.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default DynamicNavbar; 