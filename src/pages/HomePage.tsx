import React, { useRef } from "react";
import HeroSection from "../components/HeroSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { DemoSection } from "../components/DemoSection";
import { Footer } from "../components/Footer";
import { Navigation } from "../components/Navigation";
import { AnimatedBackground } from "../components/AnimatedBackground";

const HomePage: React.FC = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);

  const scrollTo = (section: "home" | "features" | "demo" | "contact" | "blog") => {
    switch (section) {
      case "home":
        homeRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "features":
        featuresRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "demo":
        demoRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "blog":
        blogRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "contact":
        contactRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Navigation scrollTo={scrollTo} />
      <AnimatedBackground />
      <div className="relative z-10">
        <div ref={homeRef}>
          <HeroSection />
        </div>
        <div ref={demoRef}>
          <DemoSection />
        </div>
        <div ref={featuresRef}>
          <FeaturesSection />
        </div>
        <div ref={contactRef}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomePage;