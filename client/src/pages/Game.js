import { useEffect, useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

import {useHistory} from 'react-router-dom'


import Grid from '../components/Grid'
import Header from '../components/Header';

import './Game.css'

const Game = ()=>{
    let history = useHistory()

    const socket = useContext(SocketContext)
    const [gameState, setGameState] = useState(null)

            
    const makeMove = (row, col, setState)=>{
        setGameState(() =>{
            let newGameState = gameState
            newGameState.boardState[row][col] = gameState.symbol
            return newGameState
        })
        socket.emit("move", gameState)
    }

    useEffect(()=>{
        socket.on("initializeGame", (res)=>{
            setGameState(res)
        })
        socket.on("move", (res)=>{
            setGameState(res)
        })
    }, [socket])

    return gameState &&(
        <>
        <Header/>
        <div className="game__container">
            <div className="player_turn">{`${gameState.playerTurn === 0 ? "Your turn" : "AI's turn"}`}</div>
            <Grid board={gameState} active={gameState.playerTurn === 0} clickEvent={makeMove}></Grid>
        </div>
        </>
    )
}


export default Game;