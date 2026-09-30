"use client";
import React, { useState } from 'react';

const residentialServices = [
  { id: '01', title: 'Construction Monitoring', desc: 'Video and or photography of construction project. Paired with a Project permits you to follow timelines.', media: [
    {type: 'image', src: '/images/Res-const-1.JPG'},
    {type: 'image', src: '/images/Res-Pre-const-2.JPG'},
    {type: 'image', src: '/images/Res-Pre-const-3.JPG'},
    {type: 'image', src: '/images/Res-Pre-const-4.JPG'},
    {type: 'image', src: '/images/Res-Pre-const-5.JPG'}
  ] },
  { id: '02', title: 'Roofing', desc: 'Ensuring no errors were made and option of thermal inspection to identify potential leaks.', media: [
    {type: 'image', src: '/images/roofing_inspection_1789981969219.jpg'},
    {type: 'image', src: '/images/Commercial-Roof-1.JPG'},
    {type: 'image', src: '/images/Commercial-Roof-2.JPG'},
    {type: 'video', src: '/videos/Commercial-Roof-3.MP4'},
    {type: 'image', src: '/images/Commercial-Roof-4.JPG'}
  ] },
  { id: '03', title: 'Real Estate', desc: 'Real Estate videography and walkthrough.', media: [
    {type: 'image', src: '/images/Res_RealEstate-1.jpg'},
    {type: 'image', src: '/images/Res_RealEstate-2.jpg'},
    {type: 'image', src: '/images/Res_RealEstate-3.jpeg'},
    {type: 'image', src: '/images/Res_RealEstate-4.jpg'},
    {type: 'image', src: '/images/Res_RealEstate-5.jpg'},
    {type: 'image', src: '/images/Res_RealEstate-6.jpg'}
  ] },
  { id: '04', title: 'Special', desc: 'High end custom car and truck video creation.', media: [
    {type: 'image', src: '/images/Res-Special-car-1.jpeg'},
    {type: 'image', src: '/images/Res-Special-car-2.jpg'},
    {type: 'image', src: '/images/Res-Special-car-3.jpeg'},
    {type: 'video', src: '/videos/yt_drone_clip.mp4'}
  ] },
];

