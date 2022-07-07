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
      case 'menu': return new SubSignal("Submenu");
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
  static display() {
    Alert.queue.forEach(alert => {
      console.log(alert);
    });
  }
  execute() {
    Alert.queue.push(this.msg);
    return this.signal;
  }
}

class SubSignal extends Signal {
  constructor(string) {
    super(string);
    this.string = string;
    this.signal = -1;
  }
  static handler(signal) {
    switch(signal) {
      case 'quit': return new Command("kill");
      case 'hello': return new Command("Hello, world2");
      default:
	console.log(signal);
	return signal;
    }
  }
  execute() {
    return this.signal;
  }
}

module.exports = {
  Signal,
  Command,
  Alert,
  SubSignal
};
