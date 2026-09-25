"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Reusable component to handle IntersectionObserver for auto-play
const VideoCard = ({ videoSrc, poster, title, subtitle, info }: { videoSrc: string, poster: string, title: string, subtitle: string, info: React.ReactNode }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6, // Play when 60% visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      });
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  return (
    <div className="w-[85vw] md:w-auto h-auto md:h-[40vh] min-h-[400px] md:min-h-[300px] md:max-h-[500px] aspect-[4/5] md:aspect-[16/9] flex-shrink-0 relative group rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#141414] shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none"></div>
      
      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        loop
        muted
        playsInline
      />

      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20 pointer-events-none">
        <h4 className="text-2xl md:text-4xl font-bold tracking-tight mb-2 text-white">{title}</h4>
        <p className="text-xs md:text-base text-neutral-300 font-medium max-w-lg mb-6">{subtitle}</p>
        
        {/* Extra info slot */}
        {info}
      </div>
    </div>
  );
};

export default function VideoGalleryShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const wrapper = scrollWrapperRef.current;
    if (wrapper) {
      // Calculate max horizontal scroll distance
      const scrollWidth = wrapper.scrollWidth;
      const clientWidth = document.documentElement.clientWidth;
      
      // If the content is wider than the screen, animate it.
      if (scrollWidth > clientWidth) {
        const xMax = -(scrollWidth - clientWidth + 96); // Add padding to ensure the last card isn't cut off
        
        gsap.to(wrapper, {
          x: xMax,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            // The pinning duration equals the width of the scroll area, creating a 1:1 scroll speed
            end: () => `+=${scrollWidth}`
          }
        });
      }
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-transparent text-white h-[100svh] flex flex-col justify-center overflow-hidden">
      <div className="px-8 md:px-24 mb-6 md:mb-8 mt-12 md:mt-0">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tighter mb-4 md:mb-6 leading-[1.05]">
            See our drones in <i className="text-lime-400 font-bold">action.</i>
          </h2>
          <p className="text-base md:text-xl text-neutral-400 leading-relaxed max-w-2xl font-medium">
            Keep scrolling to view our latest commercial footage. Videos will automatically play as they come into view.
          </p>
        </div>
      </div>

      {/* Horizontal GSAP Scroll Track */}
      <div className="w-full">
        <div ref={scrollWrapperRef} className="flex flex-nowrap gap-6 md:gap-12 px-8 md:px-24 w-max">
          
          <VideoCard 
            videoSrc="/videos/construction_new.f136.mp4"
            poster="/images/construction_progress_1789982002449.jpg"
            title="Construction Monitoring"
            subtitle="Capture a comprehensive visual record of the site establishing a reliable baseline for progress monitoring, verification, and dispute protection."
            info={
              <div className="flex gap-4">
                 <span className="px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold bg-white/5 backdrop-blur-md">Pre-Construction</span>
                 <span className="px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold bg-white/5 backdrop-blur-md">Progress</span>
              </div>
            }
          />

          <VideoCard 
            videoSrc="/videos/solar_coverr.mp4"
            poster="/images/solar_inspection_1789981984532.jpg"
            title="Solar Inspection"
            subtitle="Capture clear, detailed imagery of your roof’s current condition, with optional thermal imaging to help identify potential issues."
            info={
              <div className="flex gap-4">
                 <span className="px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold bg-white/5 backdrop-blur-md">Thermal Imaging</span>
                 <span className="px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold bg-white/5 backdrop-blur-md">Commercial</span>
              </div>
            }
          />

          <VideoCard 
            videoSrc="/videos/tracking.mp4"
            poster="/images/roofing_inspection_1789981969219.jpg"
            title="Property Maintenance"
            subtitle="Regular inspections help identify issues early, protect your property’s value, and reduce costly maintenance and compliance risks."
            info={
              <div className="flex gap-4">
                 <span className="px-4 py-1.5 rounded-full border border-lime-400/50 text-lime-400 text-xs font-semibold bg-lime-400/10 backdrop-blur-md">New Feature</span>
                 <span className="px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold bg-white/5 backdrop-blur-md">Real Estate</span>
              </div>
            }
          />

        </div>
      </div>
    </section>
  );
}
