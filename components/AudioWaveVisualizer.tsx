"use client";

import { useEffect, useRef } from "react";

export function AudioWaveVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.04;
      const width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
      const height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);

      ctx.clearRect(0, 0, width, height);

      const numBars = 48;
      const barWidth = width / numBars;
      const centerY = height / 2;

      for (let i = 0; i < numBars; i++) {
        // Multi-frequency simulated audio waveform
        const wave1 = Math.sin(time + i * 0.18);
        const wave2 = Math.cos(time * 0.7 + i * 0.28);
        const wave3 = Math.sin(time * 1.5 + i * 0.08);
        
        const combined = Math.abs(wave1 * 0.45 + wave2 * 0.35 + wave3 * 0.2);
        const barHeight = Math.max(6, combined * (height * 0.85));

        const x = i * barWidth;
        const y = centerY - barHeight / 2;

        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, "rgba(181, 255, 63, 0.95)"); // Neon green
        gradient.addColorStop(0.5, "rgba(124, 58, 237, 0.75)"); // Violet
        gradient.addColorStop(1, "rgba(181, 255, 63, 0.3)");

        ctx.fillStyle = gradient;
        ctx.fillRect(x + 2, y, barWidth - 4, barHeight);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-16 overflow-hidden rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md px-3 py-2 flex items-center">
      <div className="absolute left-3 top-2 flex items-center gap-2 z-10">
        <span className="h-2 w-2 rounded-full bg-[var(--accent-green)] animate-pulse" />
        <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
          Signal // Live Waveform
        </span>
      </div>
      <canvas ref={canvasRef} className="w-full h-full block opacity-75" />
    </div>
  );
}
