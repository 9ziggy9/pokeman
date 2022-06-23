import * as readline from 'node:readline/promises';
import {stdin as input, stdout as output} from 'node:process';
import pokePrint from './include/pokemon.mjs';


// const {pokePrint} = require('./include/pokemon.js');
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

const pokemon = (name) => {
  // general
  let level = 1;
  let evolvePokemon = evolutions(name);
  let pokemonName = name;
  let alive = true;
  // let currentOwner = owner; // changing to single player game. :)

  // vitals
  let hp = 100;
  let hunger = 0;

  return {
    'pokeInfo': () => {
      pokePrint(alive ? pokemonName : "dead");
      console.table({name: pokemonName, lvl: level, hp, hunger, status: alive ? "alive" : "dead! x.x"});
    },
    'pokeName': () => `${pokemonName} ${alive ? "" : "-- dead!"}`,
    'levelup': () => level++,
    'evolve': () => {
      pokemonName = nextEvolution(pokemonName, evolvePokemon);
      return pokemonName;
    },
    'resetLevel': () => {
      level = 0;
      pokemonName = name;
      return pokemonName;
    },
    'getHunger': () => hunger,
    'beHungry': () => {
      hunger++;
      if (hunger > 30 && alive) hp = (hp - 5) < 0 ? 0 : hp - 5;
      if (hp <= 0) alive = false;
    },
    'eatFood': () => {
      hunger = (hunger - 10 < 0) ? 0 : hunger - 10;
      console.log(`You fed your ${pokemonName}, their hunger is now: ${hunger}`);
    },
    'isAlive': () => alive
  };
};

// pikachu stuff
// pikachu.pokeInfo();
// pikachu.levelup();
// pikachu.levelup();
// pikachu.levelup();
// pikachu.evolve();
// pikachu.pokeInfo();
// pikachu.resetLevel();
// pikachu.pokeInfo();

function intro() {
  console.log("Welcome to our game with Pokemans!");
  console.log("Type help to get usage of this application!");
}

function usage() {
  console.log("Here is a set of commands and their usage.");
  console.log("\nhelp: Where you're at!");
  console.log("\nquit: Exit game");
  console.log("\ncatch: Catch a random pokemon!");
  console.log("\nfeed: Feed a pokemon!");
  console.log("\nlist: Print a list of your pokemon");
  console.log("\n");
}

function pokeEncounter() {
  // Currently hard coding for pikachu, logic here is straight forward
  // but will take some thought in implementation in the future.
  // We would run Math.random() over the interval of pokemon nums
  // we can catch out in the wild.
  let pokeName = 'pikachu';
  console.log(`Encountered a wild ${pokeName}`);
  pokePrint(pokeName);
  return pokeName;
}

function pokeCatch(pokeName, myPokemon) {
  console.log(`You caught a ${pokeName}`);
  myPokemon.push(pokemon(pokeName));
  console.log("Your list of pokemon is updated!");
  for (let pokemon of myPokemon) {
    console.log(pokemon.pokeName());
  }
}

function pokeList(myPokemon, flags="") {
  console.clear();
  console.log("My pokemon:");
  myPokemon.forEach((pokemon, index) => {
    switch(flags) {
    case 'hunger':
      console.log(`${index}) ${pokemon.pokeName()} Hunger: ${pokemon.getHunger()}`);
      break;
    default:
      console.log(`${index}) ${pokemon.pokeName()}`);
      break;
    }
  });
}

function pokeStarve(pokemon) {
  setInterval(() => {
    for (let pokeman of pokemon) {
      if(pokeman.isAlive()) pokeman.beHungry();
    }
  }, 1000);
}

async function run(pokemon) {
  // INITIALIZING READLINE INTERFACE
  const rl = readline.createInterface({ input, output });
  const cmd = await rl.question('>>> ');

  // INITIALIZING MY POKEMON ARRAY -- note that nothing will persist!

  // EVENT HANDLER
  switch(cmd) {
  case 'help':
    usage();
    break;
  case 'list':
    pokeList(myPokemon);
    const pokeId = await rl.question(
      "Enter the number of the pokemon you wish to view, or any other key to exit: ");
    if (!myPokemon[pokeId]) {
      console.log("Exiting.");
    } else {
      myPokemon[pokeId].pokeInfo();
    }
    break;
  case 'catch':
    const potentialPokemon = pokeEncounter();
    // Leverage readline interface
    const answer = await rl.question(`Would you like to catch wild ${potentialPokemon}? (y/n) `);
    if (answer.toLowerCase() === 'y') pokeCatch(potentialPokemon, myPokemon);
    else console.log(`You let ${potentialPokemon} go!`);
    break;
  case 'feed':
    pokeList(myPokemon, "hunger");
    const feedId = await rl.question(`Select pokemon to feed or press any other key to exit: `);
    if (!myPokemon[feedId]) console.log("No Pokemon fed -- exiting.");
    else myPokemon[feedId].eatFood(); 
    break;
  case 'quit':
    console.log("Thank you for playing!");
    process.exit(0); // exits application with status of 0
		     // when writing terminal based application, an exit code
		     // of 0 means "there were no problems"
  default:
    console.log(`Unrecognized command: ${cmd}`);
    break;
  }
  // pikachu.pokeInfo();
  rl.close();

  // Recursion makes event loop nice. :D
  run();
}

// HERE BEGINS THE GAME

// INIT
intro();
const myPokemon = []; // to make persist between run calls
const starve = pokeStarve(myPokemon);

// GAME LOOP
run(myPokemon);
