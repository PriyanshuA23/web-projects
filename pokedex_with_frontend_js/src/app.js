import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";
import { provideData } from "./pokemon_serve.js";

export const createApp = (pokemons) => {
  const app = new Hono();
  app.use(logger());
  app.use(async (context, next) => {
    context.set("pokemons", pokemons);
    await next();
  });

  app.get("/get-data", provideData);
  app.get("*", serveStatic({ root: "./public" }));
  return app;
};
