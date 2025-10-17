import React, { useEffect, useState } from "react";

const AverageProgressCard = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200; // total animation time in ms
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

  return (
    <div className="flex flex-col justify-center items-center w-full bg-white shadow-sm rounded-2xl p-6 text-center border border-gray-100 transition-all duration-300 hover:shadow-md">
      <p className="text-gray-800 text-sm font-medium">Average Progress</p>
      <h2 className="text-4xl font-semibold text-blue-500 mt-2">{count}</h2>
      <p className="text-gray-500 text-sm mt-1">badges / person</p>
    </div>
  );
};

export default AverageProgressCard;
