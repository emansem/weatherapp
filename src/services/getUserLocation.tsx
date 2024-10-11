const url = "http://ip-api.com/json/";

export default async function getUserLocation() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data.city;
  } catch (error) {
    console.error(error);
  }
}
