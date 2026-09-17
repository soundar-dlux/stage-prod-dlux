import BlogsList from "@/src/components/sections/resources/blogs/BlogsList";
import Hero from "@/src/components/sections/resources/blogs/Hero";
import LeftRightCards from "@/src/components/sections/resources/blogs/LeftRightCards";
import Newsletter from "@/src/components/sections/resources/blogs/Newsletter";
import Subscription from "@/src/components/sections/resources/blogs/Subscription";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blogs | DLUX TECH CORP PTY LTD",
    description:
        "Explore insightful blogs from DLUX covering AI, marketing strategies, digital transformation, and enterprise solutions.",
    keywords: [
        "DLUX Blogs",
        "AI Blogs",
        "Marketing Strategy Articles",
        "Digital Transformation Insights",
        "DLUX Tech Articles",
    ],
    openGraph: {
        title: "Blogs | DLUX TECH CORP PTY LTD",
        description:
            "Stay updated with the latest insights on AI, marketing, and enterprise innovation from DLUX.",
        url: "https://www.dluxtech.com/blogs",
        siteName: "DLUX Tech",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function BlogsPage() {
    return (
        <main>
            <Hero />
            <LeftRightCards />
            <BlogsList />
            <Newsletter />
            <Subscription />
        </main>
    );
}