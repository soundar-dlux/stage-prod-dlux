import { Users2, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function ProblemSection7() {
  return (
    <section className="py-32 px-8 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        {/* Timeline/Flow design */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-6 py-3 rounded-full mb-6">
            <Users2 className="w-5 h-5" />
            <span className="text-lg">Challenge #6</span>
          </div>
          <h2 className="text-6xl mb-6 text-white">
            Team <span className="text-[#FF6B00]">Alignment</span> Issues
          </h2>
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto">
            Sales blames marketing for bad leads. Marketing blames sales for not 
            following up. Nothing gets done because everyone's pulling in different directions.
          </p>
        </div>

        {/* Flow diagram with image in center */}
        <div className="relative">
          {/* Top row */}
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div className="bg-gradient-to-br from-red-500/20 to-transparent border-2 border-red-500/50 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">😤</div>
              <h3 className="text-2xl text-white mb-2">Sales Team</h3>
              <p className="text-gray-400">"These leads are terrible quality"</p>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-full h-1 bg-[#FF6B00]/30 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF6B00] rounded-full p-3">
                  <ArrowRight className="w-6 h-6 text-white rotate-180" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-500/20 to-transparent border-2 border-red-500/50 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">😠</div>
              <h3 className="text-2xl text-white mb-2">Marketing Team</h3>
              <p className="text-gray-400">"You're not following up on our leads"</p>
            </div>
          </div>

          {/* Center image */}
          <div className="relative rounded-3xl overflow-hidden border-4 border-[#FF6B00] max-w-3xl mx-auto mb-8">
            <Image
              src="https://images.ctfassets.net/pj0maraabon4/7qrQLGC3CYh3SHYYvbR6qo/c652cada633a523313403d3e98f989b1/1239967efcbf104ee65ee5f271cd19b29f3bf586.jpg"
              alt="Team collaboration"
              width={1000}
              height={100}
              className="w-full h-[300px] object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">⚔️</div>
                <h3 className="text-4xl text-white">The Result?</h3>
                <p className="text-xl text-gray-300 mt-2">Dysfunction & Finger Pointing</p>
              </div>
            </div>
          </div>

          {/* Bottom problems */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-black/50 border border-[#FF6B00]/20 rounded-xl p-6 text-center">
              <p className="text-gray-300">No shared goals or KPIs</p>
            </div>
            <div className="bg-black/50 border border-[#FF6B00]/20 rounded-xl p-6 text-center">
              <p className="text-gray-300">Poor communication & siloed workflows</p>
            </div>
            <div className="bg-black/50 border border-[#FF6B00]/20 rounded-xl p-6 text-center">
              <p className="text-gray-300">Broken lead handoff process</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}