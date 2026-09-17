"use client";

import { motion, type Variants } from "framer-motion";
import { memo } from "react";

const BRAND = {
  primary: "#FF3901",
  secondary: "#F07800",
};

/* Motion */
const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

function BestPracticesSection() {
  return (
    <section className="bg-black py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-xs md:text-sm uppercase tracking-widest text-white/50">
            Our Approach
          </span>

          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
            Best Practices We Follow
          </h2>
        </motion.div>

        {/* Blocks */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-16 md:space-y-20"
        >

          {/* Block 1 */}
          <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-10 md:gap-14">
            <div>
              <h3 className="text-xl md:text-2xl font-medium text-white mb-3">
                360° Understanding of Your Business
              </h3>
              <p className="text-white/70 leading-relaxed max-w-xl">
                We begin with a complete assessment of your IT ecosystem and
                Salesforce landscape, ensuring clarity before transformation.
              </p>
            </div>

            <div className="space-y-6 border-l border-white/10 pl-6">
              <div>
                <h4 className="text-base md:text-lg font-medium text-white mb-1">
                  01 · Current Process Analysis
                </h4>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  We evaluate existing workflows to retain strengths while
                  optimizing inefficiencies for future scalability.
                </p>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-medium text-white mb-1">
                  02 · Identifying Core Challenges
                </h4>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  Our consultants uncover bottlenecks across systems and
                  operations to eliminate silos and improve alignment.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Block 2 */}
          <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-10 md:gap-14">
            <div>
              <h3
                className="text-xl md:text-2xl font-medium mb-3"
                style={{ color: BRAND.primary }}
              >
                Strategic Blueprint for Success
              </h3>
              <p className="text-white/70 leading-relaxed max-w-xl">
                Based on gathered insights, we define a clear, tailored roadmap
                aligned with your business goals.
              </p>
            </div>

            <div className="space-y-6 border-l border-white/10 pl-6">
              <div>
                <h4 className="text-base md:text-lg font-medium text-white mb-1">
                  01 · Salesforce Org Assessment
                </h4>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  For existing Salesforce customers, we analyze the current org
                  to identify gaps and improvement opportunities.
                </p>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-medium text-white mb-1">
                  02 · High-Level Architecture Design
                </h4>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  We define cloud products, licenses, and architecture to guide
                  a smooth and scalable implementation.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Block 3 */}
          <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-10 md:gap-14">
            <div>
              <h3 className="text-xl md:text-2xl font-medium text-white mb-3">
                Project Kick-Off & Execution
              </h3>
              <p className="text-white/70 leading-relaxed max-w-xl">
                Once the strategy is finalized, we transition seamlessly into
                execution and delivery.
              </p>
            </div>

            <div className="space-y-6 border-l border-white/10 pl-6">
              <div>
                <h4 className="text-base md:text-lg font-medium text-white mb-1">
                  01 · Salesforce License Enablement
                </h4>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  We connect you with Salesforce account executives to ensure
                  the right licenses are procured efficiently.
                </p>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-medium text-white mb-1">
                  02 · Implementation & Customization
                </h4>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  Our team executes configuration, customization, and
                  integrations aligned with the defined architecture.
                </p>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

export default memo(BestPracticesSection);