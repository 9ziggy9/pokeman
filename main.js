const {pokePrint} = require('./include/pokeart.js');
const Prompt = require('./classes/prompt.js');
const {Signal} = require('./classes/signal.js');

// TODO:
// multiplayer with new prompt instances?
const prompt = new Prompt();

async function run() {
  let signal = true;
  while (signal) {
    const response = await prompt.question(">>> ");
    signal = Signal.handler(response).execute();
  }
  prompt.close();
}

run();
