
import { FileText, Brain, Repeat, Zap } from 'lucide-react';
import Image from 'next/image';

export function ProblemSection5() {
  return (
    <section className="py-32 px-8 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        {/* Centered content with floating cards */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-6 py-3 rounded-full mb-6">
            <FileText className="w-5 h-5" />
            <span className="text-lg">Challenge #4</span>
          </div>
          <h2 className="text-6xl mb-8 text-white max-w-4xl mx-auto leading-tight">
            Content Creation <span className="text-[#FF6B00]">Burnout</span>
          </h2>
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto mb-16">
            You're exhausted from constantly creating content. The quality suffers, 
            deadlines are missed, and you're running out of fresh ideas.
          </p>
        </div>

        {/* Center image with overlapping cards */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            <Image
              src="https://images.ctfassets.net/pj0maraabon4/6mTVEhiEf6vfUbiFH2vkJS/f47bce4b41f31321d889acdec314cbc3/ar-vr--768x512.jpg"
              alt="Content creation"
              width={1000}
              height={100}
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          </div>

          {/* Floating cards around the image */}
          <div className="absolute -left-8 top-1/4 bg-gradient-to-br from-[#1A1A1A] to-black border-2 border-[#FF6B00] rounded-2xl p-8 w-80 shadow-2xl">
            <Brain className="w-12 h-12 text-[#FF6B00] mb-4" />
            <h3 className="text-2xl text-white mb-2">No Planning</h3>
            <p className="text-gray-400">Missing content calendar leads to chaos</p>
          </div>

          <div className="absolute -right-8 top-1/3 bg-gradient-to-br from-[#1A1A1A] to-black border-2 border-[#FF6B00] rounded-2xl p-8 w-80 shadow-2xl">
            <Zap className="w-12 h-12 text-[#FF6B00] mb-4" />
            <h3 className="text-2xl text-white mb-2">Reactive Approach</h3>
            <p className="text-gray-400">Last-minute rush produces mediocre results</p>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 bg-gradient-to-br from-[#FF6B00] to-[#CC5500] rounded-2xl p-8 w-96 shadow-2xl">
            <Repeat className="w-12 h-12 text-white mb-4" />
            <h3 className="text-2xl text-white mb-2">Wasted Effort</h3>
            <p className="text-white/90">No repurposing strategy means doing the same work twice</p>
          </div>
        </div>
      </div>
    </section>
  );
}