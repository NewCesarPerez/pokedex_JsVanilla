const dataCard = document.getElementById("data-poke-card");
const dataName = document.getElementById("data-poke-name");
const dataImgContainer = document.getElementById("data-poke-img-container");
const dataImg = document.getElementById("data-poke-img");
const dataPokeId = document.getElementById("data-poke-id");
const dataPokeTypes = document.getElementById("data-poke-types");
const dataPokeStats = document.getElementById("data-poke-stats");

const typeColors = {
  electric: "#FFEA70",
  normal: "#B09398",
  fire: "#FF675C",
  water: "#0596C7",
  ice: "#AFEAFD",
  rock: "#999799",
  flying: "#7AE7C7",
  grass: "#4A9681",
  psychic: "#FFC6D9",
  ghost: "#561D25",
  bug: "#A2FAA3",
  poison: "#795663",
  ground: "#D2B074",
  dragon: "#DA627D",
  steel: "#1D8A99",
  fighting: "#2F2F2F",
  default: "#2A1A1F",
};

const searchPokemon = (event) => {
  event.preventDefault();
  const { value } = event.target.pokemon;
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then((data) => data.json())
    .then((response) => renderPokemonData(response))
    .catch(err=>renderNotFound());
    
};

const renderPokemonData = (data) => {
  const sprite = data.sprites.front_default;
  const { stats, types } = data;

  dataName.textContent = data.name;
  dataImg.setAttribute("src", sprite);
  dataPokeId.textContent = `N° ${data.id}`;
  setCardColor(types);
  renderPokemonTypes(types)
  renderPokemonStats(stats)
  console.log(data);
};

const setCardColor = (types) => {
  const colorOne = typeColors[types[0].type.name];
  const colorTwo = types[1]
    ? typeColors[types[1].type.name]
    : typeColors.default;

  dataImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
  dataImg.style.backgroundSize = " 5px 5px";
};

const renderPokemonTypes = types => {
    dataPokeTypes.innerHTML='';
    types.forEach(type=>{
        const typeTextElement=document.createElement("div")
        typeTextElement.style.color=typeColors[type.type.name]
        typeTextElement.textContent=type.type.name
        dataPokeTypes.appendChild(typeTextElement)
    })
}

const renderPokemonStats= stats=>{
    dataPokeStats.innerHTML=''
    let i=0
    stats.forEach(stat=>{
        const statElement=document.createElement("div")
        const statNameContainer=document.createElement("p")
        const statValueContainer=document.createElement("p")
        statNameContainer.textContent=stat.stat.name
        statValueContainer.textContent=stat.base_stat
        statElement.appendChild(statNameContainer)
        statElement.appendChild(statValueContainer)
        dataPokeStats.appendChild(statElement)
    })
}
const renderNotFound=()=>{
    dataName.textContent='No enontrado';
    dataImg.setAttribute('src', './img/poke-shadow.png')
    dataImg.style.background='#fff';
    dataPokeTypes.innerHTML=''
    dataPokeStats.innerHTML=''
    dataPokeId.textContent=''
}
