function create(signal) {
  switch (signal)  {
  case "quit":
    return new Quit();
  case "welcome":
    return new Welcome();
  case "help":
    return new Help();
  default:
    console.log("PANICKING!");
    return false;
  }
}

// TODO: Menu abstraction to print in a standardized way
class Menu {
  constructor() {
    this._signal = true;
    this._keys = false;
  }
  message() {
    // TODO: more robot templating system
    Object.entries(this)
      .filter(pair => !pair[0].startsWith('_'))
      .map(pair => console.log(`${this._keys ? pair[0] + ": " : ""}${pair[1]}`));
    console.log('\n\n');
  }
  init() {
    this.message();
    return this._signal;
  }
}

class Quit extends Menu {
  constructor() {
    super();
    this.thanks = "Thank you for playing!";
    this.goodbye = "Goodbye!";
    this._signal = false;
  }
}

class Help extends Menu {
  constructor() {
    super();
    this.welcome = "Just a welcome menu.";
    this.help = "You're currently receiving help!";
    this.quit = "Leave the game.";
    this._signal = true;
    this._keys = true;
  }
}

// class Welcome extends Menu {
//   constructor() {
//     super();
//     this.header = "---- POKEMANS ----";
//     this.msg = "Welcome to our Pokemans game!";
//     this.help = "Type 'help' for set of commands";
//   }
// }

module.exports = {
  create
};
