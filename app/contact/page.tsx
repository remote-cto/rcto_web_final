"use client";
import React from "react";
import { useState } from "react";
import FooterForm from "../components/FooterForm";
import { CoolMode } from "../../components/ui/cool-mode";
import { FcAbout } from "react-icons/fc";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { GrWorkshop } from "react-icons/gr";
import { IoHome } from "react-icons/io5";

const Page = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuIconCross, setIsMobileMenuIconCross] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMobileMenuIconCross(!isMobileMenuIconCross);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gradient-to-r from-indigo-500 to-blue-500 flex-1">
        <header className="bg-gradient-to-r from-indigo-500 to-blue-500 ">
          <div className="mx-auto max-w-screen-xl px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex h-30 lg:h-27 items-center justify-between">
              <div className="flex-1 md:flex md:items-center md:gap-12">
                <CoolMode>
                  <motion.div
                    className="block text-teal-600  items-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link href="/" className="flex items-center">
                      <Image
                        src="/images/RCTO.png"
                        width={60}
                        height={60}
                        alt="logo image"
                        className="mr-2"
                      />
                      <span className="font-bold text-[#eef0f4]  text-xl lg:text-4xl font-montserrat">
                        REMOTE CTO
                      </span>
                    </Link>
                  </motion.div>
                </CoolMode>
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
                        className="text-white transition relative hover:text-[#e8eaf0] pb-1 flex items-center
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-[#cfd1d4] 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                        href="/"
                      >
                        <IoHome className="mr-2" />
                        HOME
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="text-white transition relative hover:text-[#e8eaf0] pb-1 flex items-center
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-[#cfd1d4] 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                        href="/about"
                      >
                        <FcAbout className="mr-2 " />
                        ABOUT US
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-white transition relative hover:text-[#e8eaf0] pb-1 flex items-center
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-[#cfd1d4] 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                        href="/services"
                      >
                        <GrWorkshop className="mr-2" />
                        SERVICES
                      </Link>
                    </li>
                    {/* <li>
                      <Link
                        className="text-white transition relative hover:text-[#e8eaf0] pb-1 flex items-center
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-[#cfd1d4] 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                        href="/contact"
                      >
                        <RiContactsBookFill className="mr-2" />
                        CONTACT US
                      </Link>
                    </li> */}
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
                        <div className="w-3 h-0.5 bg-white"></div>
                        <div className="w-5 h-0.5 bg-white"></div>
                        <div className="w-7 h-0.5 bg-white"></div>
                      </div>
                      <div
                        className={`w-7 h-0.5 bg-white transform -rotate-45 transition-transform duration-300 ${
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
                      className="text-white transition relative hover:text-[#e8eaf0] pb-1 flex items-center
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-[#cfd1d4] 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                      href="/"
                    >
                      <IoHome className="mr-2" />
                      HOME
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white transition relative hover:text-[#e8eaf0] pb-1 flex items-center
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-[#cfd1d4] 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                      href="/about"
                    >
                      <FcAbout className="mr-2 " />
                      ABOUT US
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white transition relative hover:text-[#e8eaf0] pb-1 flex items-center
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-[#cfd1d4] 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                      href="/services"
                    >
                      <GrWorkshop className="mr-2" />
                      SERVICES
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      className="text-white transition relative hover:text-[#e8eaf0] pb-1 flex items-center
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-[#cfd1d4] 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                      href="/contact"
                    >
                      <RiContactsBookFill className="mr-2" />
                      CONTACT US
                    </Link>
                  </li> */}
                </ul>
              </motion.nav>
            )}
          </div>
        </header>
      </div>
      <FooterForm />
    </div>
  );
};

export default Page;
