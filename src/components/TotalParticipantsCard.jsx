import React, { useEffect, useState } from "react";

const TotalParticipantsCard = ({ value, loading, error }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 15;
    const steps = duration / stepTime;
    const increment = value / steps;

    const interval = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(interval);
      }
      setCount(Math.round(start));
    }, stepTime);

    return () => clearInterval(interval);
  }, [value]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center w-full bg-white shadow-sm rounded-2xl p-6 text-center border border-gray-100 animate-pulse">
        <div className="w-16 h-16 rounded-full bg-gray-200 mb-3"></div>
        <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 w-16 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center w-full bg-white shadow-sm rounded-2xl p-6 text-center border border-gray-100">
        <p className="text-red-500 font-medium text-sm">⚠️ Failed to load data</p>
        <p className="text-gray-500 text-xs mt-1">{error.message || "Something went wrong"}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full bg-white shadow-sm rounded-2xl p-6 text-center border border-gray-100 transition-all duration-300 hover:shadow-md">
      <p className="text-gray-700 text-sm font-medium">Total Participants</p>
      <h2 className="text-4xl font-semibold text-blue-500 mt-2">{count}</h2>
    </div>
  );
};

export default TotalParticipantsCard;
