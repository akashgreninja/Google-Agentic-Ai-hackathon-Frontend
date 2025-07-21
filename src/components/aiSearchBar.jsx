import React from "react";

export const GeminiSearchBar = () => {
  return (
    <div className="mt-8 w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-3 bg-[#f9f9fb] border border-[#e0e0e0] rounded-full px-5 py-3 shadow-md transition-all focus-within:ring-2 focus-within:ring-blue-500 hover:shadow-lg">

        {/* Left: Search Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 6.65a7.5 7.5 0 010 10.6z" />
        </svg>

        {/* Input */}
        <input
          type="text"
          placeholder="Ask me anything..."
          className="flex-1 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
        />

        {/* Right: Mic Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500 cursor-pointer hover:text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v2m4-2a4 4 0 01-8 0m8-6v2a4 4 0 01-8 0v-2m4-4v4" />
        </svg>
      </div>
    </div>
  );
};


