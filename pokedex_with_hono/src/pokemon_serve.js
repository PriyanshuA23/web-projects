export const serveHomePage = (context) => {
  const eta = context.get("eta");
  const pokemons = context.get("pokemons");
  console.log(pokemons);

  const page = eta.render("/pokemon.html", { pokemons, allPokemons: pokemons });
  return context.html(page);
};

export const serveParticularTypePokemon = (context) => {
  const type = context.req.query("type");
  const eta = context.get("eta");
  const allPokemons = context.get("pokemons");
  const pokemons = allPokemons.filter(({ types }) => types.includes(type));
  const page = eta.render("/pokemon.html", { pokemons, allPokemons });
  return context.html(page);
};

export const serveSpecifiedPokemon = (context) => {
  const allPokemons = context.get("pokemons");
  const eta = context.get("eta");
  const name = context.req.query("name");
  const specifiedPokemon = allPokemons.filter((pokemon) =>
    pokemon.name === name
  );
  const page = eta.render("/pokemon.html", {
    allPokemons,
    pokemons: specifiedPokemon,
    length: 1,
  });
  return context.html(page);
};
