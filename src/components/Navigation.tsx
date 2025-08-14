import { Zap } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";

type NavigationProps = {
  scrollTo: (section: "home" | "features" | "demo") => void;
};

const Navigation = ({ scrollTo }: NavigationProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className="relative z-50 flex justify-between items-center px-4 sm:px-8 py-6 backdrop-blur-sm bg-gray-900/50 border-b border-gray-800/50">
      <div className="flex items-center">
        <Zap className="text-white h-6 w-6 mr-2" />
        <span className="text-white text-xl font-bold">Starling</span>
      </div>
      <div className="hidden md:flex items-center space-x-6">
        {isHomePage ? (
          <>
            <button
              onClick={() => scrollTo("home")}
              className="text-white hover:text-gray-300"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo("demo")}
              className="text-white hover:text-gray-300"
            >
              Demo
            </button>
            <button
              onClick={() => scrollTo("features")}
              className="text-white hover:text-gray-300"
            >
              Features
            </button>
            <Link to="/blog" className="text-white hover:text-gray-300">
              Blog
            </Link>
          </>
        ) : (
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
        )}
      </div>
    </nav>
  );
};

export { Navigation };