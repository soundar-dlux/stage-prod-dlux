
import { TrendingDown, X } from 'lucide-react';
import Image from 'next/image';

export function ProblemSection2() {
  return (
    <section className="py-32 px-8 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        {/* Diagonal split design */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-0 items-stretch min-h-[600px]">
            {/* Left side - Content with diagonal edge */}
            <div className="bg-gradient-to-br from-[#FF6B00] to-[#CC5500] p-16 flex flex-col justify-center  z-[999999] relative overflow-hidden" style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }}>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full mb-6">
                  <TrendingDown className="w-5 h-5" />
                  <span>Challenge #2</span>
                </div>
                <h2 className="text-5xl mb-6 text-white">
                  Poor ROI on Advertising Spend
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  You're pouring money into ads, but the returns don't justify the investment. 
                  Every dollar feels wasted, and you can't figure out what's working.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-white">
                    <X className="w-6 h-6 mt-1 flex-shrink-0" />
                    <span className="text-lg">No clear attribution model to track performance</span>
                  </div>
                  <div className="flex items-start gap-3 text-white">
                    <X className="w-6 h-6 mt-1 flex-shrink-0" />
                    <span className="text-lg">Budget allocated to underperforming channels</span>
                  </div>
                  <div className="flex items-start gap-3 text-white">
                    <X className="w-6 h-6 mt-1 flex-shrink-0" />
                    <span className="text-lg">Lack of A/B testing and optimization</span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
            
            {/* Right side - Image */}
            <div className="relative -ml-28">
              <Image
                src="https://images.ctfassets.net/pj0maraabon4/3TyQlumi8wD4eIqzj9UFaN/7cddedb3f7e4b86ab35b8aaff8f64927/a7fa5af90f357228caa975432e6386848028612e.jpg"
                alt="Digital analytics"
                 fill
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0A0A0A]/50 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}