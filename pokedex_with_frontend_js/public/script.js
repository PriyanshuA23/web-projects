const fetchPokemon = async () => fetch("/data/all_data.json").then(data => data.json());

const createFragment = ([tag, attributes, ...content]) => {
  const element = document.createElement(tag);
  for (const [key, val] of Object.entries(attributes)) {
    element.setAttribute(key, val);
  }

  if (content.length === 1 && typeof content[0] === "string"){
    element.textContent = content;
    return element;
  }
  const finalContent = content.map(createFragment);
  element.append(...finalContent);
  return element;
}

const createCard = ({stats, name, types, url}) => {
  const data = [
    "div", {class: "card"},
      ["div", {class: "image"}, ["img", {src: url}, ""]],
      ["div", {class: "details"}, 
        ["div", {class: "overview"}, 
          ["div", {class: "name"}, name],
          ["div", {class: "type-container"}, 
            ...types.map(type => ["div", {class: `${type.toLowerCase()} type`}, type])],
        ],
        
        ["table", {}, 
          ["tbody", {}, 
            ...stats.map(({base_stat, name}) => 
              ["tr", {}, ["td", {}, name], ["td", {}, `${base_stat}`]]
          )
          ]
        ]
      ],
  ];

  return createFragment(data);
}

const createAllCard = (allPokemon) => {
  console.log({allPokemon});
  
  const main = document.querySelector("main");
  const allPokemonCard = allPokemon.map(createCard);
  main.append(...allPokemonCard);
};

window.onload = () => {
  fetchPokemon().then(createAllCard);
}