import { useContext } from "react";
import { FetchWeatherDataContextApi } from "../services/FetchWeatherData";
export default function DaysForCast() {
  const conext = useContext(FetchWeatherDataContextApi);
  if (!conext) return null;
  const { data, isError, isLoading } = conext;

  const date = (day: string) => {
    const date = new Date(day);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };
  return (
    <div className="bg-[#202b3b] rounded-md px-6 py-4">
      <p className="text-xl mb-5 text-stone-200 font-bold">7-DAY FORCAST</p>
      <div className="flex flex-col  justify-center gap-4">
        {data?.forecast.forecastday.map((item, index) => (
          <div key={index} className="grid grid-cols-4 ">
            <span className="text-[18px] text-stone-300 font-[500]">
              {date(item.date)}
            </span>
            <img className="h-10" src={item.day.condition.icon} alt="" />
            <span className="text-[16px] text-stone-400 font-[500]">
              {item.day.condition.text}
            </span>
            <span className="text-[16px] pl-2 text-stone-300 font-[500]">
              {item.day.avgtemp_c}°C
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
