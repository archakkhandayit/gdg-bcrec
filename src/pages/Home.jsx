import React from "react";
import TotalParticipantsCard from "../components/TotalParticipantsCard";
import CompletionCard from "../components/CompletionCard";
import AverageProgressCard from "../components/AverageProgressCard";
import ComingSoonPNG from "../assets/Coming-Soon.png";
import LabCompletionChart from "../components/LabCompletionChart";

import { useStatsData } from "../hooks/useStatsData.js";

const Home = () => {
  const { totalFullCompletions, perLabStats, loading, error } = useStatsData();
  const TotalParticipants = 190;
  return (
    <div className="leaderboard-card modern-card shadow-soft rounded-lg">
      <div className="leaderboard-header">
        <h1 className="leaderboard-title">Google Cloud Study Jams 2025</h1>
        <p className="leaderboard-subtitle font-bold">Study Jams Statistics</p>

        <a
          href="https://docs.google.com/spreadsheets/d/1PVmcsHCtKLmNOjBN8qG-H3eaZ7y3El5bbJzS4hLgLBM/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="-mt-3 inline-flex items-center gap-2 text-blue-600 font-medium text-sm px-3 py-1.5 border border-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
        >
          📘 View Syllabus
        </a>

        <div className="accent-lines">
          <span style={{ backgroundColor: "#4285F4" }}></span>
          <span style={{ backgroundColor: "#EA4335" }}></span>
          <span style={{ backgroundColor: "#FBBC04" }}></span>
          <span style={{ backgroundColor: "#34A853" }}></span>
        </div>
      </div>
      <div className="bg-gray-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl mx-auto p-4 rounded-xl">
        <TotalParticipantsCard
          value={TotalParticipants}
          loading={loading}
          error={error}
        />
        <CompletionCard
          percentage={totalFullCompletions}
          loading={loading}
          error={error}
        />
        <AverageProgressCard
          TotalParticipants={TotalParticipants}
          value={17}
          perLabStats={perLabStats}
          loading={loading}
          error={error}
        />
      </div>

      {/* Swags Section */}
      <div className="swags-section mt-8 px-4 py-6 modern-card rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          🎁 Exciting Swags for Completing Milestones!
        </h2>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="swag-card animate-pulse bg-gray-100 rounded-xl p-4 flex flex-col items-center"
              >
                <div className="w-40 h-40 bg-gray-200 rounded-2xl mb-4" />
                <div className="h-6 w-24 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-32 bg-gray-200 rounded text-center" />
              </div>
            ))}
          </div>
        ) : error ? (
          // Error State
          <div className="flex justify-center items-center h-40">
            <p className="text-red-500 font-medium">
              ⚠️ Failed to load swag information.
            </p>
          </div>
        ) : (
          // Normal Content
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto font-sans">
            {/* Tier 1 */}
            <div className="swag-card modern-card rounded-xl shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col items-center floating-element">
              <img
                src={ComingSoonPNG}
                alt="Tier 1 Swag"
                className="w-40 h-40 object-contain mb-4 rounded-2xl"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Tier 1
              </h3>
              <p className="text-gray-600 text-center text-sm">
                Top 100 Participants
              </p>
            </div>

            {/* Tier 2 */}
            <div className="swag-card modern-card rounded-xl shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col items-center floating-element">
              <img
                src={ComingSoonPNG}
                alt="Tier 2 Swag"
                className="w-40 h-40 object-contain mb-4 rounded-2xl"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Tier 2
              </h3>
              <p className="text-gray-600 text-center text-sm">
                Top 70 Participants
              </p>
            </div>

            {/* Tier 3 */}
            <div className="swag-card modern-card rounded-xl shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col items-center floating-element">
              <img
                src={ComingSoonPNG}
                alt="Tier 3 Swag"
                className="w-40 h-40 object-contain mb-4 rounded-2xl"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Tier 3
              </h3>
              <p className="text-gray-600 text-center text-sm">
                Top 50 Participants
              </p>
            </div>
          </div>
        )}
      </div>

      {/* New chart section */}
      <div className="mt-8 px-4 hidden sm:block">
        <LabCompletionChart
          perLabStats={perLabStats}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default Home;
