
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimations = () => {
  useEffect(() => {
    // Hero section parallax
    gsap.to('.hero-bg', {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    // Text reveal animations
    gsap.fromTo('.reveal-text', 
      { 
        y: 100,
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.reveal-text',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Project cards animation
    gsap.fromTo('.project-card',
      {
        y: 60,
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Background color transitions
    ScrollTrigger.create({
      trigger: '.services-section',
      start: 'top center',
      end: 'bottom center',
      onEnter: () => gsap.to('body', { backgroundColor: '#0f0f23', duration: 0.5 }),
      onLeave: () => gsap.to('body', { backgroundColor: '#000000', duration: 0.5 }),
      onEnterBack: () => gsap.to('body', { backgroundColor: '#0f0f23', duration: 0.5 }),
      onLeaveBack: () => gsap.to('body', { backgroundColor: '#000000', duration: 0.5 })
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return null;
};

export default ScrollAnimations;
