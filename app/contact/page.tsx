"use client"
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import FooterForm from '../components/FooterForm';
import { CoolMode } from "../../components/ui/cool-mode";


const Page = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
    <div className='bg-gradient-to-r from-indigo-500 to-blue-500'>
      <CoolMode>
      <button 
        onClick={handleGoBack} 
        className=" top-4 left-4 z-10 p-2 text-white rounded-full transition-colors flex items-center gap-2"
        aria-label="Go back"
      >
        <ArrowLeft size={24} className="text-white" />
        <span>Go Back</span>
      </button>
      </CoolMode>
      
    </div>
    <FooterForm/>
    </>
  );
}

export default Page;