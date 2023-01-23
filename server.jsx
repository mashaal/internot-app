import { serve } from "https://deno.land/std@0.164.0/http/server.ts";
import { createServer } from "ultra/server.ts";
import App from "./app.jsx";
import React from "react";
import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";

const server = await createServer({
  importMapPath: import.meta.resolve("./importMap.json"),
  browserEntrypoint: import.meta.resolve("./app.jsx"),
});

const getWeather = async () => {
  const weather = await fetch(
    "http://reg.bom.gov.au/fwo/IDN60901/IDN60901.94774.json"
  ).then((x) => x.json());
  return weather?.observations?.data?.[0];
};

const getBom = async () => {
  const url = "http://www.bom.gov.au/nsw/forecasts/newcastle.shtml";
  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    const description = $(".day:first-of-type .forecast p").text();

    return description;
  } catch (error) {
    return false;
  }
};

const getBattery = async () => {
  try {
    const cmd = Deno.run({
      cmd: ["python3", "battery.py"],
      stdout: "piped",
      stderr: "piped",
    });
    const output = await cmd.output();
    cmd.close();
    const outStr = new TextDecoder().decode(output);
    return JSON.parse(outStr);
  } catch (e) {
    return {};
  }
};

server.get("*", async (context) => {
  let weather = await getWeather();
  let battery = await getBattery();
  let bom = await getBom();
  /**
   * Render the request
   */
  const result = await server.render(
    <App
      bom={bom}
      battery={battery}
      weather={weather}
      time={new Date().toLocaleTimeString([], {
        hour: "2-digit",
        hour12: false,
        minute: "2-digit",
      })}
    />,
    {
      disableHydration: true,
    }
  );

  return context.body(result, 200, {
    "content-type": "text/html; charset=utf-8",
  });
});

if (import.meta.main) {
  serve(server.fetch);
}

export default server;
