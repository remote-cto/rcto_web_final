
import Navbar from "./components/Navbar";
import BannerPage from "./components/BannerPage";
import WhatWeOffer from "./components/WhatWeOffer";
import RemoteCTOWay from "./components/RemoteCTOWay";
import WhyRemoteCTO from "./components/WhyRemoteCTO";
import WhatClientSay from "./components/WhatClientSay";
import FooterForm from "./components/FooterForm";
import DeepTechResearch from "./components/DeepTechReserach";
import DataManagement from "./components/DataManagement";
import CyberSecurity from "./components/CyberSecurity";
import ManagedIT from "./components/ManagedIT";

export default function Home() {
  return (
   <div className="min-h-full">
   <Navbar/>
   <BannerPage/>
   <RemoteCTOWay/>
   <WhatWeOffer/>
   <WhyRemoteCTO/>
   <WhatClientSay/>
   <DeepTechResearch/>
   <DataManagement/>
   <CyberSecurity/>
   <ManagedIT/>
   <FooterForm/>
   
   
   </div>
  );
}
