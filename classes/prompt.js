const readline = require('readline');

class Prompt {
  constructor(symbol, response) {
    this.symbol = symbol;
    this.response = response;
    this.rl = readline;
  }
  static rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  static close = () => Prompt.rl.close();

  question = () => {
    return new Promise((resolve, reject) => {
      Prompt.rl.question(this.symbol, (answer) => {
	console.log(this.response);
	console.log(answer);
	resolve();
      });
    });
  }
}

module.exports = Prompt;
