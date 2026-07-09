import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import About from "../../components/landing/About";
import VisionMission from "../../components/landing/VisionMission";
import LeadershipMessage from "../../components/landing/LeadershipMessage";
import OrganizationOverview from "../../components/landing/OragnisationOverview";
import DepartmentOverview from "../../components/landing/DepartmentOverview";
import CampusOverview from "../../components/landing/CampusOverview";
import GalleryPreview from "../../components/landing/GalleryPreview";
import EmployeeActivities from "../../components/landing/EmployeeActivities";
import LatestNews from "../../components/landing/LatestNews";
import UpcomingEvents from "../../components/landing/UpcomingEvents";
import ContactSection from "../../components/landing/ContactSection";
import Footer from "../../components/landing/Footer";

const LandingPage = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <VisionMission />
      <LeadershipMessage />
      <OrganizationOverview />
      <DepartmentOverview />
      <CampusOverview />
      <GalleryPreview />
      <EmployeeActivities />
      <LatestNews />
      <UpcomingEvents />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingPage;