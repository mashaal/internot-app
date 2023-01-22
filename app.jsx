import hydrate from "ultra/hydrate.js";
import React from "react";
import { useState } from "react";

export default function App({ battery, weather, time }) {
  const title = "EWASTE";
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>e-waste</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/style.css" rel="stylesheet" />
      </head>
      <body>
        <main>
          <h1>
            {title.split("").map((x) => (
              <span>{x}</span>
            ))}
          </h1>
          {/* <img src="/bg.png" /> */}
          <div>
            <strong>Solar powered RPI Zero 2</strong>
          </div>
          <div>Current charge: {battery?.charge?.data}%</div>
          <div>
            {battery?.status?.data?.powerInput == "NOT_PRESENT"
              ? "Not charging"
              : `Charging: ${battery?.status?.data?.powerInput}`}
          </div>
          <div>Location: Newcastle, NSW</div>
          <div>Local time: {time}</div>
          <div>Temperature: {weather?.air_temp}°C</div>
          <div>Humidity: {weather?.rel_hum}%</div>
        </main>
      </body>
    </html>
  );
}

typeof document !== "undefined" && hydrate(document, <App />);
