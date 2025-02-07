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
    <div className="min-h-screen flex flex-col">
      <div className='bg-gradient-to-r from-indigo-500 to-blue-500 flex-1'>
        <CoolMode>
          <div className="p-4">
            <button 
              onClick={handleGoBack} 
              className="inline-flex items-center gap-2 p-2 text-white rounded-full transition-colors hover:bg-white/10"
              aria-label="Go back"
            >
              <ArrowLeft size={24} className="text-white" />
              <span>Go Back</span>
            </button>
          </div>
        </CoolMode>
      </div>
      <FooterForm />
    </div>
  );
}

export default Page;