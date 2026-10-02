import React, { useEffect, useRef } from 'react';

/**
 * Atmospheric dark wave topography horizon canvas.
 * Draws subtle luminous curved horizon lines and chrome-reflective waves
 * inspired by the futuristic visual reference.
 */
export const DarkWaveHorizon: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    let time = 0;
    const lineCount = 38;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep dark background with subtle radial glow
      const cx = width / 2;
      const cy = height * 0.45;

      const radialGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, width * 0.65);
      radialGrad.addColorStop(0, 'rgba(255, 255, 255, 0.07)');
      radialGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.02)');
      radialGrad.addColorStop(0.7, 'rgba(7, 7, 10, 0.4)');
      radialGrad.addColorStop(1, 'rgba(6, 6, 9, 0.95)');
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // Sweeping perspective lines converging toward the luminous center horizon
      time += 0.005;

      for (let i = 0; i < lineCount; i++) {
        const progress = i / lineCount;
        const yBase = cy + Math.pow(progress, 1.8) * (height - cy);
        const amplitude = 18 * Math.sin(time + progress * 3.5);
        const opacity = Math.sin(progress * Math.PI) * 0.18 + (i % 2 === 0 ? 0.05 : 0.02);

        ctx.beginPath();
        ctx.strokeStyle = `rgba(220, 225, 240, ${Math.max(0.02, opacity)})`;
        ctx.lineWidth = progress > 0.85 ? 1.5 : 0.8;

        const points = 40;
        for (let j = 0; j <= points; j++) {
          const x = (j / points) * width;
          const distFromCenter = Math.abs(x - cx) / (width / 2);
          
          // Curved horizon wave formula
          const curvature = (1 - Math.pow(distFromCenter, 2)) * -40 * (1 - progress);
          const wave = Math.sin(j * 0.25 + time * 1.5 + i * 0.2) * (amplitude * (1 - distFromCenter * 0.5));
          const y = yBase + curvature + wave;

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Vertical perspective vanishing grid lines
      const verticalLines = 28;
      for (let k = 0; k < verticalLines; k++) {
        const xOffset = ((k - verticalLines / 2) / (verticalLines / 2));
        const startX = cx + xOffset * 60;
        const endX = cx + xOffset * (width * 0.65);
        const vOpacity = (1 - Math.abs(xOffset)) * 0.08;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(200, 210, 230, ${Math.max(0.01, vOpacity)})`;
        ctx.lineWidth = 0.6;
        ctx.moveTo(startX, cy + 10);
        ctx.lineTo(endX, height);
        ctx.stroke();
      }

      // Horizon highlight edge
      const horizonGrad = ctx.createLinearGradient(0, cy, width, cy);
      horizonGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      horizonGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.1)');
      horizonGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.35)');
      horizonGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.1)');
      horizonGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.strokeStyle = horizonGrad;
      ctx.lineWidth = 1.2;
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Bottom fade into the dark surface */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#060609] via-[#060609]/80 to-transparent" />
      {/* Top subtle vignette */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#060609] to-transparent" />
    </div>
  );
};
