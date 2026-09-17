import { ArrowRight, Rocket, Award, Clock } from 'lucide-react';

export function Section4() {
  return (
    <section className="py-32 px-8 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B00] via-[#FF8500] to-[#FF6B00]"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-black/20 text-white px-6 py-3 rounded-full mb-8 backdrop-blur-sm">
            <Rocket className="w-5 h-5" />
            <span className="text-lg">Limited Time Offer</span>
          </div>
          <h2 className="text-7xl mb-8 text-white leading-tight">
            Ready to Turn<br />Things Around?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto">
            Join 10,000+ marketers who've transformed their strategies and seen 
            3x better results in just 90 days.
          </p>
        </div>

        {/* Large feature boxes */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-10 text-center hover:bg-white/20 transition-all">
            <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Award className="w-10 h-10 text-[#FF6B00]" />
            </div>
            <h3 className="text-2xl text-white mb-3">Proven Frameworks</h3>
            <p className="text-white/80 text-lg">Battle-tested strategies that actually work</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-10 text-center hover:bg-white/20 transition-all">
            <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-10 h-10 text-[#FF6B00]" />
            </div>
            <h3 className="text-2xl text-white mb-3">Expert Support</h3>
            <p className="text-white/80 text-lg">24/7 guidance from marketing veterans</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-10 text-center hover:bg-white/20 transition-all">
            <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-[#FF6B00]" />
            </div>
            <h3 className="text-2xl text-white mb-3">Fast Results</h3>
            <p className="text-white/80 text-lg">See measurable improvements in 30 days</p>
          </div>
        </div>

        <div className="text-center">
          <button className="bg-black hover:bg-gray-900 text-white px-16 py-8 rounded-full text-2xl transition-all inline-flex items-center gap-4 shadow-2xl hover:scale-105">
            Get Started Free
            <ArrowRight className="w-8 h-8" />
          </button>
          <p className="text-white/90 mt-6 text-lg">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </div>
    </section>
  );
}