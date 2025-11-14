import HeroSection from "../components/home/Hero";
import USPSection from "../components/home/USPSection";
import IssuesSections from "../components/home/IssuesSections";
import OurServices from "../components/home/OurServices";
import StatsSection from "../components/home/StatsSection";
import TestimonialSection from "../components/home/TestimonialSection";
import ConsultationSection from "../components/home/ConsultationSection";
import CallToActionSection from "../components/home/CallToActionSection";
import SliderComponent from "../components/home/Slider";
import BrowseCategory from "../components/home/BrowseCategory";
import TrustSection from "../components/home/TrustSection";
import SEO from "../components/SEO";
import { generateOrganizationSchema } from "../utils/schema";

const Home = () => {
  return (
    <main>
      <SEO
        title="AutoChoice - Find Your Dream Car | Used, New & Certified Cars"
        description="Browse thousands of quality used, new, and certified pre-owned cars in Pakistan. Transparent pricing, verified sellers, and comprehensive vehicle history reports."
        keywords="cars for sale Pakistan, used cars, new cars, certified pre-owned, buy car online, car marketplace, AutoChoice"
        schema={generateOrganizationSchema()}
      />
      <HeroSection />
      <USPSection />
      <CallToActionSection />
      <BrowseCategory />
      <SliderComponent />
      {/* <IssuesSections /> */}
      <OurServices />
      <StatsSection />
      <TrustSection />
      <TestimonialSection />
      <ConsultationSection />
    </main>
  );
};

export default Home;
