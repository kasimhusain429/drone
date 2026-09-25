"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import CanvasSequence, { CanvasSequenceApi } from '@/components/CanvasSequence';
import VideoGalleryShowcase from '@/components/VideoGalleryShowcase';
import ServicesSection from '@/components/ServicesSection';
import ResidentialSection from '@/components/ResidentialSection';
import FAQSection from '@/components/FAQSection';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Sections
  const heroRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const residentialRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  
  // Elements
  const headerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasApiRef = useRef<CanvasSequenceApi | null>(null);
  const dronePlayhead = useRef({ frame: 0 });

  // Card 1
  const c1Container = useRef<HTMLDivElement>(null);
  const c1Left = useRef<HTMLDivElement>(null);
  const c1Right = useRef<HTMLDivElement>(null);
  const c1Bottom = useRef<HTMLDivElement>(null);
  
  // Card 2
  const c2Container = useRef<HTMLDivElement>(null);
  const c2Left = useRef<HTMLDivElement>(null);
  const c2Right = useRef<HTMLDivElement>(null);
  const c2Bottom = useRef<HTMLDivElement>(null);

  // Gallery Images
  const floatingTitleRef = useRef<HTMLHeadingElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null); 
  const img2Ref = useRef<HTMLDivElement>(null); 
  const img3Ref = useRef<HTMLDivElement>(null); 
  const img4Ref = useRef<HTMLDivElement>(null); 
  const img5Ref = useRef<HTMLDivElement>(null); 

  useGSAP(() => {
    const onFrameUpdate = () => {
      if (canvasApiRef.current) {
        canvasApiRef.current.setFrame(dronePlayhead.current.frame);
      }
    };

    let mm = gsap.matchMedia(containerRef);

    mm.add("(min-width: 768px)", () => {
      // MASTER ROTATION TIMELINE
      gsap.to(dronePlayhead.current, {
        frame: 360,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5
        },
        onUpdate: onFrameUpdate
      });

      // 1. Initial State
      gsap.set(canvasWrapperRef.current, { x: '15vw', y: 0, scale: 0.7, opacity: 1 });

      // 2. Hero exit
      gsap.to(heroRef.current, {
        scrollTrigger: { trigger: heroRef.current, start: "center top", end: "bottom top", scrub: 1 },
        opacity: 0, y: -40
      });

      // 3. Card 1 Enter/Exit
      const st1 = { trigger: card1Ref.current, start: "top bottom", end: "center center", scrub: 1 };
      gsap.fromTo(canvasWrapperRef.current, 
        { x: '15vw', y: 0, scale: 0.7, opacity: 1 },
        { scrollTrigger: st1, x: 0, scale: 0.45, opacity: 1, immediateRender: false }
      );
      
      gsap.fromTo(c1Container.current, 
        { scale: 0.8, opacity: 0 }, 
        { scrollTrigger: st1, scale: 1, opacity: 1, ease: "back.out(1.2)", immediateRender: false }
      );
      gsap.fromTo(c1Left.current, { x: -50, opacity: 0 }, { scrollTrigger: st1, x: 0, opacity: 1, immediateRender: false });
      gsap.fromTo(c1Right.current, { x: 50, opacity: 0 }, { scrollTrigger: st1, x: 0, opacity: 1, immediateRender: false });
      gsap.fromTo(c1Bottom.current, { y: 20, opacity: 0 }, { scrollTrigger: st1, y: 0, opacity: 1, immediateRender: false });

      gsap.fromTo(c1Container.current, 
        { y: 0, opacity: 1 },
        { scrollTrigger: { trigger: card1Ref.current, start: "center top", end: "bottom top", scrub: 1 },
          y: -100, opacity: 0, immediateRender: false 
        }
      );

      // 4. ServicesSection (Hidden)
      const stServices = { trigger: servicesRef.current, start: "top bottom", end: "center center", scrub: 1 };
      gsap.fromTo(canvasWrapperRef.current,
        { x: 0, y: 0, scale: 0.45, opacity: 1 },
        { scrollTrigger: stServices, x: '-25vw', scale: 0.45, opacity: 0, immediateRender: false }
      );

      // 5. Card 2 Enter/Exit (Visible)
      const st2 = { trigger: card2Ref.current, start: "top bottom", end: "center center", scrub: 1 };
      gsap.fromTo(canvasWrapperRef.current,
        { x: '-25vw', y: 0, scale: 0.45, opacity: 0 },
        { scrollTrigger: st2, x: 0, scale: 0.45, opacity: 1, immediateRender: false }
      );
      
      gsap.fromTo(c2Container.current, 
        { scale: 0.8, opacity: 0 }, 
        { scrollTrigger: st2, scale: 1, opacity: 1, ease: "back.out(1.2)", immediateRender: false }
      );
      gsap.fromTo(c2Left.current, { x: -50, opacity: 0 }, { scrollTrigger: st2, x: 0, opacity: 1, immediateRender: false });
      gsap.fromTo(c2Right.current, { x: 50, opacity: 0 }, { scrollTrigger: st2, x: 0, opacity: 1, immediateRender: false });
      gsap.fromTo(c2Bottom.current, { y: 20, opacity: 0 }, { scrollTrigger: st2, y: 0, opacity: 1, immediateRender: false });

      gsap.fromTo(c2Container.current, 
        { y: 0, opacity: 1 },
        { scrollTrigger: { trigger: card2Ref.current, start: "center top", end: "bottom top", scrub: 1 },
          y: -100, opacity: 0, immediateRender: false 
        }
      );

      // 6. ResidentialSection (Hidden)
      const stRes = { trigger: residentialRef.current, start: "top bottom", end: "center center", scrub: 1 };
      gsap.fromTo(canvasWrapperRef.current,
        { x: 0, y: 0, scale: 0.45, opacity: 1 },
        { scrollTrigger: stRes, x: '-25vw', scale: 0.45, opacity: 0, immediateRender: false }
      );

      // 7. Gallery (Visible)
      const stGal = { trigger: galleryRef.current, start: "top bottom", end: "center center", scrub: 1 };
      gsap.fromTo(canvasWrapperRef.current,
        { x: '-25vw', y: 0, scale: 0.45, opacity: 0 },
        { scrollTrigger: stGal, x: 0, scale: 0.5, opacity: 1, immediateRender: false }
      );
      
      gsap.fromTo(floatingTitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, scrollTrigger: stGal, immediateRender: false });
      gsap.fromTo(img1Ref.current, { y: 150, opacity: 0 }, { y: -80, opacity: 1, scrollTrigger: stGal, immediateRender: false });
      gsap.fromTo(img2Ref.current, { y: 100, opacity: 0 }, { y: -40, opacity: 1, scrollTrigger: stGal, immediateRender: false });
      gsap.fromTo(img3Ref.current, { y: 80, opacity: 0 }, { y: -60, opacity: 1, scrollTrigger: stGal, immediateRender: false });
      gsap.fromTo(img4Ref.current, { y: 150, opacity: 0 }, { y: -30, opacity: 1, scrollTrigger: stGal, immediateRender: false });
      gsap.fromTo(img5Ref.current, { y: 100, opacity: 0 }, { y: -100, opacity: 1, scrollTrigger: stGal, immediateRender: false });

      // Gallery Exit & Light BG Transition
      const galExitSt = { trigger: galleryRef.current, start: "center top", end: "bottom top", scrub: 1 };
      gsap.to(bgRef.current, { scrollTrigger: galExitSt, backgroundColor: '#F9F9F9' });
      gsap.to(headerRef.current, { scrollTrigger: galExitSt, color: '#000' });
      
      gsap.fromTo(floatingTitleRef.current, { opacity: 1, y: 0 }, { scrollTrigger: galExitSt, opacity: 0, y: -150, immediateRender: false });
      gsap.fromTo(img1Ref.current, { opacity: 1, y: -80 }, { scrollTrigger: galExitSt, opacity: 0, y: -150, immediateRender: false });
      gsap.fromTo(img2Ref.current, { opacity: 1, y: -40 }, { scrollTrigger: galExitSt, opacity: 0, y: -150, immediateRender: false });
      gsap.fromTo(img3Ref.current, { opacity: 1, y: -60 }, { scrollTrigger: galExitSt, opacity: 0, y: -150, immediateRender: false });
      gsap.fromTo(img4Ref.current, { opacity: 1, y: -30 }, { scrollTrigger: galExitSt, opacity: 0, y: -150, immediateRender: false });
      gsap.fromTo(img5Ref.current, { opacity: 1, y: -100 }, { scrollTrigger: galExitSt, opacity: 0, y: -150, immediateRender: false });
      gsap.fromTo(canvasWrapperRef.current, 
        { x: 0, y: 0, scale: 0.5, opacity: 1 },
        { scrollTrigger: galExitSt, opacity: 0, immediateRender: false }
      );

      // 8. Video Section (Hidden)
      const stVideo = { trigger: videoSectionRef.current, start: "top bottom", end: "center center", scrub: 1 };
      gsap.to(bgRef.current, { scrollTrigger: stVideo, backgroundColor: '#0a0a0a' });
      gsap.to(headerRef.current, { scrollTrigger: stVideo, color: '#fff' });
      gsap.fromTo(canvasWrapperRef.current,
        { x: 0, y: 0, scale: 0.5, opacity: 0 },
        { scrollTrigger: stVideo, x: '30vw', y: '-25vh', scale: 0.5, opacity: 0, immediateRender: false }
      );

      // 9. Footer (Visible)
      const stFooter = { trigger: footerRef.current, start: "top bottom", end: "center center", scrub: 1 };
      gsap.fromTo(canvasWrapperRef.current,
        { x: '30vw', y: '-25vh', scale: 0.5, opacity: 0 },
        { scrollTrigger: stFooter, x: '-10vw', y: '-10vh', scale: 0.5, opacity: 0.25, immediateRender: false }
      );
    });

    mm.add("(max-width: 767px)", () => {
      // MASTER ROTATION TIMELINE
      gsap.to(dronePlayhead.current, {
        frame: 360,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5
        },
        onUpdate: onFrameUpdate
      });

      // 1. Initial State
      gsap.set(canvasWrapperRef.current, { x: 0, y: '-10vh', scale: 0.9, opacity: 1 });

      gsap.to(heroRef.current, {
        scrollTrigger: { trigger: heroRef.current, start: "center top", end: "bottom top", scrub: 1 },
        opacity: 0, y: -40
      });

      // Card 1
      const st1 = { trigger: card1Ref.current, start: "top bottom", end: "center center", scrub: 1 };
      gsap.fromTo(canvasWrapperRef.current, 
        { x: 0, y: '-10vh', scale: 0.9, opacity: 1 },
        { scrollTrigger: st1, x: 0, y: 0, scale: 1.0, opacity: 1, immediateRender: false }
      );
      
      gsap.fromTo(c1Container.current, 
        { scale: 0.8, opacity: 0 }, 
        { scrollTrigger: st1, scale: 1, opacity: 1, ease: "back.out(1.2)", immediateRender: false }
      );
      gsap.fromTo(c1Left.current, { y: -50, opacity: 0 }, { scrollTrigger: st1, y: 0, opacity: 1, immediateRender: false });
      gsap.fromTo(c1Right.current, { y: 50, opacity: 0 }, { scrollTrigger: st1, y: 0, opacity: 1, immediateRender: false });
      gsap.fromTo(c1Bottom.current, { y: 20, opacity: 0 }, { scrollTrigger: st1, y: 0, opacity: 1, immediateRender: false });

      gsap.fromTo(c1Container.current, 
        { y: 0, opacity: 1 },
        { scrollTrigger: { trigger: card1Ref.current, start: "center top", end: "bottom top", scrub: 1 },
          y: -100, opacity: 0, immediateRender: false 
        }
      );

      // Services
      const stServices = { trigger: servicesRef.current, start: "top bottom", end: "center center", scrub: 1 };
      gsap.fromTo(canvasWrapperRef.current,
        { x: 0, y: 0, scale: 1.0, opacity: 1 },
        { scrollTrigger: stServices, x: '-10vw', y: '-40vh', scale: 0.5, opacity: 0, immediateRender: false }
      );

      // Card 2
      const st2 = { trigger: card2Ref.current, start: "top bottom", end: "center center", scrub: 1 };
      gsap.fromTo(canvasWrapperRef.current,
        { x: '-10vw', y: '-40vh', scale: 0.5, opacity: 0 },
        { scrollTrigger: st2, x: 0, y: 0, scale: 1.0, opacity: 1, immediateRender: false }
      );
      
      gsap.fromTo(c2Container.current, 
        { scale: 0.8, opacity: 0 }, 
        { scrollTrigger: st2, scale: 1, opacity: 1, ease: "back.out(1.2)", immediateRender: false }
      );
      gsap.fromTo(c2Left.current, { y: -50, opacity: 0 }, { scrollTrigger: st2, y: 0, opacity: 1, immediateRender: false });
      gsap.fromTo(c2Right.current, { y: 50, opacity: 0 }, { scrollTrigger: st2, y: 0, opacity: 1, immediateRender: false });
      gsap.fromTo(c2Bottom.current, { y: 20, opacity: 0 }, { scrollTrigger: st2, y: 0, opacity: 1, immediateRender: false });

      gsap.fromTo(c2Container.current, 
        { y: 0, opacity: 1 },
        { scrollTrigger: { trigger: card2Ref.current, start: "center top", end: "bottom top", scrub: 1 },
          y: -100, opacity: 0, immediateRender: false 
        }
      );

      // Residential
      const stRes = { trigger: residentialRef.current, start: "top bottom", end: "center center", scrub: 1 };
      gsap.fromTo(canvasWrapperRef.current,
        { x: 0, y: 0, scale: 1.0, opacity: 1 },
        { scrollTrigger: stRes, x: '-10vw', y: '-40vh', scale: 0.5, opacity: 0, immediateRender: false }
      );

      // Gallery
      const stGal = { trigger: galleryRef.current, start: "top bottom", end: "center center", scrub: 1 };
      gsap.fromTo(canvasWrapperRef.current,
        { x: '-10vw', y: '-40vh', scale: 0.5, opacity: 0 },
        { scrollTrigger: stGal, x: 0, y: '-10vh', scale: 0.8, opacity: 1, immediateRender: false }
      );
      
      gsap.fromTo(floatingTitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, scrollTrigger: stGal, immediateRender: false });
      gsap.fromTo(img1Ref.current, { y: 80, opacity: 0 }, { y: -40, opacity: 1, scrollTrigger: stGal, immediateRender: false });
      gsap.fromTo(img2Ref.current, { y: 50, opacity: 0 }, { y: -20, opacity: 1, scrollTrigger: stGal, immediateRender: false });
      gsap.fromTo(img3Ref.current, { y: 40, opacity: 0 }, { y: -30, opacity: 1, scrollTrigger: stGal, immediateRender: false });
      gsap.fromTo(img4Ref.current, { y: 80, opacity: 0 }, { y: -15, opacity: 1, scrollTrigger: stGal, immediateRender: false });
      gsap.fromTo(img5Ref.current, { y: 50, opacity: 0 }, { y: -50, opacity: 1, scrollTrigger: stGal, immediateRender: false });

      // Gallery Exit
      const galExitSt = { trigger: galleryRef.current, start: "center top", end: "bottom top", scrub: 1 };
      
      gsap.fromTo(floatingTitleRef.current, { opacity: 1, y: 0 }, { scrollTrigger: galExitSt, opacity: 0, y: -80, immediateRender: false });
      gsap.fromTo(img1Ref.current, { opacity: 1, y: -40 }, { scrollTrigger: galExitSt, opacity: 0, y: -80, immediateRender: false });
      gsap.fromTo(img2Ref.current, { opacity: 1, y: -20 }, { scrollTrigger: galExitSt, opacity: 0, y: -80, immediateRender: false });
      gsap.fromTo(img3Ref.current, { opacity: 1, y: -30 }, { scrollTrigger: galExitSt, opacity: 0, y: -80, immediateRender: false });
      gsap.fromTo(img4Ref.current, { opacity: 1, y: -15 }, { scrollTrigger: galExitSt, opacity: 0, y: -80, immediateRender: false });
      gsap.fromTo(img5Ref.current, { opacity: 1, y: -50 }, { scrollTrigger: galExitSt, opacity: 0, y: -80, immediateRender: false });
      gsap.fromTo(canvasWrapperRef.current,
        { x: 0, y: '-10vh', scale: 0.8, opacity: 1 },
        { scrollTrigger: galExitSt, opacity: 0, immediateRender: false }
      );

      // Video Section
      const stVideo = { trigger: videoSectionRef.current, start: "top bottom", end: "center center", scrub: 1 };
      gsap.to(bgRef.current, { scrollTrigger: stVideo, backgroundColor: '#0a0a0a' });
      gsap.to(headerRef.current, { scrollTrigger: stVideo, color: '#fff' });
      gsap.fromTo(canvasWrapperRef.current,
        { x: 0, y: '-10vh', scale: 0.8, opacity: 0 },
        { scrollTrigger: stVideo, x: '20vw', y: '-35vh', scale: 0.3, opacity: 0, immediateRender: false }
      );

      // Footer
      const stFooter = { trigger: footerRef.current, start: "top bottom", end: "center center", scrub: 1 };
      gsap.fromTo(canvasWrapperRef.current,
        { x: '20vw', y: '-35vh', scale: 0.3, opacity: 0 },
        { scrollTrigger: stFooter, x: 0, y: '-20vh', scale: 0.5, opacity: 0.25, immediateRender: false }
      );
    });

  }, { scope: containerRef });

  return (
    <>
    <div className="fixed inset-0 z-0 bg-[#0a0a0a] transition-colors duration-500" ref={bgRef}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_50%)]"></div>
    </div>
    
    <CanvasSequence ref={canvasWrapperRef} apiRef={canvasApiRef} />

    <main ref={containerRef} className="relative text-white font-sans antialiased overflow-x-hidden selection:bg-lime-400 selection:text-white">
      
      <header ref={headerRef} className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center transition-colors duration-300">
        <div className="flex items-center gap-3 font-bold text-xl tracking-tight">
          <img src="/Logo-2.png" alt="Dronefuze" className="h-8 object-contain" />
        </div>
        <nav className="hidden md:flex backdrop-blur-md border border-current/10 rounded-full px-6 py-2 gap-8 text-sm font-medium">
          <a href="#" className="hover:opacity-70 transition">Home</a>
          <a href="#" className="hover:opacity-70 transition">Services</a>
          <a href="#" className="hover:opacity-70 transition">Portfolio</a>
          <a href="#" className="hover:opacity-70 transition">Contact</a>
        </nav>
        <div className="hidden md:flex gap-4 text-sm font-semibold">
          <button className="px-5 py-2 rounded-full border border-current hover:opacity-70 transition">Login</button>
          <button className="px-5 py-2 rounded-full bg-lime-400 text-black border border-lime-400 hover:bg-lime-500 transition">Sign Up</button>
        </div>
        <button className="md:hidden">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </header>

      {/* 1. Hero */}
      <section ref={heroRef} className="h-screen w-full relative z-[60] flex flex-col justify-end md:justify-center items-center md:items-start pb-8 md:pb-0 px-8 md:px-24">
        <div className="max-w-[400px] text-center md:text-left mx-auto md:mx-0">
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-4 md:mb-6 tracking-tight">
            Commercial<br className="hidden md:block"/> Drone Footage.
          </h1>
          <p className="text-sm md:text-lg text-neutral-400 mb-6 md:mb-10 leading-relaxed">
            Professional videos and imagery that give decision-makers a clear view of project progress.
          </p>
        </div>
      </section>

      {/* 2. Commercial Card */}
      <section ref={card1Ref} className="h-[120vh] w-full relative z-20 flex items-center justify-center">
        <div ref={c1Container} className="w-[90vw] md:w-[90vw] max-w-[1200px] h-[85vh] md:h-[70vh] bg-[#191919]/60 backdrop-blur-[20px] border border-white/10 rounded-[40px] shadow-2xl flex flex-col justify-between p-8 md:p-12">
          <div className="flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
               <span className="text-xs font-bold tracking-widest text-neutral-400">PREMIUM</span>
            </div>
            <button className="px-4 py-2 rounded-full border border-white/20 text-xs md:text-sm font-medium hover:bg-white/10 transition">Dronefuze</button>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center w-full mt-8 md:mt-8 text-white gap-[30vh] md:gap-0">
            <div ref={c1Left} className="w-full md:w-[25%] text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 md:mb-4">Roofing &<br className="hidden md:block"/>Solar</h2>
              <p className="text-neutral-400 text-sm md:text-base">Detailed thermal and visual inspections.</p>
            </div>
            <div className="hidden md:block w-[50%]"></div>
            <div ref={c1Right} className="w-full md:w-[25%] text-center md:text-right">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 md:mb-4">Construction</h2>
              <p className="text-neutral-400 text-sm md:text-base">Clear views for your stakeholders.<br/>Progress monitoring</p>
            </div>
          </div>
          <div ref={c1Bottom} className="flex flex-col md:flex-row justify-between items-center md:items-end text-white gap-6 md:gap-0 mt-8 md:mt-0 text-center md:text-left">
            <h3 className="text-xl md:text-3xl font-medium tracking-tight">FAA-107 Certified<br className="hidden md:block"/>and Fully Insured</h3>
            <button className="px-8 py-3 bg-white/10 rounded-full text-sm font-medium hover:bg-white/20 transition flex items-center gap-2">
              Learn More 
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Commercial Details */}
      <section ref={servicesRef} className="relative z-30 min-h-screen bg-[#050505] border-t border-b border-white/5 pb-16">
        <ServicesSection />
      </section>

      {/* 4. Residential Card */}
      <section ref={card2Ref} className="h-[120vh] w-full relative z-20 flex items-center justify-center -mt-16">
        <div ref={c2Container} className="w-[90vw] md:w-[90vw] max-w-[1200px] h-[85vh] md:h-[70vh] bg-[#191919]/60 backdrop-blur-[20px] border border-white/10 rounded-[40px] shadow-2xl flex flex-col justify-between p-8 md:p-12">
          <div className="flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
               <span className="text-xs font-bold tracking-widest text-neutral-400">RESIDENTIAL</span>
            </div>
            <button className="px-4 py-2 rounded-full border border-white/20 text-xs md:text-sm font-medium hover:bg-white/10 transition">Dronefuze</button>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center w-full mt-8 md:mt-8 text-white gap-[30vh] md:gap-0">
            <div ref={c2Left} className="w-full md:w-[25%] text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 md:mb-4">Real Estate &<br className="hidden md:block"/>Construction</h2>
            </div>
            <div className="hidden md:block w-[50%]"></div>
            <div ref={c2Right} className="w-full md:w-[25%] text-center md:text-right">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 md:mb-4">Passion</h2>
            </div>
          </div>
          <div ref={c2Bottom} className="flex flex-col md:flex-row justify-between items-center md:items-end text-white gap-6 md:gap-0 mt-8 md:mt-0 text-center md:text-left">
            <h3 className="text-xl md:text-3xl font-medium tracking-tight">FAA-107 Certified<br className="hidden md:block"/>and Fully Insured</h3>
            <button className="px-8 py-3 bg-white/10 rounded-full text-sm font-medium hover:bg-white/20 transition flex items-center gap-2">
              Learn More 
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* 5. Residential Details */}
      <section ref={residentialRef} className="relative z-30 min-h-screen bg-[#0a0a0a] border-t border-b border-white/5 pb-16">
        <ResidentialSection />
      </section>

      {/* 6. Floating Image Gallery */}
      <section ref={galleryRef} className="h-[120vh] relative z-20 flex items-center justify-center overflow-hidden -mt-16">
        <h2 ref={floatingTitleRef} className="absolute top-[8%] md:top-[12%] left-1/2 -translate-x-1/2 text-2xl md:text-5xl font-bold text-white tracking-tight text-center px-4 md:px-6 z-10 drop-shadow-2xl bg-black/50 backdrop-blur-md py-3 md:py-4 rounded-full border border-white/10 w-max max-w-[90vw] md:max-w-full">Premium Quality Imagery</h2>
        
        <div ref={img5Ref} className="absolute top-[25%] md:top-[22%] left-[2%] md:left-[5%] w-[100px] md:w-[280px] aspect-square rounded-2xl md:rounded-[30px] overflow-hidden shadow-2xl border-2 md:border-4 border-white">
          <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000" alt="Real Estate" className="w-full h-full object-cover" />
        </div>
        <div ref={img1Ref} className="absolute top-[28%] md:top-[18%] right-[2%] md:right-[5%] w-[120px] md:w-[350px] aspect-[16/10] rounded-xl md:rounded-[40px] overflow-hidden shadow-2xl border-2 md:border-4 border-white">
          <img src="/images/roofing_inspection_1789981969219.jpg" alt="Roofing" className="w-full h-full object-cover" />
          <span className="absolute bottom-2 md:bottom-6 right-3 md:right-6 text-white font-bold text-xs md:text-xl drop-shadow-lg tracking-wide">Roofing</span>
        </div>
        <div ref={img2Ref} className="absolute bottom-[20%] md:bottom-[15%] left-[2%] md:left-[8%] w-[140px] md:w-[380px] aspect-[4/3] rounded-xl md:rounded-[32px] overflow-hidden shadow-2xl border-2 md:border-4 border-white">
          <img src="/images/solar_inspection_1789981984532.jpg" alt="Solar" className="w-full h-full object-cover" />
          <span className="absolute bottom-2 md:bottom-6 right-3 md:right-6 text-white font-bold text-xs md:text-xl drop-shadow-lg tracking-wide">Solar</span>
        </div>
        <div ref={img4Ref} className="hidden md:block absolute top-[50%] md:top-[45%] right-[2%] md:right-[4%] w-[160px] md:w-[280px] aspect-[3/4] rounded-xl md:rounded-[24px] overflow-hidden shadow-2xl border-4 border-white">
          <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000" alt="Interior" className="w-full h-full object-cover" />
        </div>
        <div ref={img3Ref} className="absolute bottom-[5%] md:bottom-[8%] left-[50%] md:left-[55%] -translate-x-1/2 w-[160px] md:w-[420px] aspect-[16/9] rounded-xl md:rounded-[48px] overflow-hidden shadow-2xl border-2 md:border-4 border-white">
          <img src="/images/construction_progress_1789982002449.jpg" alt="Construction" className="w-full h-full object-cover" />
          <span className="absolute bottom-2 md:bottom-6 right-3 md:right-6 text-white font-bold text-xs md:text-xl drop-shadow-lg tracking-wide">Construction</span>
        </div>
      </section>

      {/* 7. Video Section */}
      <section ref={videoSectionRef} className="relative z-30 bg-[#0a0a0a]">
        <VideoGalleryShowcase />
      </section>

      {/* 8. FAQ */}
      <section className="relative z-30 bg-[#0a0a0a]">
        <FAQSection />
      </section>

      <footer ref={footerRef} className="relative w-full pt-10 pb-6 bg-transparent flex flex-col items-center justify-center border-t border-white/10 z-50 overflow-hidden">
        <h2 className="text-[12vw] md:text-[8.5vw] font-black text-white tracking-tighter leading-tight mb-2 pt-2">Dronefuze</h2>
        <form className="w-full max-w-lg px-8 mb-8 flex flex-col gap-3 text-left relative z-10">
          <div className="flex flex-col gap-1.5">
            <label className="text-neutral-300 text-xs font-semibold tracking-wide">Provide your Email*</label>
            <input type="email" placeholder="john@example.com" className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-lime-400/30 focus:border-lime-400 transition" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-neutral-300 text-xs font-semibold tracking-wide">Your message*</label>
            <textarea placeholder="" rows={3} className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-lime-400/30 focus:border-lime-400 transition resize-none" required></textarea>
          </div>
          <div className="flex justify-end mt-1">
            <button type="submit" className="px-8 py-2.5 bg-lime-400 text-black font-bold rounded-full hover:bg-lime-500 transition shadow-[0_0_15px_rgba(163,230,53,0.4)]">Submit</button>
          </div>
        </form>
        <div className="w-full px-6 md:px-12 flex flex-col mt-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 text-neutral-400 text-sm font-medium mb-4">
            <div className="flex flex-col max-w-lg">
              <div className="w-10 h-1.5 bg-lime-400 mb-2"></div>
              <span className="text-white text-2xl md:text-3xl font-bold tracking-tight mb-2">DroneFuze</span>
              <span className="text-xs md:text-[13px] leading-tight">Drone Footage - Construction - Solar - Commercial Real Estate.</span>
              <span className="text-xs md:text-[13px] leading-tight">Estate. Central Operations: Las Vegas, Hawaii</span>
            </div>
            <div className="flex gap-4 items-center self-start md:self-center">
              <a href="#" className="text-lime-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" className="text-lime-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
            <div className="flex flex-col gap-1 md:text-right">
              <span className="text-lime-400 font-bold text-[13px] mb-1">Dispatch & Ops</span>
              <span className="text-neutral-300 text-xs">Admin@Dronefuze.com</span>
              <span className="text-neutral-300 text-xs">+1 (949) 433-7838</span>
            </div>
          </div>
          <div className="w-full border-t-2 border-[#6b21a8] mb-2"></div>
          <div className="flex flex-col md:flex-row justify-between items-center text-[11px] text-neutral-400 font-medium pb-4">
            <p>© 2026 DroneFuze-Aerial and Ground Video and Imagery</p>
            <p className="text-lime-400 font-bold tracking-wide mt-2 md:mt-0 uppercase">FAA-107Certified and Fully Insured</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-2 gap-4">
            <img src="/Drone-Logo-2 long.png" alt="Dronefuze Imagery" className="h-10 md:h-12 object-contain" />
            <button className="bg-lime-400 text-black px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-lime-500 transition shadow-lg w-full md:w-auto">
              Call 949-433-7838
            </button>
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}
