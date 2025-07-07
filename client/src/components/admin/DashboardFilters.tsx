import { useState } from "react";

interface DashboardFiltersProps {
  onFilterChange: (filters: {
    timeRange: string;
    category?: string;
    status?: string;
  }) => void;
  categories: string[];
  statuses: string[];
}

export default function DashboardFilters({
  onFilterChange,
  categories,
  statuses,
}: DashboardFiltersProps) {
  const [timeRange, setTimeRange] = useState("7d");
  const [category, setCategory] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleFilterChange = (
    type: "timeRange" | "category" | "status",
    value: string,
  ) => {
    switch (type) {
      case "timeRange":
        setTimeRange(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "status":
        setStatus(value);
        break;
    }

    onFilterChange({
      timeRange,
      category: type === "category" ? value : category,
      status: type === "status" ? value : status,
    });
  };

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <select
        value={timeRange}
        onChange={(e) => handleFilterChange("timeRange", e.target.value)}
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
        <option value="90d">Last 90 days</option>
      </select>

      <select
        value={category}
        onChange={(e) => handleFilterChange("category", e.target.value)}
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>

      <select
        value={status}
        onChange={(e) => handleFilterChange("status", e.target.value)}
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="">All Statuses</option>
        {statuses.map((stat) => (
          <option key={stat} value={stat}>
            {stat.charAt(0).toUpperCase() + stat.slice(1)}
          </option>
        ))}
      </select>

      <button
        onClick={() => {
          setCategory("");
          setStatus("");
          handleFilterChange("category", "");
          handleFilterChange("status", "");
        }}
        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
      >
        Clear Filters
      </button>
    </div>
  );
}
