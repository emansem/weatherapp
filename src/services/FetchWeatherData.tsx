import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData } from "./fetchData";
import getUserLocation from "./getUserLocation";
// Location type
interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

// Condition type (used for current and forecast)
interface Condition {
  text: string;
  icon: string;
  code: number;
}

// Current weather type
interface CurrentWeather {
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

// Hourly forecast type
interface HourlyForecast {
  time: string;
  temp_c: number;
  temp_f: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  wind_mph: number;
  wind_kph: number;
  humidity: number;
}

// Updated ForecastDay type to include the hourly data
interface ForecastDay {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
  };
  hour: HourlyForecast[];
}

// Full forecast response type
interface Forecast {
  forecastday: ForecastDay[];
}

// Full API response type
export interface WeatherApiResponse {
  location: Location;
  current: CurrentWeather;
  forecast: Forecast;
}

interface FecthDataProps {
  isLoading: boolean;
  city: string;
  isError: boolean;
  handleCityInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleEnterKey: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  searchQuery: string;

  data: WeatherApiResponse | null;
}

export const FetchWeatherDataContextApi = createContext<FecthDataProps | null>(
  null
);

export default function FetchWeatherDataProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [city, setCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    async function fetchWeatherCity() {
      const defaultCity = await getUserLocation();

      setCity(defaultCity);
    }
    fetchWeatherCity();
  }, []);

  function handleCityInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  async function handleSearchClick() {
    if (searchQuery) {
      setCity(searchQuery);
    }
  }
  function handleEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (searchQuery) {
        setCity(searchQuery);
      }
    }
  }
  const { isLoading, data, isError } = useQuery({
    queryKey: ["weatherData", city],
    queryFn: async () => await fetchWeatherData(city)
  });

  return (
    <FetchWeatherDataContextApi.Provider
      value={{
        city,
        isLoading,
        data,
        isError,
        handleSearchClick,
        handleCityInput,
        searchQuery,
        handleEnterKey
      }}
    >
      {children}
    </FetchWeatherDataContextApi.Provider>
  );
}
