"use client";
import * as React from "react";
import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { HousePlus } from "lucide-react";
import { ContactRound } from "lucide-react";
import { UserCog } from "lucide-react";
import { BookOpenCheck } from "lucide-react";

import LoadingAnimation from "./LoadingAnimation";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuIconCross, setIsMobileMenuIconCross] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMobileMenuIconCross(!isMobileMenuIconCross);
  };
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return <LoadingAnimation />;
  }

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsMobileMenuIconCross(false);

    if (typeof window !== "undefined") {
      if (window.location.pathname === "/") {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", `/#${sectionId}`);
          return;
        }
      }
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-gray-100/95 backdrop-blur-md shadow-sm border-b border-gray-200/50 transition-all duration-300">
        <div className="mx-auto max-w-screen-xl px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <motion.div
                className="block text-teal-600 items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <a
                  href="/#home"
                  onClick={(e) => handleNavClick(e, "home")}
                  className="flex items-center cursor-pointer"
                >
                  <Image
                    src="/images/RCTO.png"
                    width={140}
                    height={140}
                    alt="Remote CTO logo"
                    className="h-auto max-w-[100px] sm:max-w-[120px] lg:max-w-[140px] object-contain"
                    priority
                  />
                </a>
              </motion.div>
            </div>

            <div className="md:flex md:items-center mt-2 md:gap-12">
              <motion.nav
                aria-label="Global"
                className="hidden md:block"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <a
                      className="text-black transition relative hover:text-black pb-1 flex items-center cursor-pointer
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-black 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                      href="/#home"
                      onClick={(e) => handleNavClick(e, "home")}
                    >
                      <HousePlus className="mr-2" />
                      HOME
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-black transition relative hover:text-black pb-1 flex items-center cursor-pointer
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-black 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                      href="/#about"
                      onClick={(e) => handleNavClick(e, "about")}
                    >
                      <BookOpenCheck className="mr-2 " />
                      ABOUT US
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-black transition relative hover:text-black pb-1 flex items-center cursor-pointer
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-black 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                      href="/#services"
                      onClick={(e) => handleNavClick(e, "services")}
                    >
                      <UserCog className="mr-2" />
                      SERVICES
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-black transition relative hover:text-black pb-1 flex items-center cursor-pointer
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-black 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                      href="/#contact"
                      onClick={(e) => handleNavClick(e, "contact")}
                    >
                      <ContactRound className="mr-2" />
                      CONTACT US
                    </a>
                  </li>
                </ul>
              </motion.nav>

              <div className="flex items-center gap-4">
                <div className="block md:hidden">
                  <motion.button
                    onClick={toggleMobileMenu}
                    className={`rounded p-2 text-black transition ${
                      isMobileMenuIconCross
                        ? "transform rotate-45 transition-transform duration-300"
                        : ""
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div
                      className={`space-y-2 ${
                        isMobileMenuIconCross ? "hidden" : "block"
                      }`}
                    >
                      <div className="w-3 h-0.5 bg-black"></div>
                      <div className="w-5 h-0.5 bg-black"></div>
                      <div className="w-7 h-0.5 bg-black"></div>
                    </div>
                    <div
                      className={`w-7 h-0.5 bg-black transform -rotate-45 transition-transform duration-300 ${
                        isMobileMenuIconCross ? "block" : "hidden"
                      }`}
                    ></div>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {isMobileMenuOpen && (
            <motion.nav
              className="lg:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ul className="flex flex-col items-center gap-2 mt-5 text-sm">
                <li>
                  <a
                    className="text-black transition relative hover:text-black pb-1 flex items-center cursor-pointer
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-black 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                    href="/#home"
                    onClick={(e) => handleNavClick(e, "home")}
                  >
                    <HousePlus className="mr-2" />
                    HOME
                  </a>
                </li>
                <li>
                  <a
                    className="text-black transition relative hover:text-black pb-1 flex items-center cursor-pointer
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-black 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                    href="/#about"
                    onClick={(e) => handleNavClick(e, "about")}
                  >
                    <BookOpenCheck className="mr-2 " />
                    ABOUT US
                  </a>
                </li>
                <li>
                  <a
                    className="text-black transition relative hover:text-black pb-1 flex items-center cursor-pointer
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-black 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                    href="/#services"
                    onClick={(e) => handleNavClick(e, "services")}
                  >
                    <UserCog className="mr-2" />
                    SERVICES
                  </a>
                </li>
                <li>
                  <a
                    className="text-black transition relative hover:text-black pb-1 flex items-center cursor-pointer
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-black 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                    href="/#contact"
                    onClick={(e) => handleNavClick(e, "contact")}
                  >
                    <ContactRound className="mr-2" />
                    CONTACT US
                  </a>
                </li>
              </ul>
            </motion.nav>
          )}
        </div>
      </header>
    </>
  );
};
export default Navbar;
