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
  } = useParticipants(); // ✅ get data from Firebase
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    console.log("filtered Users");
    console.dir(filteredUsers);
  }, [filteredUsers]);

  // useEffect(() => {
  //   const filtered = participants.filter((user) =>
  //     user.name.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setFilteredUsers(filtered);

  //   if (onDataChange) onDataChange(filtered); // pass filtered data to parent
  // }, [searchQuery, participants, onDataChange]);

  // useEffect(() => {
  //   setLoading(true); // Start loading whenever effect runs (e.g., for refresh)
  //   setError(null); // Clear any previous errors

  //   fetch("http://localhost:3000/") // Adjusted URL for json-server
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! status: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log("Fetched data:", data);

  //       const mappedUsers = data.map((user) => {
  //         // Map the JSON structure to badgesCompleted boolean array
  //         const badgesCompletionStatus = allBadges.map((badgeTitle) => {
  //           const found = user.badges.find((b) => b.title === badgeTitle);
  //           return found?.completed || false; // true if found and completed, false otherwise
  //         });

  //         return {
  //           rank: user.rank,
  //           name: user.name,
  //           initials: user.name
  //             .split(" ")
  //             .map((n) => n[0])
  //             .join("")
  //             .toUpperCase()
  //             .substring(0, 2), // Generate initials
  //           // avatarColor: #${Math.floor(Math.random()*16777215).toString(16)}, // Random color for demo
  //           badgesCompleted: badgesCompletionStatus,
  //           completedCount: badgesCompletionStatus.filter(Boolean).length, // Count true values
  //           maxBadges: allBadges.length, // Total badges possible
  //         };
  //       });
  //       setParticipants
  // (mappedUsers);
  //       setFilteredUsers(mappedUsers);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error("❌ Error fetching leaderboard:", err);
  //       setError("Failed to load leaderboard data. Please try again.");
  //       setLoading(false);
  //     });
  // }, []); // Empty dependency array means this runs once on mount

  // Filter participants whenever searchQuery changes

  // useEffect(() => {
  //   const filtered = participants.filter((user) =>
  //     user.name.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setFilteredUsers(filtered);
  // }, [searchQuery, participants]);

  // ✅ Filter and sort participants by rank

  useEffect(() => {
    if (!participants || !Array.isArray(participants)) return;

    // Sort participants by rank always
    const sorted = [...participants].sort((a, b) => a.rank - b.rank);

    // Filter conditionally
    const filtered = sorted.filter((user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase() || "")
    );

    setFilteredUsers(filtered);

    // Build processed rows for parent (include badge completion flags and counts)
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
        <p>{error}</p>
        <button
          className="refresh-button"
          onClick={() => {
            setLoading(true);
            setError(null);
            // Re-run the effect by changing a state it depends on, or manually re-fetch
            // For simplicity, we'll just toggle a dummy state or make useEffect re-run
            // A better way is to wrap the fetch logic in a function and call it here.
            window.location.reload(); // Simple refresh for demo
          }}
        >
          <Refresh sx={{ marginRight: "0.5rem" }} /> Retry
        </button>
      </div>
    );
  }

  return (
    // <div className="leaderboard-wrapper">
    //   <table className="leaderboard-table">
    //     <thead>
    //       <tr>
    //         <th>Rank</th>
    //         <th>Name</th>
    //         <th>Badge Progress</th>
    //         {allBadges.map((badgeTitle, index) => (
    //           <th key={index} title={badgeTitle} className="badge-title">
    //             {badgeTitle}
    //           </th>
    //         ))}
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {participants.map((user, index) => (
    //         <tr
    //           key={user.name}
    //           className={index % 2 === 0 ? "even-row" : "odd-row"}
    //         >
    //           <td className="rank-cell">{getMedalIcon(user.rank)}</td>
    //           <td className="name-cell">
    //             <div className="flex-row items-center gap-2">{user.name}</div>
    //           </td>
    //           <td className="badge-progress-cell">
    //             <div className="flex-col gap-1">
    //               <span>
    //                 {user.completedCount} / {user.maxBadges}
    //               </span>
    //               <div className="progress-bar-wrapper">
    //                 <div
    //                   className="progress-bar"
    //                   style={{
    //                     width: `${
    //                       (user.completedCount / user.maxBadges) * 100
    //                     }%`,
    //                   }}
    //                 ></div>
    //               </div>
    //             </div>
    //           </td>
    //           {user.badgesCompleted.map((isCompleted, badgeIndex) => (
    //             <td key={badgeIndex} className="module-cell">
    //               {isCompleted ? (
    //                 <CheckCircle
    //                   sx={{ color: "var(--success-green)", fontSize: "1.2rem" }}
    //                 />
    //               ) : (
    //                 <RadioButtonUnchecked
    //                   sx={{ color: "var(--border-color)", fontSize: "1.2rem" }}
    //                 />
    //               )}
    //             </td>
    //           ))}
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    // <div className="leaderboard-wrapper">
    //   <table className="leaderboard-table">
    //     <thead>
    //       <tr>
    //         <th>Rank</th>
    //         <th>Name</th>
    //         <th>Badge Progress</th>
    //         {allBadges.map((badgeTitle, index) => (
    //           <th key={index} title={badgeTitle} className="badge-title">
    //             {badgeTitle}
    //           </th>
    //         ))}
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {filteredUsers.map((user, index) => (
    //         <tr
    //           key={user.name}
    //           className={index % 2 === 0 ? "even-row" : "odd-row"}
    //         >
    //           <td className="rank-cell">{getMedalIcon(user.rank)}</td>
    //           <td className="name-cell">{user.name}</td>
    //           <td className="badge-progress-cell">
    //             <div className="flex-col gap-1">
    //               <span>
    //                 {user.completedCount} / {allBadges.length}
    //               </span>
    //               <div className="progress-bar-wrapper">
    //                 <div
    //                   className="progress-bar"
    //                   style={{
    //                     width: `${
    //                       (user.completedCount / allBadges.length) * 100
    //                     }%`,
    //                   }}
    //                 ></div>
    //               </div>
    //             </div>
    //           </td>
    //           {user.badges.map((completed, badgeIndex) => (
    //             <td key={badgeIndex} className="module-cell">
    //               {completed ? (
    //                 <CheckCircle
    //                   sx={{ color: "var(--success-green)", fontSize: "1.2rem" }}
    //                 />
    //               ) : (
    //                 <RadioButtonUnchecked
    //                   sx={{ color: "var(--border-color)", fontSize: "1.2rem" }}
    //                 />
    //               )}
    //             </td>
    //           ))}
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>

    <div className="leaderboard-wrapper">
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Badge Progress</th>
            {allBadges.map((badgeTitle, index) => (
              <th key={index} title={badgeTitle} className="badge-title">
                {badgeTitle}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => {
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
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
