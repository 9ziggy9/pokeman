const {pokePrint} = require('./include/pokeart.js');
const Prompt = require('./classes/prompt.js');
const Signal = require('./signal.js');

async function run() {
  let signal = true;
  while (signal) {
    signal = await Signal.handler(signal);
  }
}

console.clear();
run();
