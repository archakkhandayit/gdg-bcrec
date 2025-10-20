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

  const data = Object.entries(perLabStats).map(([labName, completions]) => ({
    name: labName,
    Count: completions || 0,
  }));

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

  );
};

export default LabCompletionChart;
