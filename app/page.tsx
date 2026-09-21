"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import CanvasSequence from '@/components/CanvasSequence';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  
  // UI Refs
  const headerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  const heroRef = useRef<HTMLDivElement>(null);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLDivElement>(null);
  const cardBottomRef = useRef<HTMLDivElement>(null);
  
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const carouselTitleRef = useRef<HTMLHeadingElement>(null);
  
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Force initial states immediately before any scroll logic
    // Drone is scaled to 70% and pushed right to completely clear the Hero text
    gsap.set(canvasWrapperRef.current, { x: '15vw', scale: 0.7 });
    
    gsap.set(cardRef.current, { scale: 0.5, opacity: 0 });
    gsap.set([cardLeftRef.current, cardRightRef.current, cardBottomRef.current], { opacity: 0 });
    gsap.set(carouselWrapperRef.current, { xPercent: 100, opacity: 0 });
    gsap.set(carouselTitleRef.current, { opacity: 0, y: 20 });
    gsap.set(ctaRef.current, { scale: 0.9, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, 
      }
    });
    
    // --- Phase 1 -> Phase 2 Transition (0 - 35%) ---
    tl.to(heroRef.current, { opacity: 0, y: -40, duration: 1.5, ease: "power1.inOut" }, 0);
    
    // Canvas moves to center and shrinks heavily to fit between the glass card text
    tl.to(canvasWrapperRef.current, { x: 0, scale: 0.4, duration: 2.5, ease: "power2.inOut" }, 1);

    // Glass Card Catch (15% - 45%)
    tl.to(cardRef.current, { scale: 1, opacity: 1, duration: 2, ease: "back.out(1.2)" }, 1.5);
    tl.fromTo(cardLeftRef.current, { x: -50 }, { x: 0, opacity: 1, duration: 1 }, 2);
    tl.fromTo(cardRightRef.current, { x: 50 }, { x: 0, opacity: 1, duration: 1 }, 2);
    tl.fromTo(cardBottomRef.current, { y: 20 }, { y: 0, opacity: 1, duration: 1 }, 2.5);

    // --- Phase 2 -> Phase 3 Transition (45% - 60%) ---
    tl.to(cardRef.current, { xPercent: -150, duration: 1.5, ease: "power2.inOut" }, 4.5);
    
    // Canvas moves left (avoiding the carousel coming from the right)
    tl.to(canvasWrapperRef.current, { x: '-20vw', scale: 0.5, duration: 1.5, ease: "power2.inOut" }, 4.5);

    // Light Transition (45%)
    tl.to(bgRef.current, { backgroundColor: '#F9F9F9', duration: 0.5 }, 4.5);
    tl.to(headerRef.current, { color: '#000000', duration: 0.5 }, 4.5);
    
    // Carousel enters
    tl.to(carouselWrapperRef.current, { xPercent: 0, opacity: 1, duration: 1.5, ease: "power2.out" }, 5);
    tl.to(carouselTitleRef.current, { opacity: 1, y: 0, duration: 1 }, 5.5);

    // --- Phase 3 -> Phase 4 Transition (75% - 85%) ---
    tl.to(carouselWrapperRef.current, { xPercent: 100, opacity: 0, duration: 1.5, ease: "power2.inOut" }, 7.5);
    tl.to(carouselTitleRef.current, { opacity: 0, duration: 0.5 }, 7.5);

    // Canvas returns to center for final CTA
    tl.to(canvasWrapperRef.current, { x: 0, scale: 0.6, duration: 1.5, ease: "power2.inOut" }, 7.5);

    // Minimalist CTA enters
    tl.to(ctaRef.current, { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }, 8.5);

  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="relative h-[400vh] text-white font-sans antialiased overflow-x-hidden selection:bg-lime-400 selection:text-black">
      
      {/* Z-0: Fixed Background */}
      <div className="fixed inset-0 z-0 bg-[#0a0a0a]" ref={bgRef}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_50%)]"></div>
      </div>
      
      {/* Z-20: Fixed Canvas Sequence */}
      <CanvasSequence ref={canvasWrapperRef} />
      
      {/* Z-30: Fixed Header */}
      <header ref={headerRef} className="fixed top-0 left-0 w-full z-30 px-8 py-6 flex justify-between items-center transition-colors duration-300">
        <div className="flex items-center gap-3 font-bold text-xl tracking-tight">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          Drone
        </div>
        <nav className="hidden md:flex backdrop-blur-md border border-current/10 rounded-full px-6 py-2 gap-8 text-sm font-medium">
          <a href="#" className="hover:opacity-70 transition">Home</a>
          <a href="#" className="hover:opacity-70 transition">Services</a>
          <a href="#" className="hover:opacity-70 transition">Portfolio</a>
          <a href="#" className="hover:opacity-70 transition">Contact</a>
        </nav>
        <div className="flex gap-4 text-sm font-semibold">
          <button className="px-5 py-2 rounded-full border border-current hover:opacity-70 transition">Login</button>
          <button className="px-5 py-2 rounded-full bg-lime-400 text-black border border-lime-400 hover:bg-lime-500 transition">Sign Up</button>
        </div>
      </header>

      {/* Z-10: Fixed UI Layer */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        
        {/* Phase 1: Hero */}
        <div className="absolute inset-0 flex items-center px-8 md:px-24">
          <div ref={heroRef} className="max-w-[400px] pointer-events-auto">
            <div className="text-xs font-bold tracking-[0.3em] text-neutral-400 mb-4 uppercase">Premium Drone Services</div>
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
              Commercial<br />Drone Footage.
            </h1>
            <p className="text-lg text-neutral-400 mb-10 leading-relaxed">
              Professional videos and imagery that give decision-makers a clear view of project progress.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button className="px-8 py-3 bg-lime-400 text-black font-semibold rounded-full hover:bg-lime-500 transition shadow-[0_0_20px_rgba(163,230,53,0.3)]">
                View Services
              </button>
              <button className="px-8 py-3 bg-transparent text-current border border-current/30 font-semibold rounded-full hover:bg-white/10 transition">
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Phase 2: Glass Card */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            ref={cardRef} 
            className="w-[90vw] max-w-[1200px] h-[70vh] bg-[#191919]/60 backdrop-blur-[20px] border border-white/10 rounded-[40px] shadow-2xl flex flex-col justify-between p-12 pointer-events-auto will-change-transform"
          >
            <div className="flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                 <span className="text-xs font-bold tracking-widest text-neutral-400">PREMIUM</span>
              </div>
              <button className="px-6 py-2 rounded-full border border-white/20 text-sm font-medium hover:bg-white/10 transition">Dronefuze</button>
            </div>
            
            <div className="flex justify-between items-center w-full mt-8 text-white">
              {/* Reduced width to 25% to leave massive 50% gap in center for the drone */}
              <div ref={cardLeftRef} className="w-[25%]">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Roofing &<br/>Solar</h2>
                <p className="text-neutral-400 text-base md:text-lg">Detailed thermal and visual inspections.</p>
              </div>
              <div className="w-[50%]"></div>
              <div ref={cardRightRef} className="w-[25%] text-right">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Construction</h2>
                <p className="text-neutral-400 text-base md:text-lg">Clear views for your stakeholders.</p>
              </div>
            </div>
            
            <div ref={cardBottomRef} className="flex justify-between items-end text-white">
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight">FAA-107 Certified<br/>and Fully Insured</h3>
              <button className="px-8 py-3 bg-white/10 rounded-full text-sm font-medium hover:bg-white/20 transition flex items-center gap-2">
                Learn More 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Phase 3: Carousel */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-24">
          <h2 ref={carouselTitleRef} className="text-4xl md:text-5xl font-bold text-black mb-12 tracking-tight">Premium Quality Imagery</h2>
          
          <div ref={carouselWrapperRef} className="w-full pl-[45vw] pr-12 flex gap-8 overflow-visible will-change-transform pointer-events-auto">
            <div className="flex-shrink-0 w-[400px]">
              <img src="/images/roofing_inspection_1789981969219.jpg" alt="Roofing" className="w-full h-[300px] object-cover rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-white" />
            </div>
            <div className="flex-shrink-0 w-[400px]">
              <img src="/images/solar_inspection_1789981984532.jpg" alt="Solar" className="w-full h-[300px] object-cover rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-white mt-12" />
            </div>
            <div className="flex-shrink-0 w-[500px]">
              <img src="/images/construction_progress_1789982002449.jpg" alt="Construction" className="w-full h-[300px] object-cover rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-white -mt-8" />
            </div>
          </div>
        </div>

        {/* Phase 4: CTA */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div ref={ctaRef} className="flex flex-col items-center will-change-transform pointer-events-auto">
            <h2 className="text-[12vw] font-black text-black tracking-tighter leading-none mb-12">Dronefuze</h2>
            <button className="px-12 py-5 bg-[#0a0a0a] text-white text-xl font-bold rounded-full hover:bg-neutral-800 transition hover:scale-105 transform shadow-xl flex items-center gap-3">
              Book an Inspection
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
