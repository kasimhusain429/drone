"use client";
import React, { useState } from 'react';

const residentialServices = [
  { id: '01', title: 'Construction Monitoring', desc: 'Video and or photography of construction project. Paired with a Project permits you to follow timelines.', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000' },
  { id: '02', title: 'Roofing', desc: 'Ensuring no errors were made and option of thermal inspection to identify potential leaks.', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000' },
  { id: '03', title: 'Interior Ground Data', desc: 'Coupled with 3D Matterport.', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000' },
  { id: '04', title: 'Real Estate', desc: 'Real Estate videography and walkthrough.', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000' },
  { id: '05', title: 'Special', desc: 'High end custom car and truck video creation.', img: 'https://images.unsplash.com/photo-1503376713356-20d6c4c51cf5?q=80&w=2000' },
];

export default function ResidentialSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

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
                      onClick={() => setActiveIndex(isActive ? -1 : index)}
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
                        <div className="w-full h-40 rounded-lg overflow-hidden relative">
                           <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                          {service.desc}
                        </p>
                        <button className="w-max px-5 py-2 rounded-full border border-white/20 text-[10px] font-semibold uppercase tracking-widest hover:bg-white/10 transition mt-2">
                          View Portfolio
                        </button>
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
                        <button className="px-6 py-3 rounded-full border border-white/20 text-xs font-semibold uppercase tracking-widest hover:bg-white/10 transition">
                          View Portfolio
                        </button>
                      </div>
                    </div>

                    {/* Image Area */}
                    <div className="w-full md:w-1/2 relative bg-[#1a1a1a] min-h-[300px]">
                      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none mix-blend-overlay"></div>
                      <img 
                        key={activeService.img} // Force re-render for animation
                        src={activeService.img} 
                        alt={activeService.title}
                        className="absolute inset-0 w-full h-full object-cover animate-fade-in"
                      />
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
