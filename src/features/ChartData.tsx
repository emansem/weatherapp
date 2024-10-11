import { useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { FetchWeatherDataContextApi } from "../services/FetchWeatherData";

export default function ChartData() {
  const conext = useContext(FetchWeatherDataContextApi);
  if (!conext) return null;
  const { isLoading, isError, data } = conext;
  if (isLoading) return `loading`;
  const forecast = data?.forecast.forecastday.map((item) => ({
    day: item.date,
    temperature: item.day.avgtemp_c
  }));
  return (
    <div className="bg-[#202b3b] rounded-md lg:p-4">
      <ResponsiveContainer width="100%" height={450}>
        <LineChart
          data={forecast}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis
            dataKey="day"
            tickFormatter={(str) =>
              new Date(str).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric"
              })
            }
          />
          <YAxis
            label={{
              value: "Temperature (°C)",
              angle: -90,
              position: "insideLeft"
            }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
