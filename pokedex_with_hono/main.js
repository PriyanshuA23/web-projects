import { createApp } from "./src/app.js";
import { Eta } from "eta";

const extractTypes = (pokemons) => {
  return pokemons.reduce((types, pokemon) => {
    pokemon.types.forEach((type) => {
      if (!types.includes(type)) {
        types.push(type);
      }
    });

    return types;
  }, []);
};

const main = () => {
  const pokemons = Deno.readTextFileSync("./data/all_data.json");
  const types = extractTypes(JSON.parse(pokemons));
  const eta = new Eta({ views: "./" });
  const app = createApp(pokemons, eta, types);
  Deno.serve({ port: 8000 }, app.fetch);
};

main();
