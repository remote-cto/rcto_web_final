import Navbar from "./components/Navbar";
import BannerPage from "./components/BannerPage";
import WhatWeOffer from "./components/WhatWeOffer";
import RemoteCTOWay from "./components/RemoteCTOWay";
import WhyRemoteCTO from "./components/WhyRemoteCTO";
import WhatClientSay from "./components/WhatClientSay";
import FooterForm from "./components/FooterForm";
import Revolutionize from "./components/Revolutionize";
import ScrollToTopButton from "./components/ScrollToTopButton"; // Add this import

export default function Home() {
  return (
    <div className="min-h-full">
      {/* <Navbar /> */}
      <BannerPage />
      <RemoteCTOWay />
      <WhatWeOffer />
      <Revolutionize />
      <WhatClientSay />
      <WhyRemoteCTO />
      <FooterForm />
      
      <ScrollToTopButton /> {/* Add this line */}
    </div>
  );
}