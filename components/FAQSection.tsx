"use client";
import React, { useState } from 'react';

const faqs = [
  {
    question: "What areas do you service?",
    answer: "Our central operations are located in Las Vegas and Hawaii. We handle commercial projects, construction monitoring, and real estate in these primary regions, but can travel for specialized assignments."
  },
  {
    question: "How often should we schedule construction progress flights?",
    answer: "For most commercial developments, we recommend weekly or bi-weekly flights. This ensures a consistent, high-quality visual record of site progress for stakeholders, investors, and dispute protection."
  },
  {
    question: "Do you offer thermal imaging for solar inspections?",
    answer: "Yes, we use advanced thermal imaging payloads to detect heat anomalies, malfunctioning cells, and potential roof leaks during our solar and roofing inspections."
  },
  {
    question: "How quickly can we get the footage after a flight?",
    answer: "Standard turnaround time for raw footage and basic progress photos is 24-48 hours. Fully edited marketing videos or 3D mapping data may take 3-5 business days depending on complexity."
  },
  {
    question: "Are your drone operators licensed and insured?",
    answer: "Absolutely. All of our pilots are FAA Part 107 certified and carry comprehensive liability insurance specifically tailored for commercial drone operations."
  },
  {
    question: "What happens if the weather is bad?",
    answer: "Safety and data quality are our top priorities. If high winds, rain, or poor visibility prevent safe flight, we will reschedule your inspection at the earliest available window without any penalty."
  }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeFaq = activeIndex >= 0 ? faqs[activeIndex] : null;

  return (
    <section className="w-full text-white py-12 md:py-16 px-8 md:px-24 flex flex-col justify-center min-h-[100svh]">
      <div className="max-w-[1200px] mx-auto w-full flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-lime-400 mb-3 md:mb-4 uppercase">Questions</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05] mb-4">
            The <i className="text-lime-400 font-bold">honest</i> answers.
          </h2>
          <p className="text-neutral-400 text-sm md:text-lg font-medium">
            Everything you need to know before booking your first flight.
          </p>
        </div>

        {/* Mock Browser Container */}
        <div className="w-full max-w-[1000px] bg-[#0a0a0a] rounded-[24px] border border-white/10 overflow-hidden shadow-2xl">
          
          {/* Browser Header */}
          <div className="h-12 border-b border-white/10 flex items-center px-6 relative bg-black/50">
            <div className="flex gap-2 z-10">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase">dronefuze · frequently asked</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row h-auto md:h-[420px]">
            
            {/* Left Column: Question List */}
            <div className="w-full md:w-[40%] border-b md:border-b-0 md:border-r border-white/10 overflow-y-auto">
              <div className="flex flex-col">
                {faqs.map((faq, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <div key={idx} className="flex flex-col">
                      <button
                        onClick={() => setActiveIndex(isActive ? -1 : idx)}
                        className={`text-left px-8 py-5 border-b border-white/5 transition-colors relative flex items-center ${
                          isActive ? 'bg-white/5' : 'hover:bg-white/5'
                        }`}
                      >
                        {isActive && (
                          <div className="absolute left-4 w-1.5 h-1.5 rounded-full bg-lime-400"></div>
                        )}
                        <span className={`text-sm md:text-base font-semibold pr-4 ${isActive ? 'text-white' : 'text-neutral-400'}`}>
                          {faq.question}
                        </span>
                      </button>
                      
                      {/* Mobile Accordion Answer */}
                      {isActive && (
                        <div className="md:hidden px-8 pb-6 pt-2 bg-white/5 border-b border-white/5 text-sm text-neutral-400">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Answer Display (Desktop Only) */}
            <div className="hidden md:flex w-full md:w-[60%] p-8 md:p-10 lg:p-12 flex-col bg-[#050505] overflow-y-auto">
              {activeFaq ? (
                <>
                  <div className="text-lime-400 font-mono text-xs md:text-sm font-bold tracking-widest mb-4">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(faqs.length).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-4 md:mb-6 leading-[1.2]">
                    {activeFaq.question}
                  </h3>
                  <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                    {activeFaq.answer}
                  </p>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-neutral-600 font-medium">
                  Select a question
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
