"use client";
import React, { useRef } from "react";
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
  return (
    <div className="min-h-full">
      
      {/* <Navbar /> */}
      <BannerPage remoteCTOWayRef={remoteCTOWayRef} />
      <RemoteCTOWay ref={remoteCTOWayRef} />
      <WhatWeOffer />
      <FounderPage/>
      <Revolutionize />
      <WhatClientSay />
      <WhyRemoteCTO />
      <SuccessStories/>
      <FooterForm />

      <ScrollToTopButton />
    </div>
  );
}
