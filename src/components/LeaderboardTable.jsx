// components/LeaderboardTable.jsx
import React, { useState, useEffect } from "react";
import "./LeaderboardTable.css";
import {
  CheckCircle,
  RadioButtonUnchecked,
  Refresh,
  ErrorOutline,
} from "@mui/icons-material";
import { useParticipants } from "../hooks/useParticipants.js";

// Define all possible badge titles (modules)
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
  "Store, Process, and Manage Data on Google Cloud - Console",
  "Cloud Run Functions: 3 Ways",
  "App Engine: 3 Ways",
  "Cloud Speech API: 3 Ways",
  "Analyze Speech and Language with Google APIs",
  "Monitoring in Google Cloud",
  "Prompt Design in Vertex AI",
  "Level 3: Generative AI",
];

const LeaderboardTable = ({ searchQuery, onDataChange }) => {
  const {
    participants,
    setParticipants,
    loading,
    setLoading,
    error,
    setError,
  } = useParticipants();
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (!participants || !Array.isArray(participants)) return;

    const sorted = [...participants].sort((a, b) => a.rank - b.rank);

    const filtered = sorted.filter((user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase() || "")
    );

    setFilteredUsers(filtered);

    if (onDataChange) {
      const processed = filtered.map((user) => {
        const badgesCompletionStatus = allBadges.map((badgeTitle) => {
          const found = user.badges?.find((b) => b.title === badgeTitle);
          return { title: badgeTitle, completed: !!found?.completed };
        });
        const completedCount = badgesCompletionStatus.filter(
          (b) => b.completed
        ).length;
        return {
          rank: user.rank,
          name: user.name,
          profile_url: user.profile_url,
          badges: badgesCompletionStatus,
          completedCount,
        };
      });
      onDataChange(processed);
    }
  }, [participants, searchQuery, allBadges, onDataChange]);

  const getMedalIcon = (rank) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return rank;
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Loading leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <ErrorOutline sx={{ fontSize: "2rem", color: "#EA4335" }} />
        <p>{"Unable to load the Leaderboard"}</p>
        <button
          className="refresh-button"
          onClick={() => {
            setLoading(true);
            setError(null);
            window.location.reload();
          }}
        >
          <Refresh sx={{ marginRight: "0.5rem" }} /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="leaderboard-wrapper">
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th>Badge Progress</th>
            {allBadges.map((badgeTitle, index) => (
              <th key={index} title={badgeTitle} className="badge-title">
                {badgeTitle}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => {
              const badgesCompletionStatus = allBadges.map((badgeTitle) => {
                const found = user.badges.find((b) => b.title === badgeTitle);
                return found?.completed || false;
              });
              const completedCount =
                badgesCompletionStatus.filter(Boolean).length;

              return (
                <tr
                  key={`${user.name}-${index}`}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  <td className="rank-cell">{getMedalIcon(user.rank)}</td>
                  <td
                    className="name-cell cursor-pointer hover:underline"
                    onClick={() => window.open(user.profile_url, "_blank")}
                    title={user.name}
                  >
                    {user.name}
                  </td>
                  <td className="badge-progress-cell">
                    <div className="flex-col gap-1">
                      <span>
                        {completedCount} / {allBadges.length}
                      </span>
                      <div className="progress-bar-wrapper">
                        <div
                          className="progress-bar"
                          style={{
                            width: `${
                              (completedCount / allBadges.length) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  {badgesCompletionStatus.map((isCompleted, badgeIndex) => (
                    <td key={badgeIndex} className="module-cell">
                      {isCompleted ? (
                        <CheckCircle
                          sx={{
                            color: "var(--success-green)",
                            fontSize: "1.2rem",
                          }}
                        />
                      ) : (
                        <RadioButtonUnchecked
                          sx={{
                            color: "var(--border-color)",
                            fontSize: "1.2rem",
                          }}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
