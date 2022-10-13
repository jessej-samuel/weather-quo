import brokenClouds from "../public/assets/broken-clouds.jpg";
import rain from "../public/assets/rain.gif"; // https://medium.com/retronator-magazine/down-the-color-wheel-with-merrigo-226ad1be0623
import clearSky from "../public/assets/clear-sky.jpg";
import thunderstorm from "../public/assets/thunderstorm.gif";

const Map = {
  clouds: {img: brokenClouds, icon: "☁️"},
  rain: {img: rain,icon: "🌧️"},
  thunderstorm: {img: thunderstorm, icon: "⛈️"},
  clear: {img: clearSky, icon: "☀️"},
  snow: {img: rain, icon: "❄️"},
  mist: {img: rain, icon: "🌫️"},
  haze: {img: rain, icon: "🌫️"},
  drizzle: {img: rain, icon: "🌧️"},
  fog: {img: rain, icon: "🌫️"},
};

export default Map;
