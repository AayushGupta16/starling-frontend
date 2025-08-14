import React from "react";
import BlogSection from "../components/BlogSection";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { AnimatedBackground } from "../components/AnimatedBackground";

const BlogPage: React.FC = () => {
  return (
    <>
      <Navigation scrollTo={() => {}} />
      <AnimatedBackground />
      <div className="relative z-10">
        <BlogSection />
        <Footer />
      </div>
    </>
  );
};

export default BlogPage;