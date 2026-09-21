"use client";
import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
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
  
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [loadingText, setLoadingText] = useState("ESTABLISHING CONNECTION...");

  useEffect(() => {
    if (imagesLoaded === totalFrames) {
      // Add a small delay so the user sees 100% before it fades out
      const timeout = setTimeout(() => setIsFullyLoaded(true), 600);
      return () => clearTimeout(timeout);
    }
    
    const percent = imagesLoaded / totalFrames;
    if (percent > 0.8) setLoadingText("CALIBRATING GIMBAL...");
    else if (percent > 0.4) setLoadingText("LOADING HIGH-RES ASSETS...");
  }, [imagesLoaded]);

  return (
    <>
      {/* Premium Full-Screen Loading Overlay */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${isFullyLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <div className="relative flex flex-col items-center w-full max-w-md px-8">
          {/* Drone/Targeting Icon */}
          <div className="mb-12 relative flex items-center justify-center">
             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a3e635" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse relative z-10">
                <path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="4"/>
             </svg>
             {/* Glow effect */}
             <div className="absolute inset-0 bg-lime-400/20 blur-xl rounded-full scale-150 animate-pulse"></div>
          </div>
          
          {/* Loading Bar Container */}
          <div className="w-full h-[2px] bg-white/10 overflow-hidden mb-6 relative">
            <div 
              className="absolute top-0 left-0 h-full bg-lime-400 transition-all duration-75 ease-out"
              style={{ width: `${Math.round((imagesLoaded / totalFrames) * 100)}%` }}
            ></div>
          </div>
          
          {/* Telemetry Text */}
          <div className="flex justify-between w-full text-xs font-mono tracking-widest text-neutral-400 uppercase">
            <span className="animate-pulse">{loadingText}</span>
            <span className="text-lime-400 font-bold">{Math.round((imagesLoaded / totalFrames) * 100)}%</span>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center will-change-transform">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-contain md:object-cover"
        />
      </div>
    </>
  );
});

CanvasSequence.displayName = 'CanvasSequence';

export default CanvasSequence;
