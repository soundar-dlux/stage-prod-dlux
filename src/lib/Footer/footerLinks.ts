export type FooterLink = {
  label: string;
  href: string;
  };

export const footerLinks = {
  quickLinks: [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Careers", href: "/about/careers" },
    { label: "Contact Us", href: "/contact-us" },
  ],
  about: [
    { label: "Our Growth Story", href: "/about/our-growth-story" },
    { label: "Our Teams", href: "/about/our-team" },
    { label: "Why Dlux", href: "/about/why-dlux" },
    { label: "Partners", href: "/about/partners" },
  ],
  resources: [
    { label: "Blogs", href: "/resources/blogs" },
    { label: "Case Studies", href: "/resources/success-stories" },
    { label: "Life@DLUX", href: "/about/our-team" },
    { label: "Video Library", href: "/resources/video-library" },
  ],
};
