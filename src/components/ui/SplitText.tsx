"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SplitText({ 
  text, 
  className = "", 
  delay = 0,
  triggerOnScroll = false 
}: { 
  text: string; 
  className?: string; 
  delay?: number;
  triggerOnScroll?: boolean;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = (require('react')).useState(false);

  (require('react')).useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;
    
    const chars = containerRef.current.querySelectorAll('.split-char');
    
    // Set initial state
    gsap.set(chars, { y: '110%', opacity: 0 });

    const animConfig = {
      y: '0%',
      opacity: 1,
      stagger: 0.03,
      duration: 1.2,
      ease: 'power4.out',
      delay: triggerOnScroll ? 0 : delay,
    };

    if (triggerOnScroll) {
      gsap.to(chars, {
        ...animConfig,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      });
    } else {
      gsap.to(chars, animConfig);
    }

  }, [delay, triggerOnScroll]);

  if (!mounted) return <span className={className}>{text}</span>;

  return (
    <span ref={containerRef} className={`inline-block ${className}`} style={{ overflow: "hidden" }}>
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          className="split-char inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal', paddingBottom: "0.1em" }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
