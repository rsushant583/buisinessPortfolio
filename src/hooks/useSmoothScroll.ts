import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined' && gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

// Recommended: import 'lenis/dist/lenis.css' in your main entry for best experience
// import 'lenis/dist/lenis.css';

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07, // lower = smoother, 0.07 is very smooth
      smooth: true,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      gestureDirection: 'vertical',
      direction: 'vertical',
      infinite: false,
    });

    // Use GSAP's ticker for best sync with ScrollTrigger
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // GSAP time is in seconds, Lenis expects ms
    });
    gsap.ticker.lagSmoothing(0);

    lenis.on('scroll', ScrollTrigger.update);
    ScrollTrigger.defaults({ scroller: window });

    // Optional: expose lenis to window for debugging
    // (window as any).lenis = lenis;

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
    };
  }, []);
} 