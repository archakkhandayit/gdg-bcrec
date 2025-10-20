import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const LabCompletionChart = ({ perLabStats, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-200 bg-gray-50 rounded-lg shadow-sm">
        <p className="text-gray-500 animate-pulse">Loading Badge completions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-40 bg-red-50 rounded-lg shadow-sm">
        <p className="text-red-600 font-medium">Failed to load data</p>
      </div>
    );
  }

  if (!perLabStats || Object.keys(perLabStats).length === 0) {
    return (
      <div className="flex justify-center items-center h-40 bg-gray-50 rounded-lg shadow-sm">
        <p className="text-gray-500">No lab completion data available</p>
      </div>
    );
  }

  // Convert Firestore map to array for Recharts
  const data = Object.entries(perLabStats).map(([labName, completions]) => ({
    name: labName,
    Count: completions || 0,
  }));

  // Optional: sort descending
  data.sort((a, b) => b.completions - a.completions);

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 text-center">
        Badge Completion Overview
      </h2>

      {/* Scrollable chart container */}
      <div className="max-h-[800px] overflow-y-auto pr-2">
        <ResponsiveContainer width="100%" height={data.length * 40}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 10, right: 30, left: 120, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 12 }}
              width={220}
            />
            <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
            <Bar
              dataKey="Count"
              fill="#4285F4"
              radius={[6, 6, 6, 6]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
//   <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
//     <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
//       Google Cloud Labs Progress
//     </h2>

//     <table className="w-full border border-gray-300 rounded-lg">
//       <thead className="bg-gray-100">
//         <tr>
//           <th className="text-left py-2 px-3 border-b">#</th>
//           <th className="text-left py-2 px-3 border-b">Lab Name</th>
//           <th className="text-left py-2 px-3 border-b">Completion</th>
//         </tr>
//       </thead>
//       <tbody>
//         {labs.map((lab, index) => (
//           <tr
//             key={index}
//             className="hover:bg-gray-50 transition-colors duration-200"
//           >
//             <td className="py-2 px-3 border-b">{index + 1}</td>
//             <td className="py-2 px-3 border-b">{lab.name}</td>
//             <td className="py-2 px-3 border-b">
//               {lab.completed ? (
//                 <span className="text-green-600 font-medium">Completed ✅</span>
//               ) : (
//                 <span className="text-red-600 font-medium">Pending ❌</span>
//               )}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>

  );
};

export default LabCompletionChart;
