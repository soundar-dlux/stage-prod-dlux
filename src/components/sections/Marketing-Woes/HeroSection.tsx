import { ArrowRight, Sparkles } from 'lucide-react';
import SectionBadge from '../../ui/SectionBadge';
import Link from 'next/link';
import PrimaryButton from '../../ui/Buttons/PrimaryButton';
import SecondaryButton from '../../ui/Buttons/SecondaryButton';

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-16 py-24 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-[#FF6B00] rounded-full blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#FF6B00] rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '3s' }}></div>
      
      <div className="max-w-7xl w-full relative z-10">
        <div className="text-center mt-14 justify-items-center">
          
          <SectionBadge
                    label="Marketing Problems? We've Got Solutions"
                    iconSrc="https://images.ctfassets.net/pj0maraabon4/28ATinJOjDLVX2WIv8ewsz/5701a5a23309328dd0436678f1f92603/46b95943c3053783fc289bf504656384e8a8c95d.png"
                    iconAlt="AI Icon"
                    className="mb-6"
                  />
          <h1 className="text-6xl mb-8 text-white leading-tight font-bold">
           Technology Amplified,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF9500]">
              Marketing Simplified  
            </span>
          </h1>
          <p className="mt-2    
            max-w-3xl
            text-sm
            leading-relaxed
            text-white/90
            sm:mt-6
            sm:text-lg">
            You're not alone. 87% of marketers struggle with the same challenges. 
            Let's tackle them together and transform your marketing from frustrating to phenomenal.
          </p>
          <div className="flex gap-6 justify-center items-center mt-8">
             <Link href="/about">
            <PrimaryButton className="px-8 py-3.5 text-sm sm:text-base">
              Know More
            </PrimaryButton>
          </Link>
          <Link href="/about">
            <SecondaryButton className="px-8 py-3.5 text-sm sm:text-base">
             Start Your Free Trial
            </SecondaryButton>
          </Link>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}