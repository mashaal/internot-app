import hydrate from "ultra/hydrate.js";
import React from "react";
import { useState } from "react";

export default function App({ battery, weather }) {
  console.log({ battery, weather });
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
          <div>Current charge: {battery?.charge?.data}%</div>
          <div>Location: Newcastle, NSW</div>
          <div>Temperature: {weather?.air_temp}°C</div>
          <div>Humidity: {weather?.rel_hum}%</div>
        </main>
      </body>
    </html>
  );
}

typeof document !== "undefined" && hydrate(document, <App />);
