const readline = require('readline');

class Prompt {
  constructor(symbol) {
    this.symbol = symbol;
    this.rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
    });
  }
  question = (response) => {
    return new Promise((resolve, reject) => {
      this.rl.question(response + `\n${this.symbol}`, (answer) => {
	resolve(answer);
      });
    });
  }
  close = () => this.rl.close();
}

module.exports = Prompt;
