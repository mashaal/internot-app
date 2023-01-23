import hydrate from "ultra/hydrate.js";
import React from "react";
import { useState } from "react";

export default function App({ battery, weather, time, bom }) {
  const title = "EWASTE";
  const charge = battery?.charge?.data || 0;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>e-waste</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/style.css" rel="stylesheet" />
      </head>
      <body>
        <h1>
          {title.split("").map((x) => (
            <span>{x}</span>
          ))}
        </h1>
        <div className="outer">
          <div className="button">
            <span
              style={{
                width: `${charge}%`,
                background:
                  charge > 80 ? "lime" : charge > 30 ? "orange" : "red",
              }}
            >
              {`${charge}%`}
            </span>
          </div>
        </div>
        <main>
          <div>
            <strong>Newcastle, NSW</strong>
          </div>
          <p>
            <strong>{time}</strong> {bom}
          </p>
        </main>
      </body>
    </html>
  );
}

typeof document !== "undefined" && hydrate(document, <App />);
