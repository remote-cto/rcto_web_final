"use client";
import React, { useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import BannerPage from "./components/BannerPage";
import WhatWeOffer from "./components/WhatWeOffer";
import RemoteCTOWay from "./components/RemoteCTOWay";
import WhyRemoteCTO from "./components/WhyRemoteCTO";
import WhatClientSay from "./components/WhatClientSay";
import FooterForm from "./components/FooterForm";
import Revolutionize from "./components/Revolutionize";
import ScrollToTopButton from "./components/ScrollToTopButton";
import SuccessStories from "./components/SucessStory";
import FounderPage from "./components/FounderPage";

export default function Home() {
  const remoteCTOWayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const elem = document.getElementById(id);
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
  }, []);

  return (
    <div className="min-h-full">
      <Navbar />
      <section id="home">
        <BannerPage remoteCTOWayRef={remoteCTOWayRef} />
      </section>
      <section id="about">
        <RemoteCTOWay ref={remoteCTOWayRef} />
      </section>
      <section id="services">
        <WhatWeOffer />
      </section>
      <FounderPage />
      <Revolutionize />
      <WhatClientSay />
      <WhyRemoteCTO />
      <SuccessStories />
      <section id="contact">
        <FooterForm />
      </section>

      <ScrollToTopButton />
    </div>
  );
}
