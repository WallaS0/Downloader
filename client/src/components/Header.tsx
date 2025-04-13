import React from "react";
import { Link, useLocation } from "wouter";
import { Button } from "./ui/button";
import { Download, Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white">
                <Download className="h-5 w-5" />
              </div>
              <span className="ml-2 font-semibold text-xl">VideoGrab</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <Link href="/">
              <span className={`text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium ${location === "/" ? "text-primary" : ""}`}>
                Home
              </span>
            </Link>
            <Link href="/how-it-works">
              <span className={`text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium ${location === "/how-it-works" ? "text-primary" : ""}`}>
                How It Works
              </span>
            </Link>
            <Link href="/features">
              <span className={`text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium ${location === "/features" ? "text-primary" : ""}`}>
                Features
              </span>
            </Link>
            <Link href="/faq">
              <span className={`text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium ${location === "/faq" ? "text-primary" : ""}`}>
                FAQ
              </span>
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth">
              <Button>Sign Up</Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              type="button" 
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/">
              <span className={`block px-3 py-2 rounded-md text-base font-medium ${location === "/" ? "text-primary" : "text-gray-700"}`}>
                Home
              </span>
            </Link>
            <Link href="/how-it-works">
              <span className={`block px-3 py-2 rounded-md text-base font-medium ${location === "/how-it-works" ? "text-primary" : "text-gray-700"}`}>
                How It Works
              </span>
            </Link>
            <Link href="/features">
              <span className={`block px-3 py-2 rounded-md text-base font-medium ${location === "/features" ? "text-primary" : "text-gray-700"}`}>
                Features
              </span>
            </Link>
            <Link href="/faq">
              <span className={`block px-3 py-2 rounded-md text-base font-medium ${location === "/faq" ? "text-primary" : "text-gray-700"}`}>
                FAQ
              </span>
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex flex-col space-y-3 px-5">
              <Link href="/auth">
                <Button variant="ghost" className="w-full justify-center">Sign In</Button>
              </Link>
              <Link href="/auth">
                <Button className="w-full justify-center">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
