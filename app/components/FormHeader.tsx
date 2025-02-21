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

const FormHeader = () => {
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
    <header className="bg-gradient-to-r from-indigo-500 to-blue-500 ">
      <div className="mx-auto max-w-screen-xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex h-30 lg:h-27 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <motion.div
              className="block text-teal-600  items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/tc" className="flex items-center">
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default FormHeader;
