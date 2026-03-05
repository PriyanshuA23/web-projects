import { createFragment } from "./fragment.js";

const fetchPokemon = async () =>
  fetch("/data/all_data.json")
    .then((data) => data.json());

const createCard = ({ stats, name, types, url }) => {
  const cardformat = [
    "div",
    { class: "card" },
    ["div", { class: "image" }, ["img", { src: url }, ""]],
    ["div", { class: "details" }, ["div", { class: "overview" }, ["div", {
      class: "name",
    }, name], [
      "div",
      { class: "type-container" },
      ...types.map(
        (type) => ["div", { class: `${type.toLowerCase()} type` }, type]
      ),
    ]], ["table", {}, [
      "tbody",
      {},
      ...stats.map((
        { base_stat, name },
      ) => ["tr", {}, ["td", {}, name], ["td", {}, `${base_stat}`]]),
    ]]],
  ];

  return createFragment(cardformat);
};

const createAllCard = (allPokemon) => {
  const main = document.querySelector("main");
  const allPokemonCard = allPokemon.map(createCard);
  main.append(...allPokemonCard);
};

const extractAllTypesName = (allPokemon) => {
  const typeList = [];
  allPokemon.forEach(({ types }) => {
    types.forEach((type) => {
      if (!typeList.includes(type)) typeList.push(type);
    });
  });
  return typeList;
};

const createHeader = (allPokemon) => {
  const allTypes = extractAllTypesName(allPokemon);
  const headingFormat = ["h1", {}, "Pokemon Gallery"];
  const searchBarFormat = [
    "form",
    { class: "search-bar", method: "get" },
    ["input", {
      list: "options",
      type: "text",
      placeholder: "enter pokemon name",
      name: "name",
    }, ""],
    [
      "dataList",
      { id: "options" },
      ...allPokemon.map(({ name }) => ["option", { value: name }, ""]),
    ],
    ["button", {}, "search"],
  ];

  const typeFormat = [
    "form",
    { class: "type-selector" },
    [
      "select",
      { name: "type" },
      ["option", {}, "select type"],
      ...allTypes.map((type) => ["option", { value: type }, type]),
    ],
  ];

  const header = document.querySelector("header");
  const heading = createFragment(headingFormat);
  const searchBar = createFragment(searchBarFormat);
  const typeSelector = createFragment(typeFormat);
  header.append(heading, searchBar, typeSelector);
};

const createTypeCard = (type, allPokemon) => {
  const allSpecifiedTypePokemon = allPokemon.filter(({ types }) =>
    types.includes(type)
  );
  const pokemonContainer = document.querySelector(".container");
  pokemonContainer.textContent = "";
  createAllCard(allSpecifiedTypePokemon)
};

window.onload = async () => {
  const allPokemon = await fetchPokemon();
  createHeader(allPokemon);
  createAllCard(allPokemon);

  const typeSelector = document.querySelector("select");
  typeSelector.addEventListener("change", (event) => {
    event.preventDefault();
    const selectedType = event.target.value;
    createTypeCard(selectedType, allPokemon);
  });
};
