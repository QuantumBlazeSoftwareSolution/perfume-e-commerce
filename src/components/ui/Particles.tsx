"use client";

import { useRef, useEffect } from "react";

export default function Particles({
  className = "",
  quantity = 30,
}: {
  className?: string;
  quantity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use a fixed color for gold particles (rgba 201, 169, 110)
    
    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        // use parent width/height if relative container, else window
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = window.innerHeight * 1.5 * Math.random(); // Scatter initially down
        this.size = Math.random() * 3 + 1; // 1 to 4px
        this.speedY = Math.random() * 0.4 + 0.1; // Slow upward drift
        this.opacity = Math.random() * 0.2 + 0.05; // 0.05 to 0.25
      }

      update() {
        this.y -= this.speedY;

        // Reset if it goes off screen
        if (this.y < -10) {
          this.y = (canvas?.height || window.innerHeight) + 10;
          this.x = Math.random() * (canvas?.width || window.innerWidth);
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(201, 169, 110, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      resize();
      particles = [];
      for (let i = 0; i < quantity; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener("resize", init);

    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationFrameId);
    };
  }, [quantity]);

  return <canvas ref={canvasRef} className={`absolute top-0 left-0 w-full h-full pointer-events-none ${className}`} />;
}
