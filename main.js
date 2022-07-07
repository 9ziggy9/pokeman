const {pokePrint} = require('./include/pokeart.js');
const Prompt = require('./classes/prompt.js');
const {Signal,
       Command,
       Alert,
       SubSignal} = require('./classes/signal.js');

// TODO:
// multiplayer with new prompt instances?
const prompt = new Prompt();

async function run() {
  let signal = true;
  while (signal) {
    prompt.clear();
    Alert.display(); // diplay current alert queue
    const response = await prompt.question(">>> ");
    signal = Signal.handler(response).execute();
    if (signal === -1) { // Enter submenu, reading a subsignal
      let subsig = true;
      while (subsig) {
	prompt.clear();
	const subresp = await prompt.question("$$$ ");
	subsig = SubSignal.handler(subresp).execute();
      }
    }
  }
  prompt.close();
}

console.clear();
run();