export default function ResidentialSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (mediaLength: number) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      setActiveMediaIndex(prev => prev === mediaLength - 1 ? 0 : prev + 1);
    } else if (isRightSwipe) {
      setActiveMediaIndex(prev => prev === 0 ? mediaLength - 1 : prev - 1);
    }
  };

  const currentData = residentialServices;
  const activeService = activeIndex >= 0 ? currentData[activeIndex] : null;

  return (
    <section className="w-full bg-transparent text-white py-12 px-8 md:px-24 flex flex-col justify-center min-h-screen">
      <div className="max-w-[1400px] mx-auto w-full">
        
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-lime-400 mb-3 uppercase">Inside DroneFuze</div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] max-w-full">
            Residential & Passion
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Left Column: Navigation & List */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center">

            {/* Service List */}
            <div className="flex flex-col gap-1">
              {currentData.map((service, index) => {
                const isActive = activeIndex === index;
                return (
                  <div key={service.id} className="flex flex-col">
                    <button
                      onClick={() => { setActiveIndex(isActive ? -1 : index); setActiveMediaIndex(0); }}
                      className={`flex items-center gap-4 py-3 px-5 rounded-xl transition-all duration-300 text-left ${isActive ? 'bg-white/5 shadow-lg border border-white/10' : 'hover:bg-white/5 opacity-60 hover:opacity-100'}`}
                    >
                      <span className={`text-xs font-mono font-bold ${isActive ? 'text-lime-400' : 'text-neutral-500'}`}>
                        {service.id}
                      </span>
                      <span className={`text-lg md:text-xl font-medium tracking-tight ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                        {service.title}
                      </span>
                    </button>
                    
                    {/* Mobile Accordion Details */}
                    {isActive && (
                      <div className="lg:hidden mt-2 mb-4 p-5 bg-white/5 rounded-xl border border-white/10 flex flex-col gap-4">
                        <div 
                          className="w-full h-40 rounded-lg overflow-hidden relative cursor-pointer group"
                          onTouchStart={onTouchStart}
                          onTouchMove={onTouchMove}
                          onTouchEnd={() => onTouchEnd(service.media.length)}
                        >
                          <div onClick={() => window.dispatchEvent(new CustomEvent('open-lightbox', { detail: { src: service.media[activeMediaIndex].src, type: service.media[activeMediaIndex].type } }))} className="absolute inset-0 w-full h-full">
                            {service.media[activeMediaIndex].type === 'video' ? (
                              <video src={service.media[activeMediaIndex].src} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                            ) : (
                              <img src={service.media[activeMediaIndex].src} alt={service.title} className="w-full h-full object-cover" />
                            )}
                          </div>
                          
                          {/* Navigation Arrows */}
                          {service.media.length > 1 && (
                            <>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setActiveMediaIndex((prev) => (prev === 0 ? service.media.length - 1 : prev - 1)); }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setActiveMediaIndex((prev) => (prev === service.media.length - 1 ? 0 : prev + 1)); }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                              </button>
                            </>
                          )}
                          
                          {/* Navigation Dots */}
                          {service.media.length > 1 && (
                            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-20">
                              {service.media.map((_, i) => (
                                <button
                                  key={i}
                                  onClick={(e) => { e.stopPropagation(); setActiveMediaIndex(i); }}
                                  className={`h-1.5 rounded-full transition-all ${i === activeMediaIndex ? 'bg-lime-400 w-3' : 'bg-white/50 w-1.5 hover:bg-white'}`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                          {service.desc}
                        </p>
                        <a href="#portfolio" className="w-max px-5 py-2 rounded-full border border-white/20 text-[10px] font-semibold uppercase tracking-widest hover:bg-white/10 transition mt-2 inline-block">
                          View Portfolio
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Mock UI Panel (Desktop Only) */}
          <div className="hidden lg:block w-full lg:w-2/3">
            <div className="w-full bg-[#0a0a0a] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col h-auto min-h-[500px] md:h-[480px]">
              
              {/* Mock Browser Header */}
              <div className="flex items-center gap-2 px-6 py-3 border-b border-white/10 bg-[#141414]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="mx-auto px-6 py-1 rounded-full bg-white/5 text-[10px] text-neutral-500 font-mono tracking-widest flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M11 17v.01"/><path d="M7 14v.01"/></svg>
                  dronefuze.com/services
                </div>
              </div>

              {/* Dynamic Content Area */}
              <div className="flex-1 flex flex-col md:flex-row">
                {activeService ? (
                  <>
                    {/* Text Content */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10">
                      <div className="flex items-center gap-4 mb-4">
                         <span className="text-lime-400 font-mono text-xs tracking-widest">{activeService.id} / 0{currentData.length}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 leading-tight">
                        {activeService.title}
                      </h3>
                      <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                        {activeService.desc}
                      </p>
                      
                      <div className="mt-8">
                        <a href="#portfolio" className="px-6 py-3 rounded-full border border-white/20 text-xs font-semibold uppercase tracking-widest hover:bg-white/10 transition inline-block">
                          View Portfolio
                        </a>
                      </div>
                    </div>

                    {/* Image Area */}
                    <div 
                      className="w-full md:w-1/2 relative bg-[#1a1a1a] min-h-[300px] cursor-pointer group"
                      onTouchStart={onTouchStart}
                      onTouchMove={onTouchMove}
                      onTouchEnd={() => onTouchEnd(activeService.media.length)}
                    >
                      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none mix-blend-overlay"></div>
                      
                      <div onClick={() => window.dispatchEvent(new CustomEvent('open-lightbox', { detail: { src: activeService.media[activeMediaIndex].src, type: activeService.media[activeMediaIndex].type } }))} className="absolute inset-0 w-full h-full">
                        {activeService.media[activeMediaIndex].type === 'video' ? (
                          <video
                            key={activeService.media[activeMediaIndex].src}
                            src={activeService.media[activeMediaIndex].src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover animate-fade-in"
                          />
                        ) : (
                          <img 
                            key={activeService.media[activeMediaIndex].src}
                            src={activeService.media[activeMediaIndex].src} 
                            alt={activeService.title}
                            className="w-full h-full object-cover animate-fade-in"
                          />
                        )}
                      </div>

                      {/* Navigation Arrows */}
                      {activeService.media.length > 1 && (
                        <>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setActiveMediaIndex((prev) => (prev === 0 ? activeService.media.length - 1 : prev - 1)); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-black/80"
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setActiveMediaIndex((prev) => (prev === activeService.media.length - 1 ? 0 : prev + 1)); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-black/80"
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                          </button>
                        </>
                      )}

                      {/* Navigation Dots */}
                      {activeService.media.length > 1 && (
                        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
                          {activeService.media.map((_, i) => (
                            <button
                              key={i}
                              onClick={(e) => { e.stopPropagation(); setActiveMediaIndex(i); }}
                              className={`h-2 rounded-full transition-all ${i === activeMediaIndex ? 'bg-lime-400 w-4' : 'bg-white/50 w-2 hover:bg-white'}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-neutral-600 font-medium">
                    Select a service
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
