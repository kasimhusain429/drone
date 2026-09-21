"use client";
import React, { useRef, useState, forwardRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CanvasSequence = forwardRef<HTMLDivElement, {}>((props, containerRef) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalFrames = 240;
  
  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    canvas.width = 1400;
    canvas.height = 720;
    
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const indexStr = i.toString().padStart(4, '0');
      img.src = `/frames/frame_${indexStr}.webp`;
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        if (i === 1) {
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      };
      images.push(img);
    }
    
    const playhead = { frame: 0 };
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });
    
    tl.to(playhead, {
      frame: totalFrames - 1,
      snap: "frame",
      ease: "none",
      onUpdate: () => {
        const currentImage = images[playhead.frame];
        if (currentImage && currentImage.complete && currentImage.naturalWidth > 0) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
        }
      }
    });
  }, { scope: canvasRef });
  
  return (
    <div ref={containerRef} className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center will-change-transform">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover"
      />
      {imagesLoaded < 100 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-3 rounded-full backdrop-blur-md font-medium shadow-2xl">
          Loading Cinematic Experience... {Math.round((imagesLoaded / totalFrames) * 100)}%
        </div>
      )}
    </div>
  );
});

CanvasSequence.displayName = 'CanvasSequence';

export default CanvasSequence;
