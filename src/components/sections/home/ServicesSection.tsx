"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeContainer, fadeUpItem } from "@/src/lib/animations";

type Service = {
  id: number;
  title: string;
  description:string;
  href: string;
};

const services: Service[] = [
  {
    id: 1,
    title: "Adobe Workfront ",
    description:"For strategic work management and project ",
    href: "/platform/adobe/workfront",
  },
  {
    id: 2,
    title: "Adobe Workfront Fusion",
    description:"for intelligent automation and seamless workflow orchestration ",
    href: "/platform/adobe/workfront-fusion",
  },
  {
    id: 3,
    title: "Aprimo DAM",
    description:" for enterprise-grade digital asset management and content governance ",
    href: "/platform/aprimo",
  },
  {
    id: 4,
    title: "Salesforce",
    description:"for CRM, marketing automation, commerce, and customer experience excellence ",
    href: "/platform/salesforce",
  },
  {
    id: 5,
    title: "Adobe Stack",
    description:"including AEM, Analytics, Experience Manager, Commerce Cloud, AEP, AJO and more",
    href: "/platform/adobe/adobe-aem",
  },
];

export default function ServicesSection() {
  return (
    <section
      aria-labelledby="services-heading"
      aria-describedby="services-description"
      className="relative bg-black py-8  lg:py-14 px-6"
    >
      <motion.div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 via-white/10 to-orange-900/20 py-10 lg:py-[100px] px-2 md:px-10"
        variants={fadeContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* 🔥 Blur Background Effects */}
        <div
          className="pointer-events-none absolute inset-0 -z-1"
          aria-hidden="true"
        >
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orange-500/30 blur-3xl" />
          <div className="absolute -left-32 -bottom-32 h-96 w-96 rounded-full bg-orange-600/30 blur-3xl" />
        </div>

        {/* Left Vertical Tag */}
        <div
          className="absolute left-[1%] top-[25%] hidden sm:block"
          aria-hidden="true"
        >
          <div className="bg-orange-500 px-3 py-2 text-xs font-semibold tracking-widest text-white rotate-[-90deg] origin-left">
            WHAT WE DO
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center px-2 md:px-10">
          {/* LEFT CONTENT */}
          <div className="md:px-10">
            <motion.h2
              id="services-heading"
              variants={fadeUpItem}
              className="text-3xl font-semibold text-white sm:text-4xl"
            >
             Adobe
            </motion.h2>

            <motion.p
              id="services-description"
              variants={fadeUpItem}
              className="mt-4 text-sm text-white/70 sm:text-base"
            >
              We specialize in cutting-edge business delivery solutions that
              unlock efficiency, intelligence, and growth through the world’s
              most powerful platforms:
            </motion.p>

            {/* Hidden SEO boost */}
            <p className="sr-only">
              Explore DLUX services including Adobe Workfront, Salesforce
              solutions, Aprimo DAM, and full marketing technology ecosystem
              consulting.
            </p>

            {/* Service List */}
            <div
              className="mt-10 space-y-5"
              role="list"
              aria-label="List of services offered by DLUX"
            >
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  variants={fadeUpItem}
                  role="listitem"
                >
                  <Link
                    href={service.href}
                    aria-label={`Learn more about ${service.title}`}
                    title={`Learn more about ${service.title}`}
                    className="group flex items-center justify-between rounded-full border border-white/20 px-6 py-4 transition hover:border-orange-500 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
                  >
                    <div className="block items-center gap-4">
                      <div className="flex items-center gap-4">
                      <span
                        className="text-orange-500 font-semibold"
                        aria-hidden="true"
                      >
                        {service.id.toString().padStart(2, "0")}
                      </span>

                      <h3 className="text-sm font-medium text-white sm:text-base">
                        {service.title}
                      </h3>
                      </div>
                     
                    </div>

                    <span
                      className="text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:text-orange-400"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <motion.div
            variants={fadeUpItem}
            className="relative overflow-hidden rounded-3xl justify-items-center"
          >
            <Image
              src="https://admin.dluxtech.com/api/media/file/69e73eb1a2ec1c8ec6512880"
              alt="DLUX team collaborating on enterprise Martech solutions using Adobe, Salesforce, and AI-driven digital transformation platforms"
              title="DLUX Martech Services and Digital Transformation Solutions"
              width={200}
              height={300}
              priority
              className="h-full w-[95%] object-cover rounded-[35px]"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
