import HeroSection from "@/src/components/sections/adobe-managed-services/HeroSection";
import awms_hero_primary_outer from "@/src/app/services/adobe-managed-services/Campaign_Assests/awms_hero_primary_outer.png";
import awms_hero_primary_inner from "@/src/app/services/adobe-managed-services/Campaign_Assests/awms_hero_primary_inner.png";
import awms_hero_primary_img from "@/src/app/services/adobe-managed-services/Campaign_Assests/awms_hero_primary_img.png";

import awms_cer1 from "@/src/app/services/adobe-managed-services/Campaign_Assests/awms_cer1.png";
import awms_cer2 from "@/src/app/services/adobe-managed-services/Campaign_Assests/awms_cer2.png";
import awms_cer3 from "@/src/app/services/adobe-managed-services/Campaign_Assests/awms_cer3.png";
import NumberStatsSection from "@/src/components/sections/adobe-managed-services/NumberStatsSection";
import awms_partner1 from "@/src/app/services/adobe-managed-services/Campaign_Assests/awms_partner1.png";
import awms_partner2 from "@/src/app/services/adobe-managed-services/Campaign_Assests/awms_partner2.png";
import awms_partner3 from "@/src/app/services/adobe-managed-services/Campaign_Assests/awms_partner3.png";
import PartnersSection from "@/src/components/sections/adobe-managed-services/PartnersSection";
import awms_dlw_icon1 from "@/src/app/services/adobe-managed-services/Campaign_Assests/awms-dlw_icon1.png";
import awms_dlw_icon2 from "@/src/app/services/adobe-managed-services/Campaign_Assests/awms-dlw_icon2.png";
import awms_dlw_icon3 from "@/src/app/services/adobe-managed-services/Campaign_Assests/awms-dlw_icon3.png";
import awms_dlw_icon4 from "@/src/app/services/adobe-managed-services/Campaign_Assests/awms-dlw_icon4.png";
import awms_dlw_icon5 from "@/src/app/services/adobe-managed-services/Campaign_Assests/awms-dlw_icon5.png";
import awms_dlw_icon6 from "@/src/app/services/adobe-managed-services/Campaign_Assests/awms-dlw_icon6.png";
import awms_dlw_icon7 from "@/src/app/services/adobe-managed-services/Campaign_Assests/awms-dlw_icon7.png";
import awms_dlw_icon8 from "@/src/app/services/adobe-managed-services/Campaign_Assests/awms-dlw_icon8.png";
import DluxWorkfrontSection from "@/src/components/sections/adobe-managed-services/DluxWorkfrontSection";
import awms_rec_top_svg from "@/src/app/services/adobe-managed-services/Campaign_Assests/awms_rec_top_svg.svg";
import PricingSection from "@/src/components/sections/adobe-managed-services/PricingSection";
import { fetchAdobeWorkfrontManagedServices } from "@/src/lib/contentful/adobe-workfront-managed-services";
import TestimonialsSection from "@/src/components/sections/adobe-managed-services/TestimonialsSection";
import ClientsSection from "@/src/components/ui/ClientLogo/ClientsSection";
import ContactSection3D from "@/src/components/ui/modal/contact-cta";

export default async function AdobeWorkfrontManagedServicesPage() {
  const data = await fetchAdobeWorkfrontManagedServices();
  const testimonials = [
    {
      paragraph: data.dluxClientReview[0].clientParagraph,
      author: data.dluxClientReview[0].clientH3,
      bgImage: data.girl_banner[0].dluxImageCollection.items[1].url,
    },
    {
      paragraph: data.client2[0].clientParagraph,
      author: data.client2[0].clientH3,
      bgImage: data.girl_banner[0].dluxImageCollection.items[1].url,
    },
    {
      paragraph: data.client3[0].clientParagraph,
      author: data.client3[0].clientH3,
      bgImage: data.girl_banner[0].dluxImageCollection.items[1].url,
    },
    {
      paragraph: data.client4[0].clientParagraph,
      author: data.client4[0].clientH3,
      bgImage: data.girl_banner[0].dluxImageCollection.items[1].url,
    },
  ];
  return (
    <>
      <HeroSection
        awmsHeroPrimaryOuter={awms_hero_primary_outer}
        awmsHeroPrimaryInner={awms_hero_primary_inner}
        awmsHeroPrimaryImg={awms_hero_primary_img}
      />
      <NumberStatsSection cer1={awms_cer1} cer2={awms_cer2} cer3={awms_cer3} />
      <PartnersSection
        partner1={awms_partner1}
        partner2={awms_partner2}
        partner3={awms_partner3}
      />
      <DluxWorkfrontSection
        icon1={awms_dlw_icon1}
        icon2={awms_dlw_icon2}
        icon3={awms_dlw_icon3}
        icon4={awms_dlw_icon4}
        icon5={awms_dlw_icon5}
        icon6={awms_dlw_icon6}
        icon7={awms_dlw_icon7}
        icon8={awms_dlw_icon8}
      />
      <PricingSection recommendedRibbon={awms_rec_top_svg} />;
      {/* Reusable Component */}
      <ClientsSection />
      <TestimonialsSection
        headingText={
          data?.dluxClientReview?.[0]?.clientText ?? "What Our Clients Say"
        }
        testimonials={testimonials}
        bottomImage={
          data?.ourClients?.[0]?.dluxImageCollection?.items?.[10]?.url ?? ""
        }
      /> ;
      <ContactSection3D/>
    </>
  );
}
