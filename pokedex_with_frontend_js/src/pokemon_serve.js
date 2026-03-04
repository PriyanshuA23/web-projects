export const provideData = (context) => {
  return context.json(context.get("pokemons"));
};
