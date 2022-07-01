const {pokePrint} = require('./include/pokeart.js');
const Prompt = require('./classes/prompt.js');

// TODO:
// multiplayer with new prompt instances?
const prompt = new Prompt(">>> ");

async function run() {
  let quit = false;
  while (!quit) {
    const answer = await prompt.question("What is your command?");
    console.log(`Your command was ${answer}`);
    if (answer === 'quit')  quit = true;
  }
  prompt.close();
}

run();
