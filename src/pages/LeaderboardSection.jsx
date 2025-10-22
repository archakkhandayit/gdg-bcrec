// components/LeaderboardSection.jsx
import React, { useState } from "react";
import "./LeaderboardSection.css"; // Create this CSS file
import { Search, ArrowDropDown, FileDownload } from "@mui/icons-material"; // Example icons
import LeaderboardTable from "../components/LeaderboardTable";
import { RefreshCw } from "lucide-react"; // Changed FileDownload to FileDown

const allBadges = [
  "The Basics of Google Cloud Compute",
  "Get Started with Cloud Storage",
  "Get Started with Pub/Sub",
  "Get Started with API Gateway",
  "Get Started with Looker",
  "Get Started with Dataplex",
  "Get Started with Google Workspace Tools",
  "App Building with AppSheet",
  "Develop with Apps Script and AppSheet",
  "Develop Gen AI Apps with Gemini and Streamlit",
  "Build a Website on Google Cloud",
  "Set Up a Google Cloud Network",
  "Store Process and Manage Data on Google Cloud - Console",
  "Cloud Run Functions: 3 Ways",
  "App Engine: 3 Ways",
  "Cloud Speech API: 3 Ways",
  "Analyze Speech and Language with Google APIs",
  "Monitoring in Google Cloud",
  "Prompt Design in Vertex AI",
  "Level 3: Generative AI",
];

const ProgressUpdateBox = () => {
  // All time state and effects have been removed, resulting in a static component.

  return (
    // Compact, attractive status pill using a single flex row
    <div className="bg-green-500/10 p-3 px-4 rounded-full border border-green-300 flex items-center space-x-3 shadow-lg transition duration-300 transform hover:scale-[1.02] flex-shrink-0">
      {/* Spinning Refresh Icon */}
      <RefreshCw className="w-4 h-4 text-green-600 animate-spin-slow" />

      {/* Status Text */}
      <span className="text-sm font-semibold text-green-700 whitespace-nowrap">
        Progress Updates Hourly
      </span>

      {/* Glow indicator (subtle animation) */}
      <div className="w-2 h-2 bg-green-500 rounded-full animate-soft-pulse"></div>
    </div>
  );
};

const LeaderboardSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTableData, setCurrentTableData] = useState([]);

  const handleExportCSV = () => {
    if (!currentTableData || currentTableData.length === 0) {
      alert("No leaderboard data to export.");
      return;
    }

    const headers = [
      "Rank",
      "Name",
      "profile_url",
      "Completed Badges",
      ...allBadges,
    ];

    const rows = currentTableData.map((user) => {
      const badgeStatuses = allBadges.map((title) => {
        const found = user.badges.find((b) => b.title === title);
        return found?.completed ? "YES" : "NO";
      });
      return [
        user.rank ?? "",
        user.name ?? "",
        user.profile_url ?? "",
        user.completedCount ?? badgeStatuses.filter((s) => s === "YES").length,
        ...badgeStatuses,
      ];
    });

    const csvLines = [headers, ...rows].map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    );
    const csvString = csvLines.join("\r\n");

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leaderboard_full.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  return (
    <div className="leaderboard-card shadow-soft rounded-lg">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        {/* LEFT PART: Title & Accent Lines (from user's snippet) */}
        {/* PRIMARY HEADER WRAPPER: Stacks elements (flex-col) on small screens, and puts them side-by-side (lg:flex-row) on large screens. */}
            {/* PRIMARY HEADER WRAPPER: Stacks elements (flex-col) on small screens, and puts them side-by-side (lg:flex-row) on large screens. */}
            <div className="flex md:flex-col lg:flex-row lg:items-start lg:justify-between gap-4 relative">
              
              {/* FIRST DIV: Title and Subtitle - Centered on all screens and takes up full width */}
              <div className="leaderboard-header w-full text-center flex flex-col items-center justify-center -mb-3">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2 leading-tight leaderboard-title">
                  Google Cloud Study Jams 2025
                </h1>
                <p className="text-xl text-gray-600 font-light leaderboard-subtitle">
                  Track your progress in the Google Cloud Study Jams
                </p>
              </div>

              {/* SECOND DIV: Progress Update Box (Pill) - Positioned absolutely on large screens to float right, 
                  but remains responsive on small screens.
              */}
              <div className="w-full flex justify-center lg:absolute lg:top-0 lg:-right-72 lg:w-auto lg:justify-end mt-4 lg:mt-0">
                <ProgressUpdateBox />
              </div>
            </div>

        {/* Google Accent Lines */}
        <div className="accent-lines flex space-x-1 h-1">
          <span
            className="w-1/4 rounded-full"
            style={{ backgroundColor: "#4285F4" }}
          ></span>
          <span
            className="w-1/4 rounded-full"
            style={{ backgroundColor: "#EA4335" }}
          ></span>
          <span
            className="w-1/4 rounded-full"
            style={{ backgroundColor: "#FBBC04" }}
          ></span>
          <span
            className="w-1/4 rounded-full"
            style={{ backgroundColor: "#34A853" }}
          ></span>
        </div>
      </div>

      <div className="leaderboard-toolbar flex-row justify-between gap-4">
        <div className="search-input-wrapper flex-row items-center">
          <Search sx={{ color: "#5f6368" }} />
          <input
            type="text"
            placeholder="Search participants..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </div>
        <div className="flex-row gap-2">
          <button
            className="export-button flex-row items-center"
            disabled={!currentTableData || currentTableData.length === 0}
            onClick={handleExportCSV}
          >
            Export CSV <FileDownload />
          </button>
        </div>
      </div>

      <LeaderboardTable
        searchQuery={searchQuery}
        onDataChange={(data) => setCurrentTableData(data)}
      />
    </div>
  );
};

export default LeaderboardSection;
