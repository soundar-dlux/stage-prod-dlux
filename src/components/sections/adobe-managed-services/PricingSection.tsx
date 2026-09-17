"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SecondaryButton from "../../ui/Buttons/SecondaryButton";
import PrimaryButton from "../../ui/Buttons/PrimaryButton";
import SectionBadge from "../../ui/SectionBadge";

interface PricingSectionProps {
  recommendedRibbon: StaticImageData;
}

interface Feature {
  label: string;
  value: string;
  disabled?: boolean;
}

interface Plan {
  name: string;
  price: string;
  strikePrice?: string;
  per: string;
  features: Feature[];
  recommended?: boolean;
}

export default function PricingSection({
  recommendedRibbon,
}: PricingSectionProps) {
  const handleButtonClick = () => {
    const url =
      "https://forms.zohopublic.in/dluxtech/form/Webform/formperma/Mm_XtA7tFlnwtYUUkLXV7HIr-dQSLYjyNHFHCm_YQK0";
    window.open(url, "_blank", "width=700,height=650");
  };

  const plans: Plan[] = [
    {
      name: "BRONZE",
      price: "A$2,999/",
      per: "Per Month",
      features: [
        { label: "Managed Services Hours", value: "45 hours" },
        { label: "Email / Chat Support", value: "40 requests a month" },
        { label: "Minor Maintenance", value: "25 requests a month" },
        { label: "Training and Change Management", value: "5 hours a month" },
        {
          label: "Major Enhancements",
          value: "Not Applicable",
          disabled: true,
        },
      ],
    },
    {
      name: "SILVER",
      price: "A$5,999/",
      per: "Per Month",
      features: [
        { label: "Managed Services Hours", value: "100 hours" },
        { label: "Email / Chat Support", value: "80 requests a month" },
        { label: "Minor Maintenance", value: "60 requests a month" },
        { label: "Training and Change Management", value: "15 hours a month" },
        {
          label: "Major Enhancements",
          value: "Not Applicable",
          disabled: true,
        },
      ],
    },
    {
      name: "GOLD",
      price: "A$7,999/",
      strikePrice: "A$9,999/",
      per: "Per Month",
      recommended: true,
      features: [
        { label: "Managed Services Hours", value: "150 hours" },
        { label: "Email / Chat Support", value: "100 requests a month" },
        { label: "Minor Maintenance", value: "80 requests a month" },
        { label: "Training and Change Management", value: "50 hours a month" },
        {
          label: "Major Enhancements",
          value: "40 hours carried over (3 months)",
        },
      ],
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative overflow-hidden py-10 px-6"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0A0A0A] to-black" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#FF3901]/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#F07800]/10 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center flex flex-col items-center gap-5"
        >
          <SectionBadge
        label="Pricing Plans"
        iconSrc="https://images.ctfassets.net/pj0maraabon4/4WH6837PWmPPMC4GKpyDbY/1a3fbb4bb45e6b9490e97039d47de480/dlux-dark-logo-subtitle.svg"
        iconAlt="Star Icon"
      />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white max-w-4xl">
            Don&apos;t Miss Out On These{" "}<br/>
            <span className="bg-gradient-to-r from-[#F07800] to-[#FF3901] bg-clip-text text-transparent">
              Great Deals
            </span>
          </h2>

          <p className="text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed">
            Choose the plan that best fits your business needs and unlock the
            full value of Adobe Workfront with premium support and services.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-14 lg:mt-20">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              ribbon={recommendedRibbon}
              onCTA={handleButtonClick}
              delay={index * 0.25}
              index={index}
            />
          ))}
        </div>

        {/* Terms */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10"
        >
          <Link href="#">
            <p className="text-sm text-white/60 hover:text-white transition">
              Terms & conditions*
            </p>
          </Link>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mt-6"
        >
          <Link
            href="/contact-us"
            aria-label="Book a free strategy call with our team"
            title="Book a free strategy call"
          >
            <PrimaryButton>Still Confused? Talk To Us</PrimaryButton>
          </Link>
        </motion.div>

        {/* Bottom Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <InfoBox
            title="Proof HQ"
            text="Switch to Workfront for proofing that's effortless. We'll help you migrate your data with our best-in-class services!"
            delay={0.2}
          />
          <InfoBox
            title="Content Operations"
            text="Workfront gives you X-ray vision for your content projects. Lost assets and content scramble? Not anymore."
            delay={0.4}
          />
        </div>
      </div>
    </motion.section>
  );
}

/* ---------------- SUB COMPONENTS ---------------- */
function PricingCard({
  plan,
  ribbon,
  onCTA,
  delay = 0,
}: {
  plan: Plan;
  ribbon: StaticImageData;
  onCTA: () => void;
  delay?: number;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -12 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay }}
      className={`group relative overflow-hidden rounded-[32px] border backdrop-blur-xl transition-all duration-500 ${
        plan.recommended
          ? "border-[#FF3901]/50 bg-white/10 shadow-[0_20px_60px_rgba(255,57,1,0.18)] lg:-mt-6"
          : "border-white/10 bg-white/5 hover:border-[#F07800]/40"
      }`}
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF3901]/10 via-transparent to-[#F07800]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Recommended Badge */}
      {plan.recommended && (
        <div className="absolute top-6 right-6 z-20 rounded-full bg-gradient-to-r from-[#F07800] to-[#FF3901] px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-white shadow-lg">
          Recommended
        </div>
      )}

      {/* Top Line */}
      <div
        className={`absolute top-0 left-0 h-[4px] w-full ${
          plan.recommended
            ? "bg-gradient-to-r from-[#F07800] to-[#FF3901]"
            : "bg-white/10"
        }`}
      />

      <div className="relative z-10 p-8 lg:p-10 text-white h-full flex flex-col">
        {/* Plan Name */}
        <div className="mb-6">
          <div className="inline-flex px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-semibold tracking-[2px] uppercase text-white/80">
            {plan.name}
          </div>
        </div>

        {/* Price */}
        <div className="mb-8">
          {plan.strikePrice && (
            <p className="text-white/30 line-through text-xl mb-2">
              {plan.strikePrice}
            </p>
          )}

          <h1 className="text-[44px] lg:text-[56px] font-bold leading-none">
            <span className="bg-gradient-to-r from-[#F07800] to-[#FF3901] bg-clip-text text-transparent">
              {plan.price}
            </span>
          </h1>

          <p className="text-white/50 mt-2 text-sm uppercase tracking-[2px]">
            {plan.per}
          </p>
        </div>

        {/* Features */}
        <ul className="space-y-5 flex-1">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-4">
              <div
                className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold mt-1 ${
                  f.disabled
                    ? "bg-red-500/10 text-red-400"
                    : "bg-[#FF3901]/10 text-[#F07800]"
                }`}
              >
                {f.disabled ? "✕" : "✓"}
              </div>

              <div>
                <p className="font-semibold text-white">{f.label}</p>
                <p className="text-white/50 leading-relaxed">{f.value}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-10">
          <SecondaryButton onClick={onCTA}>
            Subscribe Now
          </SecondaryButton>
        </div>
      </div>
    </motion.div>
  );
}

function InfoBox({
  title,
  text,
  delay = 0,
}: {
  title: string;
  text: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-white transition-all duration-500 hover:border-[#FF3901]/30 hover:bg-white/10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF3901]/10 via-transparent to-[#F07800]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="w-12 h-[3px] rounded-full bg-gradient-to-r from-[#F07800] to-[#FF3901] mb-5" />

        <h3 className="text-2xl font-bold mb-4">{title}</h3>

        <p className="leading-[30px] text-white/65">{text}</p>
      </div>
    </motion.div>
  );
}