"use client";

import React from "react";
import ImageLRComponenets from "@/src/components/WB-Component/ImageLR";


export default function BynderOverview() {
    return (
        <section   className="relative isolate mb-[30px] mt-[30px] overflow-hidden">
            <ImageLRComponenets
                imagePosition="left"
                title="Bynder Overview "
                highlightText="Bynder"
                highlightColor="bg-gradient-to-r from-subGradientText-from to-subGradientText-to bg-clip-text text-transparent"
                description={[
                    "DAM programs rarely struggle because of the platform itself. They struggle when metadata is designed in isolation, when local markets aren't consulted, or when adoption is treated as an afterthought once the system goes live. Our approach is built around avoiding those three problems from the start.",
                    "Bynder is a cloud-based digital asset management platform that brings images, video, documents and campaign material into one place, so approved assets are easier to find and can be delivered consistently across markets and channels.",
                    "DLUX tailors Bynder to the way organizations across APAC and beyond actually operate, from the structure of their brand to the realities of their local markets."
                ]}
                imageSrc="https://images.ctfassets.net/pj0maraabon4/2Dwq6QG200xVyBGHr4CAok/47e8958fc42a68f539b3c81bf45b0eef/Group_2264.svg"
                imageAlt="Bynder Overview Dashboard Showcase"
                showSectionBottomLine
                showTopLine={false}
                bgVariant="white"
            />
        </section>
    );
}