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

  return (
    <>
      <header className="bg-gray-100 ">
        <div className="mx-auto max-w-screen-xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex h-30 lg:h-27 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <motion.div
                className="block text-teal-600  items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link href="/" className="flex items-center">
                  <Image
                    src="/images/RCTO.png"
                    width={220}
                    height={220}
                    alt="logo image"
                    className="mr-2m max-w-[130px] lg:max-w-[220px]"
                  />
                  
                  
                </Link>
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
                    <Link
                      className="text-black transition relative hover:text-black pb-1 flex items-center
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-black 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300 "
                      href="/"
                    >
                      <HousePlus className="mr-2" />
                      HOME
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black transition relative hover:text-black pb-1 flex items-center
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-black 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                      href="/about"
                    >
                      <BookOpenCheck className="mr-2 " />
                      ABOUT US
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black transition relative hover:text-black pb-1 flex items-center
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-black 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                      href="/services"
                    >
                      <UserCog className="mr-2" />
                      SERVICES
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black transition relative hover:text-black pb-1 flex items-center
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-black 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                      href="/contact"
                    >
                      <ContactRound className="mr-2" />
                      CONTACT US
                    </Link>
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
              <ul className="flex  flex-col items-center gap-2 mt-5 text-sm ">
                <li>
                  <Link
                    className="text-black transition relative hover:text-black pb-1 flex items-center
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-black 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                    href="/"
                  >
                    <HousePlus className="mr-2" />
                    HOME
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-black transition relative hover:text-black pb-1 flex items-center
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-black 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                    href="/about"
                  >
                    <BookOpenCheck className="mr-2 " />
                    ABOUT US
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-black transition relative hover:text-black pb-1 flex items-center
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-black 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                    href="/services"
                  >
                    <UserCog className="mr-2" />
                    SERVICES
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-black transition relative hover:text-black pb-1 flex items-center
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-black 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                    href="/contact"
                  >
                    <ContactRound className="mr-2" />
                    CONTACT US
                  </Link>
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
