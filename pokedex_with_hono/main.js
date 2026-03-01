import { createApp } from "./src/app.js";
import { Eta } from "eta";

const main = () => {
  const pokemons = JSON.parse(Deno.readTextFileSync("./all_data.json"));
  const eta = new Eta({ views: "./" });
  const app = createApp(pokemons, eta);
  Deno.serve({ port: 8000 }, app.fetch);
};

main();
