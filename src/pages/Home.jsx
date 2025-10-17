import React from "react";
import TotalParticipantsCard from "../components/TotalParticipantsCard";
import CompletionCard from "../components/CompletionCard";
import AverageProgressCard from "../components/AverageProgressCard";
import ComingSoonPNG from "../assets/Coming-Soon.png";

// import CommingSoonPNG from '../assets/Comming-Soon.png'

const Home = () => {
  return (
    <div className="leaderboard-card shadow-soft rounded-lg">
      <div className="leaderboard-header">
        <h1 className="leaderboard-title">Google Cloud Study Jams 2025</h1>
        <p className="leaderboard-subtitle">Study Jams Statistics</p>
        <div className="accent-lines">
          <span style={{ backgroundColor: "#4285F4" }}></span>
          <span style={{ backgroundColor: "#EA4335" }}></span>
          <span style={{ backgroundColor: "#FBBC04" }}></span>
          <span style={{ backgroundColor: "#34A853" }}></span>
        </div>
      </div>
      <div className="bg-gray-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl mx-auto p-4 rounded-xl">
        <TotalParticipantsCard value={197} />
        <CompletionCard percentage={77} tier="Tier 1" />
        <AverageProgressCard value={17} />
      </div>

      {/* Swags Section */}
      <div className="swags-section mt-8 px-4 py-6 bg-white rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          🎁 Exciting Swags for Completing Milestones!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto font-sans"
        >
          {/* Tier 1 */}
          <div className="swag-card bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col items-center">
            <img
              src={ComingSoonPNG}
              alt="Tier 1 Swag"
              className="w-40 h-40 object-contain mb-4 rounded-2xl"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Tier 1</h3>
            <p className="text-gray-600 text-center text-sm">
              Top 100 Participants
            </p>
          </div>

          {/* Tier 2 */}
          <div className="swag-card bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col items-center">
            <img
              src={ComingSoonPNG}
              alt="Tier 2 Swag"
              className="w-40 h-40 object-contain mb-4 rounded-2xl"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Tier 2</h3>
            <p className="text-gray-600 text-center text-sm">
              Top 70 Participants
            </p>
          </div>

          {/* Tier 3 */}
          <div className="swag-card bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col items-center">
            <img
              src={ComingSoonPNG}
              alt="Tier 3 Swag"
              className="w-40 h-40 object-contain mb-4 rounded-2xl"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Tier 3</h3>
            <p className="text-gray-600 text-center text-sm">
              Top 50 Participants
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
