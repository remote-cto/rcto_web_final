"use client";
import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { CoolMode } from "@/components/ui/cool-mode";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <CoolMode>
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 bg-black text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 ease-in-out"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </button>
        </CoolMode>
      )}
    </>
  );
};

export default ScrollToTopButton;
