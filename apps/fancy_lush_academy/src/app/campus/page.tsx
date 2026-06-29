import React from "react";
import Image from "next/image";

export default function CampusPage() {
  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#1a1a1a] pt-32 md:pt-48 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        
        <div className="text-center mb-16 md:mb-24">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#d4af37] block mb-4">Student Life</span>
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Campus & Welfare</h1>
          <p className="text-[#595959] max-w-2xl mx-auto font-light leading-relaxed">
            Your safety, comfort, and well-being are our highest priorities. We provide an environment where you can focus entirely on perfecting your craft.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-32">
          <div className="relative h-[400px] md:h-[600px] w-full rounded-sm overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1000" 
              alt="Campus Safety" 
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          <div>
            <h2 className="text-3xl font-serif mb-6">Physical Masterclass</h2>
            <p className="text-[#595959] font-light leading-relaxed mb-8">
              Located in the heart of Ilorin, Kwara State, our physical campus is a sanctuary of learning. We have heavily invested in infrastructure to ensure a secure and conducive learning environment.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <div className="w-6 h-6 rounded-full border border-[#d4af37] flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 bg-[#d4af37] rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm uppercase tracking-widest mb-1">24-Hour CCTV Surveillance</h4>
                  <p className="text-sm text-[#595959] font-light">Comprehensive monitoring across all training facilities.</p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="w-6 h-6 rounded-full border border-[#d4af37] flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 bg-[#d4af37] rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm uppercase tracking-widest mb-1">Dedicated Security Personnel</h4>
                  <p className="text-sm text-[#595959] font-light">Highly trained staff ensuring campus safety around the clock.</p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="w-6 h-6 rounded-full border border-[#d4af37] flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 bg-[#d4af37] rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm uppercase tracking-widest mb-1">On-Site Caregivers</h4>
                  <p className="text-sm text-[#595959] font-light">Support staff dedicated to student welfare and assistance.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center flex-col-reverse md:flex-row">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-serif mb-6">Virtual Learning</h2>
            <p className="text-[#595959] font-light leading-relaxed mb-8">
              Geography should not be a barrier to world-class education. For students outside Kwara State or Nigeria, we offer highly interactive virtual programs.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <div className="w-6 h-6 rounded-full border border-[#1a1a1a] flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 bg-[#1a1a1a] rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm uppercase tracking-widest mb-1">Live Zoom Sessions</h4>
                  <p className="text-sm text-[#595959] font-light">Real-time interaction, Q&A, and live demonstrations with instructors.</p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="w-6 h-6 rounded-full border border-[#1a1a1a] flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 bg-[#1a1a1a] rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm uppercase tracking-widest mb-1">Digital Handouts</h4>
                  <p className="text-sm text-[#595959] font-light">Comprehensive training materials and PDFs provided instantly.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="relative h-[400px] md:h-[600px] w-full rounded-sm overflow-hidden order-1 md:order-2">
            <Image 
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000" 
              alt="Virtual Learning" 
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
