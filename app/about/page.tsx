"use client"
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import RemoteCTOWay from '../components/RemoteCTOWay';

const Page = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="relative">
      <button 
        onClick={handleGoBack} 
        className="absolute top-4 left-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2"
        aria-label="Go back"
      >
        <ArrowLeft size={24} className="text-gray-700" />
        <span>Go Back</span>
      </button>
      <RemoteCTOWay/>
    </div>
  );
}

export default Page;