import sun from "../assets/sun.png";
import { WiStrongWind } from "react-icons/wi";

import { FaGaugeHigh } from "react-icons/fa6";
import { WiRaindrop } from "react-icons/wi";
import { useContext } from "react";
import { FetchWeatherDataContextApi } from "../services/FetchWeatherData";

export default function CurentWeather() {
  const conext = useContext(FetchWeatherDataContextApi);
  if (!conext) return null;
  const { isLoading, isError, data } = conext;
  if (isLoading) return `loading`;

  return (
    <div className="bg-[#202b3b] rounded-md px-8">
      <div className="flex flex-col py-5">
        <p className="text-stone-100 text-xl font-semibold mb-2 capitalize">
          Current Weather
        </p>
        <div className="">
          <span className="text-[18px] text-stone-400 pr-2 font-[500]">
            {data?.location?.name}
          </span>
          <span className="text-stone-300 font-[500]">
            {data?.location?.localtime}
          </span>
        </div>
      </div>
      <div className="flex items-center py-5 justify-center gap-24">
        <img
          className="h-28  bg-transparent backdrop-blur-sm"
          src={data?.current?.condition.icon}
          alt=""
        />
        <div className="">
          <div className="relative">
            <span className="text-[4rem] text-stone-100 font-bold">
              {data?.current?.temp_c}
            </span>

            <span className="absolute text-stone-50 top-8 left-26">°C</span>
          </div>
          <p className="text-xl text-stone-300 font-semibold ">
            {data?.current.condition?.text}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-between py-5">
        <li className="flex gap-4">
          <span className="text-3xl text-stone-400">
            <WiStrongWind />
          </span>
          <p className="flex flex-col">
            <span className="text-stone-400 text-xl font-[500]">Wind</span>
            <span className="text-stone-200 mt-1 font-semibold text-[14px]">
              {data?.current.wind_degree}Km/h
            </span>
          </p>
        </li>

        <li className="flex gap-4">
          <span className="text-3xl text-stone-400">
            <WiRaindrop />
          </span>
          <p className="flex flex-col">
            <span className="text-stone-400 text-xl font-[500]">Humidity</span>
            <span className="text-stone-200 mt-1 font-semibold text-[14px]">
              {data?.current.humidity}%
            </span>
          </p>
        </li>

        <li className="flex gap-4">
          <span className="text-3xl text-stone-400">
            <FaGaugeHigh />
          </span>
          <p className="flex flex-col">
            <span className="text-stone-400 text-xl font-[500]">Pressure</span>
            <span className="text-stone-200 mt-1 font-semibold text-[14px]">
              {data?.current.pressure_mb} mb
            </span>
          </p>
        </li>
      </div>
    </div>
  );
}
