function rps(shot = null) {
    const options = ["rock", "paper", "scissors"];
    return playRPS(options, shot);
  }
  
  function rpsls(shot = null) {
    const options = ["rock", "paper", "scissors", "lizard", "spock"];
    return playRPS(options, shot);
  }
  
  function playRPS(options, shot) {
    const sim = options[Math.floor(Math.random() * options.length)];
  
    if (!shot) {
      return { player: sim };
    }
  
    const result = determineResult(options, shot, sim);
    return { player: shot, opponent: sim, result: result };
  }
  
  function determineResult(options, shot, sim) {
    const indexShot = options.indexOf(shot.toLowerCase());
    const indexSim = options.indexOf(sim);
  
    if (indexShot === indexSim) {
      return "tie";
    } else if (
      (indexShot + 1) % options.length === indexSim ||
      (indexShot + 3) % options.length === indexSim
    ) {
      return "lose";
    } else {
      return "win";
    }
  }