
import { Users, Calendar, BarChart2, Sparkles } from 'lucide-react';
import Image from 'next/image';

export function ProblemSection3() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Bento box grid layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Large text block */}
          <div className="col-span-7 bg-gradient-to-br from-[#1A1A1A] to-black border border-[#FF6B00]/30 rounded-3xl p-12 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 text-[#FF6B00] px-4 py-2 rounded-full mb-6 self-start">
              <Users className="w-5 h-5" />
              <span>Challenge #3</span>
            </div>
            <h2 className="text-6xl mb-6 text-white leading-tight">
              Low Social Media <span className="text-[#FF6B00]">Engagement</span>
            </h2>
            <p className="text-xl text-gray-400">
              Your posts get barely any likes, comments, or shares. It feels like you're 
              talking to an empty room, and your followers aren't growing.
            </p>
          </div>

          {/* Image block */}
          <div className="col-span-5 row-span-2 relative rounded-3xl overflow-hidden border border-[#FF6B00]/30">
            <Image
              src="https://images.ctfassets.net/pj0maraabon4/7qrQLGC3CYh3SHYYvbR6qo/c652cada633a523313403d3e98f989b1/1239967efcbf104ee65ee5f271cd19b29f3bf586.jpg"
              alt="Social media engagement"
              width={1000}
              height={100}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-black/60 backdrop-blur-sm border border-[#FF6B00]/30 rounded-xl p-4">
                <div className="text-[#FF6B00] text-sm mb-1">Engagement Rate</div>
                <div className="text-white text-3xl">0.8%</div>
              </div>
            </div>
          </div>

          {/* Small cards */}
          <div className="col-span-4 bg-gradient-to-br from-[#FF6B00]/10 to-transparent border border-[#FF6B00]/20 rounded-3xl p-8">
            <Calendar className="w-10 h-10 text-[#FF6B00] mb-4" />
            <h3 className="text-xl text-white mb-2">Inconsistent Posting</h3>
            <p className="text-gray-400">Irregular schedule hurts visibility and reach</p>
          </div>

          <div className="col-span-3 bg-gradient-to-br from-[#FF6B00]/10 to-transparent border border-[#FF6B00]/20 rounded-3xl p-8">
            <BarChart2 className="w-10 h-10 text-[#FF6B00] mb-4" />
            <h3 className="text-xl text-white mb-2">Algorithm Changes</h3>
            <p className="text-gray-400">Organic reach is nearly impossible</p>
          </div>

          {/* <div className="col-span-5 bg-gradient-to-br from-black to-[#1A1A1A] border border-[#FF6B00]/30 rounded-3xl p-8 flex items-center gap-6">
            <div className="bg-[#FF6B00]/10 rounded-full p-6">
              <Sparkles className="w-12 h-12 text-[#FF6B00]" />
            </div>
            <div>
              <h3 className="text-2xl text-white mb-2">Wrong Content</h3>
              <p className="text-gray-400">Not matching what your audience actually wants to see</p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}