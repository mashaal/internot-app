import hydrate from "ultra/hydrate.js";
import React from "react";
import { useState } from "react";

export default function App({ battery, weather, time, bom }) {
  const title = "ew/ast/e";
  const charge = battery?.charge?.data || 0;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>🧃</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/style.css" rel="stylesheet" />
      </head>
      <body>
        <h1 style={{ filter: "url(#f-9a51f798)", textTransform: "uppercase" }}>
          {title.split("").map((x) => (
            <span style={{ color: x == "/" ? "#333" : "inherit" }}>{x}</span>
          ))}
        </h1>
        <svg
          width="100%"
          height="100%"
          style={{
            visibility: "hidden",
            position: "absolute",
            top: "-100%",
            left: "-100%",
            pointerEvents: "none",
          }}
        >
          <defs>
            <filter
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
              filterRes="1"
              filterUnits="objectBoundingBox"
              primitiveUnits="userSpaceOnUse"
              color-interpolation-filters="linearRGB"
              id="f-9a51f798"
            >
              <feTurbulence
                x="0"
                y="0"
                width="100%"
                height="100%"
                baseFrequency="0.02"
                numOctaves="2"
                seed="1"
                stitchTiles="stitch"
                result="e-fb0909a1"
              ></feTurbulence>
              <feDisplacementMap
                x="0"
                y="0"
                width="100%"
                height="100%"
                in="SourceGraphic"
                in2="e-fb0909a1"
                scale="20"
                result="e-b69f44c3"
              ></feDisplacementMap>
            </filter>
          </defs>
        </svg>
        <div className="outer">
          <div className="button">
            <span
              style={{
                width: `${charge}%`,
                background:
                  charge > 66 ? "lime" : charge > 33 ? "orange" : "red",
              }}
            >
              {`${charge}%`}
            </span>
          </div>
        </div>
        <main>
          <p>
            This website is running on a solar powered server in{" "}
            <strong>Newcastle, NSW</strong>.
          </p>
          <p>
            Local time: <strong>{time}</strong>.
          </p>
          <p>{bom}</p>
        </main>
      </body>
    </html>
  );
}

typeof document !== "undefined" && hydrate(document, <App />);
