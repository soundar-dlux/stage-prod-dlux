"use client";

import Link from "next/link";

export default function Newsletter() {
    return (
        <section className="w-full bg-black py-12 md:py-20 px-4 flex justify-center">
            <div className="relative w-full max-w-7xl bg-[#EDEDED] rounded-[24px] md:rounded-[28px] px-6 sm:px-10 md:px-16 py-10 md:py-12 overflow-visible flex flex-col md:flex-row items-start md:items-center">

                {/* LEFT CONTENT */}
                <div className="max-w-xl z-10">
                    <p className="text-gray-500 text-sm mb-2 md:mb-3">
                        Pro Tip
                    </p>

                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-black leading-snug mb-3 md:mb-4">
                        Bookmark this page and check back weekly
                    </h2>

                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5 md:mb-6">
                        We’re always dropping new insights to help you and your team work
                        smarter, faster, and with confidence.
                    </p>

                    {/* MOBILE BUTTON */}
                    <Link
                        href="https://www.linkedin.com/newsletters/martech-basket-6948514756882247680"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Subscribe to our newsletter on LinkedIn"
                        className="md:hidden"
                    >
                        <button className="px-5 py-2.5 border border-black rounded-full text-black hover:bg-black hover:text-white transition w-full sm:w-auto">
                            Subscribe To Our Newsletter
                        </button>
                    </Link>

                    {/* DESKTOP BUTTON */}
                    <div className="hidden md:block absolute left-[55%] top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Link
                            href="https://www.linkedin.com/newsletters/martech-basket-6948514756882247680"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Subscribe to our newsletter on LinkedIn"
                        >
                            <button className="px-6 py-2 border border-black rounded-full text-black bg-white hover:bg-black hover:text-white transition-all duration-300 shadow-sm hover:shadow-md relative -top-[80px]">
                                Subscribe To Our Newsletter
                            </button>
                        </Link>
                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="relative w-full md:w-auto mt-8 md:mt-0 md:absolute md:right-0 md:top-0 md:h-full flex justify-center md:block">
                    <img
                        src="https://images.ctfassets.net/pj0maraabon4/BTBRUZ93VUJrXRWnFlxNN/2916547efdc515a574b9c7e81c017fe7/woman-pointing.png"
                        alt="woman"
                        title="Woman pointing to newsletter subscription"
                        className="
                            w-[220px] sm:w-[260px] md:w-auto
                            md:h-[110%]
                            object-contain
                            md:object-cover
                            md:relative md:-top-[60px]
                        "
                    />
                </div>

                {/* BOTTOM SLIDER */}
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-8 right-4 md:right-8">
                    <div className="w-full h-[2px] bg-gray-300 relative">

                        <span className="absolute -left-2 -top-[5px] w-3 h-3 bg-gray-400 rounded-full"></span>

                        <span className="absolute left-1/2 -translate-x-1/2 -top-[5px] w-3 h-3 bg-black rounded-full"></span>

                        <span className="absolute -right-2 -top-[5px] w-3 h-3 bg-gray-400 rounded-full"></span>
                    </div>
                </div>

            </div>
        </section>
    );
}