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

const pokemon = (name, owner) => {
  // general
  let level = 1;
  let evolvePokemon = evolutions(name);
  let pokemonName = name;
  let currentOwner = owner;

  // vitals
  let hp = 100;
  let hunger = 0;
  return {
    'pokeInfo': () => {
      pokePrint(pokemonName);
      console.table({name: pokemonName, lvl: level, owner: currentOwner, hp, hunger});
    },
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
  console.log("\nquit: Get the hell out of here!");
  console.log("\npoke catch: Catch a random pokemon!");
  console.log("\n");
}

function pokeCatch() {
  // Currently hard coding for pikachu, logic here is straight forward
  // but will take some thought in implementation in the future.
  // We would run Math.random() over the interval of pokemon nums
  // we can catch out in the wild.
  let pokeName = 'pikachu';
  console.log(`Encountered a wild ${pokeName}`);
  pokePrint(pokeName);
  return pokeName;
}

async function run() {
  const rl = readline.createInterface({ input, output });
  const cmd = await rl.question('>>> ');

  // EVENT HANDLER
  switch(cmd) {
  case 'help':
    usage();
    break;
  case 'poke catch':
    const potentialPokemon = pokeCatch();
    const answer = await rl.question(`Would you like to catch wild ${potentialPokemon}? (y/n) `);
    if (answer.toLowerCase() === 'y') console.log(`You caught a wild ${potentialPokemon}!`);
    else console.log(`You let ${potentialPokemon} go!`);
    break;
  case 'quit':
    console.log("Thank you for playing!");
    process.exit(0); // exits application with status of 0
		     // when writing terminal based application, an exit code
		     // of 0 means "there were no problems"
  }
  // pikachu.pokeInfo();
  rl.close();

  // Recursion makes event loop nice. :D
  run();
}

intro();
run();
