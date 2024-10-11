export async function fetchWeatherData(city: string) {
  const apikey = `8ddc171d0fd74c5d9e9102311241110`;
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${city}&days=7`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
