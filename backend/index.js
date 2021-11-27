const express = require('express');
const uuidv4 = require('uuid').v4;
const app = express();
const http = require('http');
const server = http.createServer(app);
var cors = require('cors');
app.use(cors())
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//Middleware
const initialzeSinglePlayerGame = (grid_size) =>{
  if(!grid_size) return null
  let boardState = new Array(grid_size).fill(' ').map(() => new Array(grid_size).fill(' '));
  return {
    boardState: boardState,
    playerTurn: 0,
  }
}

const initialzeMultiplayerGame = (grid_size) =>{
  if(!grid_size) return null
  let boardState = new Array(grid_size).fill(' ').map(() => new Array(grid_size).fill(' '));
  return {
    boardState: boardState,
    playerTurn: 0,
    currentSymbol: 'X'
  }
}


function clone(obj){
  if(obj == null || typeof(obj) != 'object')
      return obj;

  var temp = new obj.constructor(); 
  for(var key in obj)
      temp[key] = clone(obj[key]);

  return temp;
}

const findAllPossibleMoves = (boardState)=>{
  let moves= []
  for(let i = 0; i < boardState.length; i++){
    for(let j  = 0; j < boardState[0].length; j++){
      if(boardState[i][j] == ' '){
          moves.push([i,j])
      } 
    }
  }
  return moves;
}

const checkWin = (boardState)=>{
  //Check col
  let symbolCounter = 0;
  let prevSymbol;
  for(let i = 0; i < boardState.length; i++){
    prevSymbol = boardState[0][i]
    for(let j = 0; j < boardState[0].length; j++){
      if(prevSymbol == boardState[j][i] && prevSymbol != ' ') {
        symbolCounter++
      }
      prevSymbol = boardState[j][i]
    }
    if(symbolCounter == boardState.length) return {win: true, player:prevSymbol}
    symbolCounter = 0;
  }

  //Check row
  for(let i = 0; i < boardState.length; i++){
    let prevSymbol = boardState[i][0]
    for(let j = 0; j < boardState[0].length; j++){
      if(prevSymbol == boardState[i][j] && prevSymbol != ' ') {
        symbolCounter++
      }
      prevSymbol = boardState[i][j]
    }
    if(symbolCounter == boardState.length) return {win: true, player:prevSymbol}
    symbolCounter = 0;
  }

  //check left-right diag
  for(let i = 0; i < boardState.length; i++){
    let prevSymbol = boardState[0][0]
      if(prevSymbol == boardState[i][i] && prevSymbol != ' ') {
        symbolCounter++
      }
      prevSymbol = boardState[i][i]
  }
  if(symbolCounter == boardState.length) return {win: true, player:prevSymbol}
  symbolCounter = 0;

  //check right-left diag
  let x = boardState.length - 1
  for(let i = 0; i < boardState.length; i++){
      let prevSymbol = boardState[x][i]
      if(prevSymbol == boardState[x][i] && prevSymbol != ' ') {
        symbolCounter++
      }
      prevSymbol = boardState[x][i]
      x--
  }
  if(symbolCounter == boardState.length) return {win: true, player:prevSymbol}
  symbolCounter = 0;

  return {win: false}
}

//Minimax algorithm implementation
const minimax = (boardState, maxPlayer) =>{
  let game = clone(boardState)
  //Set current score
  let res = checkWin(boardState)
  let currMoves = findAllPossibleMoves(boardState)
  let score;
  if(res.win && res.player == maxPlayer) return 10
  else if(res.win) return -10
  
  if(currMoves.length == 0) return 0

  if(maxPlayer == 'X'){
    let best = -1000;
    for(let i = 0; i < game.length; i++){
      for(let j = 0; j < game[0].length; j++){
        if(game[i][j] == ' '){
          game[i][j] = maxPlayer;
          best = Math.max(best, minimax(game, 'O'))
        }
      }
    }
    return best;
  }else{
    let best = -1000;
    for(let i = 0; i < game.length; i++){
      for(let j = 0; j < game[0].length; j++){
        if(game[i][j] == ' '){
          game[i][j] = maxPlayer;
          best = Math.min(best, minimax(game, 'X'))
        }
      }
    }
    return best;
  }
}

const findBestMove = (boardState)=>{
  let currEval = -10000;
  let currMoves = findAllPossibleMoves(boardState)
  let bestMove = []
  currMoves.forEach(move =>{
    let newBoard = clone(boardState)
    let [x, y] = move
    newBoard[x][y] = 'X'
    let moveEval = minimax(newBoard, 'X')
    if(moveEval > currEval){
      moveEval = currEval
      bestMove[0] = x
      bestMove[1] = y
    }
  })
  return bestMove

}

function getActiveRooms(io) {
  // Convert map into 2D list:
  // ==> [['4ziBKG9XFS06NdtVAAAH', Set(1)], ['room1', Set(2)], ...]
  const arr = Array.from(io.sockets.adapter.rooms);
  // Filter rooms whose name exist in set:
  // ==> [['room1', Set(2)], ['room2', Set(2)]]
  const filtered = arr.filter(room => !room[1].has(room[0]))
  // Return only the room name: 
  // ==> ['room1', 'room2']
  const res = filtered.map(i => i[0]);
  return res;
}

io.on('connection', (socket) => {
  console.log("A user has connected")

  socket.on('singleplayer',(res)=>{
    let {grid_size, time_per_action} = res
    console.log("User has requested to play a singelplayer mode")
    socket.emit("initializeGame", initialzeSinglePlayerGame(grid_size))
    socket.on("move", (res)=>{
      let [x, y] = findBestMove(res.boardState)
      res.boardState[x][y] = 'O'
      socket.emit("move", res)
    })
  })

  socket.on('multiplayer', (res)=>{
    let map = ['X', 'O']
    let {grid_size, time_per_action, socketID} = res
    console.log("User has requested to play a multiplayer mode")
    let activeRooms = getActiveRooms(io)

    let room;
    if(activeRooms.length == 0){
      room = uuidv4();
    }else{
      room = activeRooms.find(room =>(io.sockets.adapter.rooms.get(room).size < 2))
      if(!room) room = uuidv4();
    }
    socket.join(room)
    console.log(room)
    socket.emit("initializeGame", {...initialzeMultiplayerGame(grid_size), game: room})
    socket.on("move", (res)=>{
      res.playerTurn = (res.playerTurn + 1) % 2
      res.currentSymbol = map[res.playerTurn]
      socket.nsp.to(room).emit("move", res)
    })
  })
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});