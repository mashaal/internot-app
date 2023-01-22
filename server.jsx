import { serve } from "https://deno.land/std@0.164.0/http/server.ts";
import { createServer } from "ultra/server.ts";
import App from "./app.jsx";
import React from "react";

const server = await createServer({
  importMapPath: import.meta.resolve("./importMap.json"),
  browserEntrypoint: import.meta.resolve("./app.jsx"),
});

const getWeather = async () => {
  const weather = await fetch(
    "http://reg.bom.gov.au/fwo/IDN60901/IDN60901.94774.json",
  ).then((x) => x.json());
  return weather?.observations?.data?.[0];
};

const getBattery = async () => {
  const cmd = Deno.run({
    cmd: ["python3", "battery.py"],
    stdout: "piped",
    stderr: "piped",
  });
  const output = await cmd.output();
  cmd.close();
  const outStr = new TextDecoder().decode(output);
  return JSON.parse(outStr);
};

server.get("*", async (context) => {
  let weather = await getWeather();
  let battery = await getBattery();
  /**
   * Render the request
   */
  const result = await server.render(
    <App battery={battery} weather={weather} />,
    {
      disableHydration: true,
    },
  );

  return context.body(result, 200, {
    "content-type": "text/html; charset=utf-8",
  });
});

if (import.meta.main) {
  serve(server.fetch);
}

export default server;
