const RAWDATA = Deno.readTextFileSync("all_data.json");
const DATA = JSON.parse(RAWDATA);

const serveHomePage = () => {
  const contentBody = Deno.readTextFileSync("index.html");
  return new Response(contentBody, {
    headers: {
      "content-type": "text/html",
    },
  });
};

const extractStats = (stats) => {
  const filteredStats = {};
  stats.forEach(({ base_stat, name }) => {
    filteredStats[name] = base_stat;
  });
  return filteredStats;
};

const generateTypeContainers = (types) => {
  let typeContainers = ``;
  types.forEach((type) => {
    typeContainers += `<div class="type ${type}">${type}</div>`;
  });

  return typeContainers;
};

const generateCard = ({ stats, name, types, url }) => {
  const { hp, attack, defense, speed, baseXp, weight } = extractStats(stats);
  return `<div class="card">
          <div class="image">
            <img src=${url} alt="pokemon">
          </div>
          <div class="details">
            <div class="overview">
              <div class="name">${name}</div>
              <div class="type-container">
                ${generateTypeContainers(types)}
              </div>
            </div>
            <table>
              <tbody>
                <tr>
                  <td>Weight</td>
                  <td>${weight}</td>
                </tr>
                <tr>
                  <td>Base XP</td>
                  <td>${baseXp}</td>
                </tr>
                <tr>
                  <td>HP</td>
                  <td>${hp}</td>
                </tr>
                <tr>
                  <td>Attack</td>
                  <td>${attack}</td>
                </tr>
                <tr>
                  <td>Defence</td>
                  <td>${defense}</td>
                </tr>
                <tr>
                  <td>Speed</td>
                  <td>${speed}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>`;
};

const createPokemonNameList = (data) => {
  return data.reduce(
    (list, { name }) => list.push(`<option value="${name}"></option>`) && list,
    [],
  ).join("");
};

const createBaseTemplate = ({ name, url }, data) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name}</title>
  <link rel="shortcut icon" href="${url}" type="image/x-icon">
  <link rel="stylesheet" href="style.css">
</head>
<body>
<form action="/pokemon_search">
    <label for="name">Name</label>
    <input type="text" name="pokemon" id="name" list="pokemon-names">
    <datalist id="pokemon-names">
      ${createPokemonNameList(data)}
    </datalist>
    <button type="submit">Submit</button>
  </form>
`;
};

const createPokemonCard = (name) => {
  const pokemonDetails = DATA.find((pokemon) => pokemon.name === name);
  if (pokemonDetails !== undefined) {
    return `${createBaseTemplate(pokemonDetails, DATA)} ${
      generateCard(pokemonDetails)
    }</body></html>`;
  }
};

const servePokemon = (url) => {
  console.log(url);
  const searchParams = new URLSearchParams(url.search);
  const name = searchParams.get("pokemon");
  const content = createPokemonCard(name);

  return new Response(content, {
    headers: {
      "content-type": "text/html",
    },
  });
};

const serveCss = () => {
  const contentBody = Deno.readTextFileSync("style.css");
  return new Response(contentBody, {
    headers: { "content-type": "text/css" },
  });
};

export const requestHandler = (req) => {
  const url = new URL(req.url);
  switch (url.pathname) {
    case "/":
      return serveHomePage();
    case "/pokemon_search":
      return servePokemon(url);
    case "/style.css":
      return serveCss(url);
  }
  console.log(url.pathname);
};
