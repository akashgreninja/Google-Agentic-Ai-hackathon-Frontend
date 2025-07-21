import React from "react";
import { Sidebar } from "../../components/sidebar";
import { Navbar } from "../../components/navbar";
import { Maps } from "../../components/maps";
import {GeminiSearchBar} from '../../components/aiSearchBar';
export const Dashboard = () => {
  return (
    <>
      <Navbar />

      {/* Top Hero Section */}
      <div className="w-screen bg-white flex flex-col items-center text-center relative overflow-hidden pt-[20vh] pb-[5vh]">

        {/* Background dots */}
        <span className="absolute top-[35%] left-[10%] w-3 h-3 bg-[#a7c0ff] rounded-full opacity-60"></span>
        <span className="absolute bottom-[25%] left-[5%] w-2 h-2 bg-[#a7c0ff] rounded-full opacity-60"></span>
        <span className="absolute bottom-[20%] right-[10%] w-4 h-4 bg-[#a7c0ff] rounded-full opacity-60"></span>

        {/* Main Content */}
        <h1 className="text-5xl font-medium text-gray-900">
          Hello <span className="text-[#3b82f6] font-semibold">Akash Uday</span>
        </h1>
        <p className="mt-4 text-gray-500 text-lg">
          Welcome to your Mis-3, Your personal agent
        </p>

<GeminiSearchBar />

      </div>
<div className="flex justify-center items-start w-full h-screen px-8 py-6 box-border gap-8">
  {/* Left: Sidebar */}
  <div className="w-1/2 max-w-[600px]">
    <Sidebar />
  </div>

  {/* Right: Map */}
  <div className="w-1/2 max-w-[600px] mt-10">
    <Maps />
  </div>
</div>


    </>
  );
};
