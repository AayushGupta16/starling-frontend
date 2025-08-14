import React from "react";

const BlogSection: React.FC = () => {
  return (
    <div className="py-20 px-4 sm:px-8 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Blog</h2>
        <div className="bg-gray-800 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">
            How Starling Reached 100% on Web Vitals
          </h3>
          <p className="text-gray-400 mb-4">Posted on July 26, 2024</p>
          <div className="prose prose-invert max-w-none">
            <p>
              In the competitive landscape of web development, performance is
              paramount. At Starling, we embarked on a journey to achieve a
              perfect 100% score on Google's Web Vitals, and we're excited to
              share how we did it.
            </p>
            <p>
              Our first step was a comprehensive audit of our frontend
              architecture. We identified several bottlenecks, including large
              bundle sizes, unoptimized images, and excessive render-blocking
              resources.
            </p>
            <p>
              To tackle these issues, we implemented a multi-faceted strategy.
              We adopted code-splitting to reduce initial load times, ensuring
              users only download the JavaScript they need. We also integrated
              next-generation image formats like WebP and AVIF, and implemented
              lazy loading for offscreen images.
            </p>
            <p>
              On the server side, we optimized our API responses and leveraged
              caching to deliver data faster. The result? A blazing-fast user
              experience and a perfect 100% score across all Web Vitals metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;