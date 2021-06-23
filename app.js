var express = require("express");
var app = express();
const client = require("./pgconnection.js");
const RockPaperScissor = require("./RockPaperScissor.js");
const bodyParser = require("body-parser");

//Used to parse json objects
app.use(bodyParser.json());

//used to initiate nodejs js server at port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

//used to connect to postgresql database
client.connect();

// Handle post request and send response in JSON Format
// Save data to the database
// Change value1 and value2 respectively for post request through CMD
// curl -d '{"name":"value1", "move":"value2"}' -H "Content-Type: application/json" -X POST http://localhost:3000/play
app.post("/play", (req, res) => {
  const playerRequest = req.body;
  console.log("playerRequest", req.body);
  const match = new RockPaperScissor(req.body);
  const gameResult = match.compete();
  const timeStamp = match.timestamp.toString();
  let insertQuery = `insert into rockpaperscissors( name, move, name2,move2, winner,timestamp) 
                       values( '${playerRequest.name}', '${playerRequest.move}','${gameResult.moves[1].name}','${gameResult.moves[1].move}','${gameResult.result}', '${timeStamp}')`;
  client.query(insertQuery, (error, results) => {
    if (error) {
      console.log(error);
    }
    res.status(200).json(gameResult);
  });

  client.end;
});

// Handle get request and send response in JSON Format
// Retrieve data from the database
//Format http://localhost:3000/history/3/1
// 3 = Number of Entries required (required integer)
// 1 = Starting entry number (optional)

app.get("/history/:limit/:offset?", (req, res) => {
  const Offset = req.params.offset || 0;
  const Limit = req.params.limit || 5;
  //Send a formatted query and display results from Postgresql database
  client.query(
    `SELECT name, move, name2, move2, winner, "timestamp"
	FROM public.rockpaperscissors LIMIT ${Limit} OFFSET ${Offset};`,
    (err, result) => {
      if (!err) {
        const sendResult = {
          total_number_of_games: result.rowCount,
          Pagination:
            "From " +
            Number(Offset + 1) +
            " - To: " +
            (Number(Offset) + Number(result.rowCount)),
          moves: result.rows,
        };
        res.send(sendResult);
      }
    }
  );
  client.end;
});

module.exports = app;
