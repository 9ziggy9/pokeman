const Runtime = require('./classes/runtime.js');
const Prompt = require('./classes/prompt.js');

async function handler(signal) {
  const prompt = new Prompt();
  prompt.bottom(); // Add cursor to bottom
  signal = await prompt.question(">>> ");
  const runtime = Runtime.create(signal);
  let subsignal = runtime.init(); // less than 0 if submenu
  while (subsignal < 0) {
    prompt.bottom(); // cursor to bottom
    subsignal = await prompt.question("$$$ ");
    subsignal = runtime.subroutine(signal);
  }
  prompt.close();
  return subsignal;
}

module.exports = {
  handler
};
