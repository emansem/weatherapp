export default function GetuserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionHandler);
  }
  function positionHandler(position: GeolocationPosition): void {
    console.log("lab", position.coords.latitude);
    console.log("long", position.coords.longitude);
  }

  return <div>GetuserLocation</div>;
}
