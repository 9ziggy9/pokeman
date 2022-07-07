class Signal {
  constructor(string) {
    const exitMsg = "Thank you for playing!";
    this.msg = string === "kill" ? exitMsg : string;
    this.signal = string !== "kill";
  }
  static handler(signal) {
    switch(signal) {
      case 'quit': return new Command("kill");
      case 'hello': return new Command("Hello, world");
      case 'clear': return new Command("");
      case 'alert': return new Alert("Alert, test!");
      default:
	console.log(signal);
	return signal;
    }
  }
}

class Command extends Signal {
  constructor(string) {
    super(string);
  }
  execute() {
    console.clear();
    console.log(this.msg);
    return this.signal;
  }
}

class Alert extends Signal {
  constructor(string) {
    super(string);
  }
  static queue = [];
  execute() {
    console.clear();
    console.log(this.msg);
    return this.signal;
  }
}

module.exports = {
  Signal,
  Command,
  Alert
};
