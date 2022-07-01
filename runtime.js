function commandHandler (cmd) {
  switch(cmd) {
    case 'quit': return false;
    default:
      console.log(cmd);
      return cmd;
  }
}

module.exports = {
  commandHandler
};
