
import { MessageSquare, AlertCircle, TrendingUp, Lightbulb } from 'lucide-react';
import Image from 'next/image';

export function ProblemSection10() {
  return (
    <section className="py-32 px-8 relative">
      {/* Radial/circular design */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border-2 border-[#FF6B00]/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-2 border-[#FF6B00]/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-2 border-[#FF6B00]/20 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-6 py-3 rounded-full mb-6">
            <MessageSquare className="w-5 h-5" />
            <span className="text-lg">Challenge #9</span>
          </div>
          <h2 className="text-6xl mb-6 text-white">
            Ignoring Customer <span className="text-[#FF6B00]">Feedback</span>
          </h2>
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto">
            Your customers are telling you what they need, but you're not listening. 
            Valuable insights are slipping through the cracks, and competitors are gaining ground.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Center large image card */}
          <div className="col-span-3 relative rounded-3xl overflow-hidden border-2 border-[#FF6B00]/30 h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1633307057722-a4740ba0c5d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMGZlZWRiYWNrJTIwZGF0YXxlbnwxfHx8fDE3NzE4NDgzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Customer feedback"
              width={1000}
              height={100}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70"></div>
            
            {/* Overlaid circular badges */}
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 bg-red-500/90 rounded-full w-32 h-32 flex items-center justify-center border-4 border-white/20">
              <div className="text-center">
                <div className="text-white text-3xl mb-1">247</div>
                <div className="text-white text-xs">Ignored<br/>Reviews</div>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF6B00] rounded-full w-40 h-40 flex items-center justify-center border-4 border-white/30 shadow-2xl">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-white mx-auto mb-2" />
                <div className="text-white text-lg">Feedback<br/>Ignored</div>
              </div>
            </div>

            <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 bg-red-500/90 rounded-full w-32 h-32 flex items-center justify-center border-4 border-white/20">
              <div className="text-center">
                <div className="text-white text-3xl mb-1">89</div>
                <div className="text-white text-xs">Unanswered<br/>Complaints</div>
              </div>
            </div>
          </div>

          {/* Bottom consequence cards */}
          <div className="bg-gradient-to-br from-[#1A1A1A] to-black border-2 border-red-500/50 rounded-2xl p-8 text-center">
            <AlertCircle className="w-14 h-14 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl text-white mb-3">No System</h3>
            <p className="text-gray-400">
              Missing process to collect and analyze valuable customer insights
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1A1A1A] to-black border-2 border-red-500/50 rounded-2xl p-8 text-center">
            <TrendingUp className="w-14 h-14 text-red-500 mx-auto mb-4 rotate-180" />
            <h3 className="text-2xl text-white mb-3">Lost Trust</h3>
            <p className="text-gray-400">
              Customer complaints go unanswered, eroding loyalty and trust
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1A1A1A] to-black border-2 border-red-500/50 rounded-2xl p-8 text-center">
            <Lightbulb className="w-14 h-14 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl text-white mb-3">Missed Innovation</h3>
            <p className="text-gray-400">
              Losing opportunities to improve products and stay competitive
            </p>
          </div>
        </div>

        {/* Bottom warning banner */}
        <div className="mt-12 bg-gradient-to-r from-[#FF6B00]/20 via-[#FF6B00]/10 to-[#FF6B00]/20 border-y-2 border-[#FF6B00] p-8 text-center rounded-2xl">
          <p className="text-3xl text-white">
            <span className="text-[#FF6B00]">Result:</span> Competitors listen while you lose market share
          </p>
        </div>
      </div>
    </section>
  );
}