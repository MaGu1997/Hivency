module.exports = function RockPaperScissor(playerRequest) {
  this.moves = ["rock", "paper", "scissors"];
  this.timestamp = new Date().getTime();
  let player = {
    name: playerRequest.name,
    move: playerRequest.move,
  };
  let bot = {
    name: "Bot",
    move: this.moves[Math.floor(Math.random() * this.moves.length)],
  };

  let gameResult = {
    moves: [],
    result: "",
  };
  gameResult.moves.push(player, bot);
  this.compete = function () {
    gameResult.result = this.getWinner(player.move, bot.move, player.name);
    return gameResult;
  };

  this.getWinner = function (playerMove, botMove, playerName) {
    let winner = "";
    if (playerMove === botMove) {
      winner = "Draw";
    } else if (playerMove === "rock") {
      if (botMove === "paper") {
        winner = "Bot" + " wins";
      } else {
        winner = `${playerName}` + " wins";
      }
    } else if (playerMove === "paper") {
      if (botMove === "scissors") {
        winner = "Bot" + " wins";
      } else {
        winner = `${playerName}` + "wins";
      }
    } else if (playerMove === "scissors") {
      if (botMove === "rock") {
        winner = "Bot" + " wins";
      } else {
        winner = `${playerName}` + " wins";
      }
    } else {
      console.log("Something went wrong. Please try again.");
    }
    return winner;
  };
};
