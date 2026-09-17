
import { Mail, Inbox, MousePointerClick } from 'lucide-react';
import Image from 'next/image';

export function ProblemSection8() {
  return (
    <section className="py-0 px-0">
      <div className="max-w-full">
        {/* Full-width split screen */}
        <div className="grid grid-cols-2 min-h-[800px]">
          {/* Left side - Image taking full height */}
          <div className="relative">
            <Image
              src="https://images.ctfassets.net/pj0maraabon4/7qrQLGC3CYh3SHYYvbR6qo/c652cada633a523313403d3e98f989b1/1239967efcbf104ee65ee5f271cd19b29f3bf586.jpg"
              alt="Email marketing"
              width={1000}
              height={100}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/90"></div>
          </div>

          {/* Right side - Content */}
          <div className="bg-black flex items-center px-16">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 text-[#FF6B00] px-6 py-3 rounded-full mb-8 border border-[#FF6B00]/30">
                <Mail className="w-5 h-5" />
                <span className="text-lg">Challenge #7</span>
              </div>
              
              <h2 className="text-6xl mb-8 text-white leading-tight">
                Email Marketing That <span className="text-[#FF6B00]">Falls Flat</span>
              </h2>
              
              <p className="text-2xl text-gray-400 mb-12">
                Your email open rates are abysmal, click-through rates are worse, and 
                unsubscribes are climbing. Your list is dying a slow death.
              </p>

              {/* Stats cards */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#1A1A1A] to-transparent border-l-4 border-red-500 p-6 rounded-r-xl">
                  <div className="flex items-center gap-4 mb-2">
                    <Inbox className="w-8 h-8 text-red-500" />
                    <div className="text-4xl text-red-500">8%</div>
                  </div>
                  <p className="text-white text-xl mb-1">Open Rate</p>
                  <p className="text-gray-400">Generic subject lines get ignored instantly</p>
                </div>

                <div className="bg-gradient-to-r from-[#1A1A1A] to-transparent border-l-4 border-red-500 p-6 rounded-r-xl">
                  <div className="flex items-center gap-4 mb-2">
                    <MousePointerClick className="w-8 h-8 text-red-500" />
                    <div className="text-4xl text-red-500">0.5%</div>
                  </div>
                  <p className="text-white text-xl mb-1">Click Rate</p>
                  <p className="text-gray-400">No segmentation means irrelevant messages</p>
                </div>

                <div className="bg-gradient-to-r from-[#FF6B00] to-[#CC5500] p-6 rounded-xl">
                  <p className="text-white text-xl">
                    <strong>The Missing Piece:</strong> Automation and personalization at scale
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}