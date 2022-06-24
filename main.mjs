import pokePrint from './include/pokeart.mjs';
import * as readline from 'node:readline/promises';
import {stdin as input, stdout as output} from 'node:process';

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
  // info
  let evolvePokemon = evolutions(name);
  let pokemonName = name;

  // stats
  let level = 1;
  let alive = true;
  let hp = 100;
  let hunger = 0;

  return {
    'pokeInfo': () => {
      pokePrint(alive ? pokemonName : "dead");
      console.table({name: pokemonName, lvl: level});
    },
    'stats': () => ({name: pokemonName, lvl: level, hp, hunger, alive}),
    'getHungry': () => {
      if (alive) hunger++;
      if (hunger > 30 && alive) hp = (hp - 5) < 0 ? 0 : hp - 5;
      if (hp <= 0) alive = false;
    },
    'eatFood': () => {
      if (alive) {
	hunger = (hunger - 10) < 0 ? 0 : hunger - 10;
	if (hunger === 0) console.log(`${pokemonName} is full.`);
	else {
	  console.log(`Feeding ${pokemonName}...`);
	  console.log(`${pokemonName} says ${pokemonName}`); 
	}
      } else {
	console.log("Can't feed a dead pokemon");
      }
    }
  };
};

function pokeEncounter() {
  let pokeName = 'pikachu';
  console.log(`Encountered a wild ${pokeName}`);
  pokePrint(pokeName);
  return pokeName;
}

function pokeCatch(pokemonName, myPokemon) {
  console.log(`You caught a ${pokemonName}`);
  const newPokemon = pokemon(pokemonName);
  myPokemon.push(newPokemon);
}

function starve(myPokemon) {
  setInterval(() => {
    for (let pokemon of myPokemon) {
      pokemon.getHungry();
    }
  }, 1000);
}

async function run(myPokemon) {
  const rl = readline.createInterface({input, output});
  const cmd = await rl.question('>>> ');

  switch(cmd) {
  case 'help':
    console.log('\nhelp: Prints this menu');
    console.log('\nquit: Exit the program');
    console.log('\ncatch: Create pokemon encounter');
    console.log('\nlist: List your pokemon');
    break;
  case 'catch':
    console.clear();
    // Implement Math.random() associated with probability of catching
    // pokemon with pokeball
    const potentialPokemon = pokeEncounter();
    const decision = await rl.question(`Would you like to catch wild ${potentialPokemon}? (y/n) ` );
    if (decision.toLowerCase() === 'y') pokeCatch(potentialPokemon, myPokemon);
    else console.log(`You did not capture the ${potentialPokemon}`);
    break;
  case 'list':
    console.clear();
    console.table(myPokemon.map(pokemon => pokemon.stats()));
    const pokeId = await rl.question("Select pokemon to view or any other key to exit: ");
    if (myPokemon[pokeId]) myPokemon[pokeId].pokeInfo();
    else console.log("Exiting list...");
    break;
  case 'feed':
    console.table(myPokemon.map(pokemon => pokemon.stats()));
    const feedId = await rl.question("Select pokemon to feed or any other key to exit: ");
    if (myPokemon[feedId]) myPokemon[feedId].eatFood();
    else console.log("Exiting feed...");
    break;
  case 'quit':
    console.log("Thank your playing!");
    // garbage collects all variables, frees memory, and closes the program
    process.exit(); // zero exit code by default
  case 'clear':
    console.clear();
    break;
  case 'ziggy':
    console.log("=====================");
    console.log("Ziggy made this game");
    console.log("=====================");
    break;
  default:
    console.log(`Command not recognized: ${cmd}`);
    break;
  }

  rl.close();
  return run(myPokemon);
}

// Initialize, start game
console.log("Welcome to the pokemon game!");
const myPokemon = [];
const starving = starve(myPokemon);

// Run game
run(myPokemon);
