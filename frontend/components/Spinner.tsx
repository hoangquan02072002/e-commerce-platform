import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="relative w-12 h-12">
        {/* Outer ring */}
        <div className="absolute w-full h-full rounded-full border-4 border-gray-200"></div>

        {/* Animated ring */}
        <div className="absolute w-full h-full rounded-full border-4 animate-spin border-t-green-500 border-r-green-500 border-b-transparent border-l-transparent"></div>

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
};

export default Spinner;
