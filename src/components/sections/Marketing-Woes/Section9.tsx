
import { Palette, AlertTriangle, Shuffle, Eye } from 'lucide-react';
import Image from 'next/image';

export function ProblemSection9() {
  return (
    <section className="py-32 px-8 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        {/* Masonry-style card grid */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-6 py-3 rounded-full mb-6">
            <Palette className="w-5 h-5" />
            <span className="text-lg">Challenge #8</span>
          </div>
          <h2 className="text-6xl mb-6 text-white">
            Inconsistent <span className="text-[#FF6B00]">Brand Identity</span>
          </h2>
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto">
            Your brand looks different everywhere. Social media doesn't match your 
            website. Your ads don't feel cohesive. Customers are confused.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {/* Large card with image */}
          <div className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden border-2 border-[#FF6B00]/30">
            <Image
              src="https://images.ctfassets.net/pj0maraabon4/7qrQLGC3CYh3SHYYvbR6qo/c652cada633a523313403d3e98f989b1/1239967efcbf104ee65ee5f271cd19b29f3bf586.jpg"
              alt="Brand identity"
              width={1000}
              height={100}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="text-3xl text-white mb-3">Brand Chaos Everywhere</h3>
              <p className="text-gray-300 text-lg">No consistency, no trust, no recognition</p>
            </div>
          </div>

          {/* Problem cards */}
          <div className="col-span-2 bg-gradient-to-br from-red-500/20 to-transparent border-2 border-red-500/40 rounded-3xl p-8">
            <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-2xl text-white mb-3">No Guidelines</h3>
            <p className="text-gray-400 text-lg">
              Missing brand style guide means everyone makes it up as they go
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1A1A1A] to-black border border-[#FF6B00]/30 rounded-3xl p-8 flex flex-col justify-center">
            <Shuffle className="w-12 h-12 text-[#FF6B00] mb-4" />
            <h3 className="text-2xl text-white mb-2">Different Assets</h3>
            <p className="text-gray-400">Each team uses their own versions</p>
          </div>

          <div className="bg-gradient-to-br from-[#1A1A1A] to-black border border-[#FF6B00]/30 rounded-3xl p-8 flex flex-col justify-center">
            <Eye className="w-12 h-12 text-[#FF6B00] mb-4" />
            <h3 className="text-2xl text-white mb-2">Random Changes</h3>
            <p className="text-gray-400">Visual identity shifts over time</p>
          </div>

          {/* Full width impact bar */}
          <div className="col-span-4 bg-gradient-to-r from-[#FF6B00] to-[#CC5500] rounded-3xl p-10 text-center">
            <h3 className="text-4xl text-white mb-4">The Real Cost?</h3>
            <p className="text-2xl text-white/90">
              Customers can't recognize your brand. Trust is broken. Professional credibility is gone.
            </p>
          </div>

          {/* Quote-style cards */}
          <div className="col-span-2 bg-black/50 border-l-4 border-[#FF6B00] rounded-xl p-8">
            <p className="text-gray-300 text-lg italic mb-3">
              "I saw three different logos from the same company this week. Are they even the same business?"
            </p>
            <p className="text-[#FF6B00]">— Confused Customer</p>
          </div>

          <div className="col-span-2 bg-black/50 border-l-4 border-[#FF6B00] rounded-xl p-8">
            <p className="text-gray-300 text-lg italic mb-3">
              "Our Instagram looks nothing like our website. Which one is the real brand?"
            </p>
            <p className="text-[#FF6B00]">— Marketing Manager</p>
          </div>
        </div>
      </div>
    </section>
  );
}