// closure that represents a pokemon,
// -- name
// -- owner
// -- level
// -- evolutions

// EDGECASE -- Eevee

function evolutions(name) {
  if (name === 'pikachu') return ['raichu'];
  if (name === 'charmander') return ['charmeleon', 'charizard'];
  console.log("Pokeman don't exist");
  return null;
}

function nextEvolution(name, evolutionArr) {
  for (let pokemon of evolutionArr) {
    if (pokemon !== name) {
      name = pokemon;
      return name;
    }
  }
  return null;
}

const pokemon = (name, owner) => {
  let level = 1;
  let evolvePokemon = evolutions(name);
  let pokemonName = name;
  let currentOwner = owner;
  return {
    'pokeInfo': () => console.log(pokemonName, level, currentOwner),
    'levelup': () => level++,
    'evolve': () => {
      pokemonName = nextEvolution(pokemonName, evolvePokemon);
      return pokemonName;
    },
    'resetLevel': () => {
      level = 0;
      pokemonName = name;
      return pokemonName;
    }
  };
};

// pikachu stuff
const pikachu = pokemon("pikachu", "Sam");
pikachu.levelup();
pikachu.levelup();
pikachu.levelup();
pikachu.evolve();
pikachu.pokeInfo();
pikachu.resetLevel();
pikachu.pokeInfo();

// charmander stuff
const charmander = pokemon("charmander", "Abel");
charmander.levelup();
charmander.evolve();
charmander.pokeInfo();
