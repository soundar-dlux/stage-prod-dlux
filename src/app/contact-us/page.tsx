import ContactFormSection from "@/src/components/sections/Contact-us/ContactFormSection";
import HeroSection from "@/src/components/sections/Contact-us/HeroSection";


export const metadata = {
  title: "Contact Us | Digital & Martech Consulting Services | DLUX",
  description:
    "Shoot us an email at sales@dluxtech.com for a quick connect! Let's collaborate to elevate your marketing strategies and drive success.",
};

export default function ContactUsPage() {
  return (
    <>
      <HeroSection   />
      <ContactFormSection/>
    </>
  );
}
