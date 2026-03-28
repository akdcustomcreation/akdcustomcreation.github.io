import { useEffect, useRef } from 'react';

const LiquidDistortion = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return; // Skip effect on mobile

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Ripple points
    const ripples: Array<{
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
    }> = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Add new ripple occasionally
      if (Math.random() > 0.7) {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          radius: 0,
          maxRadius: 100 + Math.random() * 50,
          opacity: 0.3,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let frameCount = 0;

    const animate = () => {
      frameCount++;
      // Render every 2nd frame for performance
      if (frameCount % 2 === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw ripples
        for (let i = ripples.length - 1; i >= 0; i--) {
          const ripple = ripples[i];
          ripple.radius += 2;
          ripple.opacity -= 0.005;

          if (ripple.opacity <= 0) {
            ripples.splice(i, 1);
            continue;
          }

          // Draw ripple
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(208, 255, 89, ${ripple.opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Inner ripple
          if (ripple.radius > 20) {
            ctx.beginPath();
            ctx.arc(ripple.x, ripple.y, ripple.radius - 15, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(208, 255, 89, ${ripple.opacity * 0.5})`;
            ctx.stroke();
          }
        }

        // Draw cursor glow
        const gradient = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          150
        );
        gradient.addColorStop(0, 'rgba(208, 255, 89, 0.05)');
        gradient.addColorStop(0.5, 'rgba(208, 255, 89, 0.02)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default LiquidDistortion;
