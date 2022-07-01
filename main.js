const {pokePrint} = require('./include/pokeart.js');
const Prompt = require('./classes/prompt.js');

const prompt = new Prompt(">>> ", "Command was: ");

async function run() {
  await prompt.question();
  Prompt.close();
}

run();
