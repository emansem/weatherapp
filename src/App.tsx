import ChartData from "./features/ChartData";
import CurentWeather from "./features/CurentWeather";
import DaysForCast from "./features/DaysForCast";
import HourlyForecast from "./features/HoursFocast";
import SeachWeather from "./features/SeachWeather";
import FetchWeatherDataProvider, {
  FetchWeatherDataContextApi
} from "./services/FetchWeatherData";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import spin from "./assets/spin.gif";
import { useContext } from "react";

function AppContents() {
  return (
    <div className="max-w-7xl px-4 lg:px-0 mx-auto flex  items-start gap-10 flex-col lg:flex-row py-10">
      <div className=" w-full lg:flex-1  py-4 flex flex-col gap-6">
        <div className="">
          <SeachWeather />
        </div>
        <div>
          <CurentWeather />
        </div>
        <div>
          <DaysForCast />
        </div>
      </div>
      <div className="w-full lg:w-[60%] flex flex-col gap-6 lg:mt-8">
        <div>
          <HourlyForecast />
        </div>
        <div>
          <ChartData />
        </div>
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div className="max-w-7xl px-4 lg:px-0 mx-auto h-screen flex justify-center items-center">
      <img src={spin} alt="" />
    </div>
  );
}

function LoadingAndAppData() {
  const conext = useContext(FetchWeatherDataContextApi);
  if (!conext) return null;
  const { isLoading, isError } = conext;
  return <>{isLoading ? <Loader /> : <AppContents />}</>;
}

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="bg-[#0b131e] min-h-screen w-full">
      <QueryClientProvider client={queryClient}>
        <FetchWeatherDataProvider>
          <LoadingAndAppData />
        </FetchWeatherDataProvider>
        {/* <ReactQueryDevtools  initialIsOpen='false'/> */}
      </QueryClientProvider>
    </div>
  );
}

export default App;
