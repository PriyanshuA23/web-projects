import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";
import {
  serveHomePage,
  serveParticularTypePokemon,
  serveSpecifiedPokemon,
} from "./pokemon_serve.js";

export const createApp = (pokemons, eta) => {
  const app = new Hono();
  app.use(logger());
  app.use(async (context, next) => {
    context.set("pokemons", pokemons);
    context.set("eta", eta);
    await next();
  });

  app.get("/", serveHomePage);
  app.get("/pokemon", serveSpecifiedPokemon);
  app.get("/types", serveParticularTypePokemon);
  app.get("*", serveStatic({ root: "./" }));
  return app;
};
