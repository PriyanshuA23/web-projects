// const obj = {
//   "baby_trigger_item": null,
//   "chain": {
//     "evolution_details": [],
//     "evolves_to": [
//       {
//         "evolution_details": [
//           {
//             "base_form_id": null,
//             "gender": null,
//             "held_item": null,
//             "item": null,
//             "known_move": null,
//             "known_move_type": null,
//             "location": null,
//             "min_affection": null,
//             "min_beauty": null,
//             "min_damage_taken": null,
//             "min_happiness": null,
//             "min_level": 50,
//             "min_move_count": null,
//             "min_steps": null,
//             "needs_multiplayer": false,
//             "needs_overworld_rain": false,
//             "party_species": null,
//             "party_type": null,
//             "region_id": null,
//             "relative_physical_stats": null,
//             "time_of_day": "",
//             "trade_species": null,
//             "trigger": {
//               "name": "level-up",
//               "url": "https://pokeapi.co/api/v2/evolution-trigger/1/",
//             },
//             "turn_upside_down": false,
//             "used_move": null,
//           },
//         ],
//         "evolves_to": [
//           {
//             "evolution_details": [
//               {
//                 "base_form_id": null,
//                 "gender": null,
//                 "held_item": null,
//                 "item": null,
//                 "known_move": null,
//                 "known_move_type": null,
//                 "location": null,
//                 "min_affection": null,
//                 "min_beauty": null,
//                 "min_damage_taken": null,
//                 "min_happiness": null,
//                 "min_level": 64,
//                 "min_move_count": null,
//                 "min_steps": null,
//                 "needs_multiplayer": false,
//                 "needs_overworld_rain": false,
//                 "party_species": null,
//                 "party_type": null,
//                 "region_id": null,
//                 "relative_physical_stats": null,
//                 "time_of_day": "",
//                 "trade_species": null,
//                 "trigger": {
//                   "name": "level-up",
//                   "url": "https://pokeapi.co/api/v2/evolution-trigger/1/",
//                 },
//                 "turn_upside_down": false,
//                 "used_move": null,
//               },
//             ],
//             "evolves_to": [],
//             "is_baby": false,
//             "species": {
//               "name": "hydreigon",
//               "url": "https://pokeapi.co/api/v2/pokemon-species/635/",
//             },
//           },
//         ],
//         "is_baby": false,
//         "species": {
//           "name": "zweilous",
//           "url": "https://pokeapi.co/api/v2/pokemon-species/634/",
//         },
//       },
//     ],
//     "is_baby": false,
//     "species": {
//       "name": "deino",
//       "url": "https://pokeapi.co/api/v2/pokemon-species/633/",
//     },
//   },
//   "id": 323,
// };

const extractName = (evolves_to) => {
  return evolves_to.species.name;
};

const extractData = (pokemon, names) => {
  if (pokemon.length === 0) {
    return;
  }

  pokemon.forEach((key) => {
    names.push(extractName(key));
    extractData(key.evolves_to, names);
  });
};

const extractSpecies = async (name) => {
  // try {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${name}`,
  );

  const data = await response.json();
  const speciesResponse = await fetch(data.evolution_chain.url);
  return await speciesResponse.json();
  // } catch {
  // console.log("failed to fetch ", name);
  // }
};

const extractSpecifiedSpeciesNames = async (name) => {
  // try {
  const data = await extractSpecies(name);
  const names = [data.chain.species.name];
  const mainChain = data.chain.evolves_to;
  extractData(mainChain, names);
  return names;
  // } catch {
  // console.log("failed to fetch ", name);
  // }
};

const main = async () => {
  const pokemons = JSON.parse(Deno.readTextFileSync("./all_data.json"));
  for (const pokemon of pokemons) {
    try {
      const evals = await extractSpecifiedSpeciesNames(pokemon.name);
      pokemon.evolutions = evals;
    } catch {
      console.log("failed to fetch ", pokemon.name);
    }
  }

  Deno.writeTextFileSync("./new_data.json", JSON.stringify(pokemons, null, 2));
};

main();
