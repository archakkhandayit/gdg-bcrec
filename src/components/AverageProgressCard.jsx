import React, { useEffect, useState } from "react";

const AverageProgressCard = ({ TotalParticipants, perLabStats, loading, error }) => {
  const [count, setCount] = useState(0);
  const [lessThan, setLessThan] = useState(false);

  useEffect(() => {
    // Calculate total sum of all lab stats
    const totalProgress = Object.values(perLabStats).reduce(
      (sum, val) => sum + val,
      0
    );
    
    if((totalProgress / TotalParticipants)<0){
      setLessThan(true);
    } else{
      setLessThan(false)
    }

    // Calculate average per participant
    const avgPerParticipant = totalProgress / TotalParticipants;

    let start = 0;
    const duration = 1200;
    const stepTime = 15;
    const steps = duration / stepTime;
    const increment = avgPerParticipant / steps;

    const interval = setInterval(() => {
      start += increment;
      if (start >= avgPerParticipant) {
        start = avgPerParticipant;
        clearInterval(interval);
      }
      setCount(Math.round(start));
    }, stepTime);
    return () => clearInterval(interval);
  }, [perLabStats, TotalParticipants]);

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
        <p className="text-red-500 font-medium text-sm">
          ⚠️ Failed to load data
        </p>
        <p className="text-gray-500 text-xs mt-1">
          {error.message || "Something went wrong"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full bg-white shadow-sm rounded-2xl p-6 text-center border border-gray-100 transition-all duration-300 hover:shadow-md">
      <p className="text-gray-800 text-sm font-medium">Average Progress</p>
      <h2 className="text-4xl font-semibold text-blue-500 mt-2">{lessThan===true?"":"<"} {count}</h2>
      <p className="text-gray-500 text-sm mt-1">badges / person</p>
    </div>
  );
};

export default AverageProgressCard;
