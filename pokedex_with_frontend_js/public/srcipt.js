import { createPokemonsCards } from "./card.js";

const createHeading = (content) => {
  const h1 = document.createElement("h1");
  h1.textContent = content;
  return h1;
};

const createForm = (className) => {
  const form = document.createElement("form");
  form.classList.add(className);
  return form;
};

const createInputElement = (attributes) => {
  const input = document.createElement("input");
  attributes.forEach(({ name, value }) => {
    input.setAttribute(name, value);
  });
  return input;
};

const createDataList = (data) => {
  const dataList = document.createElement("dataList");
  dataList.setAttribute("id", "options");
  data.forEach(({ name }) => {
    const option = document.createElement("option");
    option.setAttribute("value", name);
    dataList.append(option);
  });
  return dataList;
};

const createSearchBar = (data) => {
  const form = createForm("search-bar");
  const input = createInputElement([
    { name: "type", value: "text" },
    { name: "placeholder", value: "enter pokemon name" },
    { name: "name", value: "name" },
    { name: "list", value: "options" },
  ]);
  const dataList = createDataList(data);
  form.append(input, dataList);
  return form;
};

const createHeader = (data) => {
  const body = document.querySelector("body");
  const header = document.querySelector("header");
  const h1 = createHeading("Pokemon Gallery");
  const searchBar = createSearchBar(data);
  header.append(h1, searchBar);
  body.append(header);
  console.log(body);
};

const pokemon = [{
    "stats": [
      { "base_stat": 45, "name": "hp" },
      { "base_stat": 49, "name": "attack" },
      { "base_stat": 49, "name": "defense" },
      { "base_stat": 45, "name": "speed" },
      { "base_stat": 64, "name": "baseXp" },
      { "base_stat": 69, "name": "weight" }
    ],
    "name": "bulbasaur",
    "types": ["grass", "poison"],
    "url": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
  }];

window.onload = async() => {
  const dataResponse = await fetch("/get-data");
  // const main = document.querySelector("container");
  createPokemonsCards(pokemon);
  // const data = await res.json();
};
