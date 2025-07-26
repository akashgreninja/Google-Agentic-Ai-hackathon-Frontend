import React from 'react';
import { Sidebar } from '../../components/sidebar';
import { Maps } from '../../components/maps';
import { GeminiSearchBar } from '../../components/aiSearchBar';
import { useEffect, useState } from 'react';
import { useApi } from '../../helpers/api';

export const Dashboard = () => {
  const { data, callApi } = useApi();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // const lat = position.coords.latitude;
        // const lng = position.coords.longitude;
        // {'lat': 12.9121, 'lng': 77.6446}
        callApi({
          // url: `data/get_relevant_incidents?lat=${lat}&lng=${lng}&radius_km=105&user_id=john.doe@example.com`,
          url: `data/get_relevant_incidents?lat=${12.9121}&lng=${77.6446}&radius_km=5000&user_id=john.doe@example.com`,
        });
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, []);
  return (
    <>
      {/* Top Hero Section */}
      <div
        className="w-screen bg-white flex flex-col items-center text-center relative overflow-hidden pt-[20vh] pb-[5vh]"
        style={{ marginBottom: '5rem' }}
      >
        {/* Background dots */}
        <span className="absolute top-[35%] left-[10%] w-3 h-3 bg-[#a7c0ff] rounded-full opacity-60"></span>
        <span className="absolute bottom-[25%] left-[5%] w-2 h-2 bg-[#a7c0ff] rounded-full opacity-60"></span>
        <span className="absolute bottom-[20%] right-[10%] w-4 h-4 bg-[#a7c0ff] rounded-full opacity-60"></span>

        {/* Main Content */}
        <h1 className="text-5xl font-medium text-gray-900">
          Hello <span className="text-[#3b82f6] font-semibold">Akash Uday</span>
        </h1>
        <p className="mt-4 text-gray-500 text-lg" style={{ fontFamily: 'sans-serif' }}>
          Welcome to Mis-3, Your Personal AI Agent
        </p>

        <GeminiSearchBar />
      </div>
      <div className="flex justify-center items-start w-full h-screen px-8 py-6 box-border gap-8">
        {/* Left: Sidebar */}
        <div className="w-1/2 max-w-[600px]" style={{ overflowY: 'scroll', height: '100%' }}>
          <Sidebar data={data} />
        </div>

        {/* Right: Map */}
        <div className="w-1/2 max-w-[600px] mt-10">
          <Maps data={data} />
        </div>
      </div>
    </>
  );
};
