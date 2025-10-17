import React, { useEffect, useState } from "react";

const CompletionCard = ({ percentage, tier }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // total animation time (ms)
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progressValue = Math.min(elapsed / duration, 1); // ease progress (0 to 1)
      const eased = 1 - Math.pow(1 - progressValue, 3); // easeOutCubic for smooth motion
      const current = Math.round(eased * percentage);
      setProgress(current);

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      }
    };

    // delay start slightly to prevent first-frame glitch
    const timeout = setTimeout(() => requestAnimationFrame(animate), 200);

    return () => clearTimeout(timeout);
  }, [percentage]);

  const circleLength = 226;
  const offset = circleLength - (circleLength * progress) / 100;

  return (
    <div className="flex flex-col justify-center items-center w-full bg-white shadow-sm rounded-2xl p-6 text-center border border-gray-100 transition-all duration-300 hover:shadow-md">
      <p className="text-gray-700 text-sm font-medium">Completion %</p>

      <div className="relative mt-3">
        <svg className="w-20 h-20 transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="#3B82F6"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circleLength}
            strokeDashoffset={offset}
            style={{
              transition: "stroke-dashoffset 0.2s ease-out",
            }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-2xl font-semibold text-blue-500">
          {progress}
        </span>
      </div>

      <div className="flex items-center justify-center gap-1 mt-2 text-gray-600 text-sm">
        <span className="text-yellow-500">🥇</span>
        <span>{tier}</span>
        <span className="ml-1 bg-gray-100 rounded-md px-2 py-[1px] text-xs font-medium">
          {progress}/100
        </span>
      </div>
    </div>
  );
};

export default CompletionCard;
