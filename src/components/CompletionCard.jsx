import React, { useEffect, useState } from "react";

const CompletionCard = ({ percentage, loading, error }) => {
  const [progress, setProgress] = useState(0);
  const [tier, setTier] = useState({ name: "Tier 3", emoji: "🥉" });
  const circleLength = 226;
  const [tierMax, setTierMax] = useState(0);

  useEffect(() => {
    if (loading || error) return;

    let tierInfo = { name: "Tier 3", emoji: "🥉", relativeProgress: 0 };

    if (percentage >= 100) {
      tierInfo = { name: "Tier 1", emoji: "🥇", relativeProgress: 100 };
      setTierMax(100);
    } else if (percentage >= 70) {
      setTierMax(70);
      tierInfo = {
        name: "Tier 2",
        emoji: "🥈",
        relativeProgress: ((percentage - 70) / 30) * 100,
      };
    } else if (percentage >= 50) {
      setTierMax(50);
      tierInfo = {
        name: "Tier 3",
        emoji: "🥉",
        relativeProgress: ((percentage - 50) / 20) * 100,
      };
    } else {
      setTierMax(50);
      tierInfo = {
        name: "Tier 3",
        emoji: "🥉",
        relativeProgress: (percentage / 50) * 100,
      };
    }

    setTier({ name: tierInfo.name, emoji: tierInfo.emoji });

    // Animate progress
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progressValue = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progressValue, 3);
      const current = Math.round(eased * tierInfo.relativeProgress);
      setProgress(current);
      if (elapsed < duration) requestAnimationFrame(animate);
    };

    const timeout = setTimeout(() => requestAnimationFrame(animate), 200);
    return () => clearTimeout(timeout);
  }, [percentage, loading, error]);

  const offset = circleLength - (circleLength * progress) / 100;

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center w-full modern-card p-6 text-center animate-pulse">
        <div className="w-16 h-16 rounded-full bg-gray-200 mb-3"></div>
        <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 w-16 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center w-full modern-card p-6 text-center">
        <p className="text-red-500 font-medium text-sm">⚠️ Failed to load data</p>
        <p className="text-gray-500 text-xs mt-1">{error.message || "Something went wrong"}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full modern-card p-6 text-center floating-element">
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
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circleLength}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.2s ease-out" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="100%" stopColor="#764ba2" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-2xl font-semibold gradient-text">
          {progress}
        </span>
      </div>

      <div className="flex items-center justify-center gap-1 mt-2 text-gray-600 text-sm">
        <span>{tier.emoji}</span>
        <span>{tier.name}</span>
        <span className="ml-1 bg-gray-100 rounded-md px-2 py-[1px] text-xs font-medium">
          {percentage}/{tierMax}
        </span>
      </div>
    </div>
  );
};

export default CompletionCard;
