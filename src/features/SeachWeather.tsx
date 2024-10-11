import { useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { FetchWeatherDataContextApi } from "../services/FetchWeatherData";

export default function SeachWeather() {
  const conext = useContext(FetchWeatherDataContextApi);
  if (!conext) return null;
  const { handleCityInput, searchQuery, handleSearchClick, handleEnterKey } =
    conext;
  return (
    <div className="flex w-full relative ">
      <span
        onClick={handleSearchClick}
        className="absolute top-3  text-stone-300 pr-3 pl-2 text-2xl cursor-pointer font-bold"
      >
        <CiSearch />
      </span>
      <input
        className="w-full bg-[#202b3b] outline-none text-stone-50 placeholder:text-stone-300 rounded-md py-3 px-10 text-[18px]"
        type="text"
        value={searchQuery}
        onChange={handleCityInput}
        onKeyDown={handleEnterKey}
        placeholder="Search City"
        autoComplete="true"
        spellCheck="false"
      />
    </div>
  );
}
