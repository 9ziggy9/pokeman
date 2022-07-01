const {pokePrint} = require('./include/pokeart.js');
const Prompt = require('./classes/prompt.js');
const {commandHandler} = require('./runtime.js');

// TODO:
// multiplayer with new prompt instances?
const prompt = new Prompt();

async function run() {
  let running = true;
  while (running) {
    const command = await prompt.question(">>> ");
    running = commandHandler(command);
  }
  prompt.close();
}

run();
