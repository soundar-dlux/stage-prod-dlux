
import { BarChart3, TrendingDown, Eye, Link } from 'lucide-react';
import Image from 'next/image';

export function ProblemSection6() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Statistics-focused layout */}
        <div className="grid grid-cols-2 gap-12 items-center">
          {/* Left side - Large stats */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 text-[#FF6B00] px-6 py-3 rounded-full mb-6 border border-[#FF6B00]/30">
              <BarChart3 className="w-5 h-5" />
              <span className="text-lg">Challenge #5</span>
            </div>
            <h2 className="text-6xl mb-8 text-white leading-tight">
              Can't Prove Marketing <span className="text-[#FF6B00]">Value</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              Leadership keeps asking "What's the ROI?" and you don't have concrete 
              data to show. Your budget is at risk, and credibility is slipping.
            </p>

            {/* Big numbers */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#1A1A1A] to-black border-l-4 border-[#FF6B00] p-8 rounded-xl">
                <div className="text-[#FF6B00] text-6xl mb-2">?</div>
                <div className="text-white text-2xl mb-1">Unknown ROI</div>
                <div className="text-gray-400">Can't track revenue impact</div>
              </div>
              <div className="bg-gradient-to-br from-[#1A1A1A] to-black border-l-4 border-[#FF6B00] p-8 rounded-xl">
                <div className="text-[#FF6B00] text-6xl mb-2">0</div>
                <div className="text-white text-2xl mb-1">Clear Metrics</div>
                <div className="text-gray-400">Overwhelmed by data</div>
              </div>
            </div>
          </div>

          {/* Right side - Image with overlay problems */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden border-2 border-[#FF6B00]/30">
              <Image
                src="https://images.ctfassets.net/pj0maraabon4/6mTVEhiEf6vfUbiFH2vkJS/f47bce4b41f31321d889acdec314cbc3/ar-vr--768x512.jpg"
                alt="Business growth analytics"
                width={1000}
                height={100}
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-black/70"></div>
              
              {/* Overlay problems list */}
              <div className="absolute inset-0 flex flex-col justify-center p-12 space-y-6">
                <div className="bg-black/80 backdrop-blur-sm border border-red-500/50 rounded-xl p-6 flex items-start gap-4">
                  <Eye className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white text-xl mb-1">Analytics Overwhelm</h3>
                    <p className="text-gray-300">Too much data, no clear insights</p>
                  </div>
                </div>
                
                <div className="bg-black/80 backdrop-blur-sm border border-red-500/50 rounded-xl p-6 flex items-start gap-4">
                  <TrendingDown className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white text-xl mb-1">No Dashboard</h3>
                    <p className="text-gray-300">Can't visualize key metrics simply</p>
                  </div>
                </div>
                
                <div className="bg-black/80 backdrop-blur-sm border border-red-500/50 rounded-xl p-6 flex items-start gap-4">
                  <Link className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white text-xl mb-1">Disconnected Data</h3>
                    <p className="text-gray-300">Can't link marketing to revenue</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}