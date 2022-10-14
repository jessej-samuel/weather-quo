import Head from "next/head";
import brokenClouds from "../public/assets/broken-clouds.jpg";
import { useEffect } from "react";
import Weather from "../data/api/Weather";
import { useState } from "react";
import Map from "../data/IconMap";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ lat: 0, lon: 0 });
  const [isCelsius, setIsCelsius] = useState(true);
  const [data, setData] = useState(null);
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toTimeString().slice(0, 8));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
      // setLocation({ lat: 35, lon: 35 });
    });
    setLoading(false);
    console.log("Getting coordinates...");
  }, []);

  useEffect(() => {
    const getAndSet = () => {
      console.log("Fetching data...");
      Weather.get(`/current?lon=${location.lon}&lat=${location.lat}`).then(
        (res) => {
          setData(res.data);
          setLoading(false);
        }
      );
    };
    if (location.lat !== 0 && location.lon !== 0) {
      getAndSet();
    }
  }, [location]);

  return (
    <>
      {/* // <div className="max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl min-h-screen mx-auto"></div> */}
      {data && !loading ? (
        <div>
          <Head>
            <title>Weather Quo</title>
            <meta
              name="description"
              content="A simple weather app to get the current weather at your place."
            />
            {/* TODO: Update app icon */}
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main
            className="h-screen flex flex-col text-white py-8 px-4 bg-cover bg-center bg-no-repeat bg-blend-overlay bg-black bg-opacity-50 cursor-default"
            style={{
              backgroundImage: `url(${
                Map[data.weather[0].main.toLowerCase()]
                  ? Map[data.weather[0].main.toLowerCase()].img.src
                  : ""
              })`,
              backdropFilter: "revert",
            }}
          >
            {console.log(data)}
            <h1 className="font-light text-3xl h-16 w-fit">
              {data ? data.name : "Loading..."}
            </h1>
            <p
              className="text-7xl w-fit hover:text-neutral-300"
              onClick={() => setIsCelsius(!isCelsius)}
            >
              {data
                ? isCelsius
                  ? Math.round(data.main.temp)
                  : Math.round(data.main.temp * 1.8 + 32, -2)
                : ""}
              <sup className="w-fit">
                {data ? (isCelsius ? "°C" : "°F") : ""}
              </sup>
            </p>
            <p className="w-fit">
              {data ? `Lat ${location.lat} | Lon ${location.lon}` : ""}
            </p>
            <p className="w-fit">
              {data
                ? data.weather[0].main +
                  Map[data.weather[0].main.toLowerCase()].icon
                : ""}
            </p>
            <p className="self-end place-self-end hidden md:block text-6xl absolute font-medium">
              {/* TODO: Setup dynamic time greeting for morning, afternoon and evening*/}
              { greeting() }
            </p>
            <p className="place-self-end bottom-0 absolute font-mono">{time}</p>
          </main>
        </div>
      ) : (
        <div className="w-screen h-screen flex items-center justify-center">
          <button
            className="bg-blue-500 bg-opacity-75 hover:bg-blue-400 transition-all shadow-red-400 px-4 py-2 rounded-full animate-pulse hover:animate-none"
            onClick={() => setAskLocPerms(true)}
          >
            Grant permission to access your coordinates
          </button>
        </div>
      )}
    </>
  );
}
