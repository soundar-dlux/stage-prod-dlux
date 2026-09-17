import AemTwoColumnScroll from '@/src/components/sections/platform/adobe/adobe-aem/AEMassets';
import AemCtaSection from '@/src/components/sections/platform/adobe/adobe-aem/AEMCTABanner';
import AemFaqSection from '@/src/components/sections/platform/adobe/adobe-aem/AEMFaq';
import AemFooterCtaSection from '@/src/components/sections/platform/adobe/adobe-aem/AEMFooterCTA';
import AemHero from '@/src/components/sections/platform/adobe/adobe-aem/AEMHeroSection'
import AemSitesTabs from '@/src/components/sections/platform/adobe/adobe-aem/AEMSitesTab';
import ClientsSection from '@/src/components/ui/ClientLogo/ClientsSection';


export default function AdobeAEMpage() {
  return (
    <main className="w-full bg-black">
    <AemHero/>
    <AemSitesTabs/>
    <AemTwoColumnScroll/>
    <AemCtaSection/>
    <ClientsSection/>
    <AemFaqSection/>
    <AemFooterCtaSection/>

    </main>
  );
}
