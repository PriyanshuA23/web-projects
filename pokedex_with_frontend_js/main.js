import { createApp } from "./src/app.js";

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
  const app = createApp(pokemons, types);
  Deno.serve({ port: 8000 }, app.fetch);
};

main();
