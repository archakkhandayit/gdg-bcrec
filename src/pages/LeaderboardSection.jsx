// components/LeaderboardSection.jsx
import React, { useState } from "react";
import "./LeaderboardSection.css"; // Create this CSS file
import { Search, ArrowDropDown, FileDownload } from "@mui/icons-material"; // Example icons
import LeaderboardTable from "../components/LeaderboardTable";

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
  "Level 3: Generative AI"
];

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
      "Max Badges",
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
      <div className="leaderboard-header">
        <h1 className="leaderboard-title">Google Cloud Study Jams 2025</h1>
        <p className="leaderboard-subtitle">
          Track your progress in the Google Cloud Study Jams
        </p>
        <div className="accent-lines">
          <span style={{ backgroundColor: "#4285F4" }}></span>
          <span style={{ backgroundColor: "#EA4335" }}></span>
          <span style={{ backgroundColor: "#FBBC04" }}></span>
          <span style={{ backgroundColor: "#34A853" }}></span>
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
              console.log(searchQuery);
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

      <LeaderboardTable searchQuery={searchQuery} onDataChange={(data) => setCurrentTableData(data)} />
    </div>
  );
};

export default LeaderboardSection;