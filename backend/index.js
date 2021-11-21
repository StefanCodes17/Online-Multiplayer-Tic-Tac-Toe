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

const findAllPossibleMoves = (boardState)=>{
  let moves= []
  for(let i = 0; i < boardState.length; i++){
    for(let j  = 0; i < boardState[0].length; j++){
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
  for(let i = 0; i < boardState.length; i++){
    let prevSymbol = boardState[0][i]
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
const minimax = (boardState, depth, maxPlayer) =>{
    console.log(boardState)
    //Set current score
    let res = checkWin(boardState)
    let currMoves = findAllPossibleMoves(boardState)
    let score;
    if(res.win && res.player == maxPlayer) return 10
    else if(res.win) return -10
    
    if(currMoves.length == 0) return 0

    if(maxPlayer == 'X'){
      let best = -1000;
      for(let i = 0; i < boardState.length; i++){
        for(let j = 0; j < boardState[0].length; j++){
          if(boardState[i][j] == ' '){
            boardState[i][j] = maxPlayer;
            best = Math.max(best, minimax(boardState, depth + 1, 'O'))
          }
        }
      }
      return best;
    }else{
      let best = -1000;
      for(let i = 0; i < boardState.length; i++){
        for(let j = 0; j < boardState[0].length; j++){
          if(boardState[i][j] == ' '){
            boardState[i][j] = maxPlayer;
            best = Math.min(best, minimax(boardState, depth + 1, 'X'))
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
  for(move in currMoves){
    let x, y = move
    boardState[x][y] == maxPlayer
    let moveEval = minimax(boardState, 0, 'X')
    if(moveEval > currEval){
      moveEval = currEval
      bestMove[0] = x
      bestMove[1] = y
    }
  }
  return bestMove
}

io.on('connection', (socket) => {
  console.log("A user has connected")
  socket.on('singleplayer',(res)=>{
    let {grid_size, time_per_action} = res
    console.log("User has requested to play a singelplayer mode")
    socket.emit("initializeGame", initialzeSinglePlayerGame(grid_size))
    socket.on("move", (res)=>{
      let i = Math.floor(Math.random() * (res.boardState.length))
      let j = Math.floor(Math.random() * (res.boardState.length))
      //console.log(i, j)
      //res.boardState[i][j] = 'O'
      //console.log(res.boardState)
      console.log(minimax(res.boardState, 0, 'X'))
      socket.emit("move", res)
    })
  })
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});