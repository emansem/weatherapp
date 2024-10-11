import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { useContext } from "react";
import { FetchWeatherDataContextApi } from "../services/FetchWeatherData";
export default function HourlyForecast() {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,

    swipeToSlide: true,
    afterChange: function (index: number) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  const conext = useContext(FetchWeatherDataContextApi);
  if (!conext) return null;
  const { data, isError, isLoading } = conext;
  const hourlyForecastData =
    data?.forecast?.forecastday.flatMap((item: any) => item.hour) || [];
  const getTIime = (time: string) => {
    const timeString = new Date(time);
    return timeString.toLocaleTimeString("en-US", { timeStyle: "short" });
  };

  return (
    <div className="slider-container bg-[#202b3b] py-10 px-6 rounded-md">
      <p className="text-xl mb-5 text-stone-200 font-bold"> Hourly Forcast</p>
      <Slider {...settings}>
        {hourlyForecastData.map((item, index) => (
          <div key={index}>
            <div className="px-4 whitespace-nowrap">
              <div>
                <p className="text-2xl font-semibold text-stone-200 mb-3">
                  {getTIime(item.time)}
                </p>
                <div className="flex flex-col gap-2">
                  <li className="flex items-center gap-4">
                    <span className="text-[16px] text-stone-300 font-[500]">
                      Temp:
                    </span>
                    <span className="text-[16px] text-stone-500 font-[500]">
                      {item.temp_c}°C
                    </span>
                  </li>
                  <li>
                    <img className="h-14 " src={item.condition.icon} alt="" />
                    <span className="text-sx  pt-1 block text-stone-400 font-[500]">
                      {item.condition.text}
                    </span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="text-[16px] text-stone-300 font-[500]">
                      Wind:
                    </span>
                    <span className="text-[16px] text-stone-500 font-[500]">
                      {item.wind_kph}km/h
                    </span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="text-[16px] text-stone-300 font-[500]">
                      Hum:
                    </span>
                    <span className="text-[16px] text-stone-500 font-[500]">
                      {item.humidity}%
                    </span>
                  </li>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
