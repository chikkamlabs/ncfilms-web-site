import Header from "@/components/header";
import HeroSection from "@/components/herosection";
import Services from "@/components/services";
import OurWork from "@/components/ourwork";
import WhyChooseUs from "@/components/whychooseus";
import OurTeam from "@/components/ourteam";
import Testimonials from "@/components/testimonials";
import ContactUs from "@/components/contactus";
import Footer from "@/components/footer";
import { getHomeScreenImages } from "@/lib/herosectionStore";
import { getAllProjects } from "@/lib/projectsStore";
import { getAllServices } from "@/lib/servicesStore";
import { getAllTeamMembers } from "@/lib/teamMemberStore";
import { getAllTestimonials } from "@/lib/testimonialsStore";
import { getScrollingMediaImages } from "@/lib/whychooseus";

export const dynamic = "force-dynamic";

export default async function LandingPage() {
  const [
    heroImages,
    services,
    projects,
    scrollingMedia,
    teamMembers,
    testimonials,
  ] = await Promise.all([
    getHomeScreenImages(),
    getAllServices(),
    getAllProjects(),
    getScrollingMediaImages(),
    getAllTeamMembers(),
    getAllTestimonials(),
  ]);

  const activeServiceTitles = services
    .filter((service) => service.isActive === true)
    .map((service) => service.title);

  return (
    <div className="min-h-screen flex flex-col bg-pure-white text-charcoal">
      <Header services={activeServiceTitles} />
      <main className="flex-1">
        <HeroSection images={heroImages} services={activeServiceTitles} />
        <Services services={services} />
        <OurWork projects={projects} />
        <WhyChooseUs
          row1Images={scrollingMedia.row1}
          row2Images={scrollingMedia.row2}
          services={activeServiceTitles}
        />
        <OurTeam members={teamMembers} />
        <Testimonials testimonials={testimonials} />
        <ContactUs services={activeServiceTitles} />
      </main>
      <Footer />
    </div>
  );
}
