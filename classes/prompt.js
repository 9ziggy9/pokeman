const readline = require('readline');

class Prompt {
  constructor() {
    this.rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	removeHistoryDuplicates: true
    });
  }
  question = (response) => {
    return new Promise((resolve, reject) => {
      this.rl.question(response, (answer) => {
	resolve(answer);
      });
    });
  }
  close = () => this.rl.close();
  // Moves prompt to bottom of TTY
  top = () => readline.cursorTo(process.stdout, 0, 0);
  bottom = () => readline.cursorTo(process.stdout, 0, process.stdout.rows);
  pause = async () => await this.rl.pause();
}

module.exports = Prompt;
