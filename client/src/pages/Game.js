import { useEffect, useContext, useState } from 'react';
import ReactLoading from 'react-loading';
import { SocketContext } from '../context/SocketContext';

import {useHistory} from 'react-router-dom'


import Grid from '../components/Grid'
import Header from '../components/Header';

import './Game.css'

const Loading = ()=>{
    let history = useHistory()
    const [text, setText] = useState("Waiting for other player")

   // useEffect(()=>{
      //  setTimeout(()=>{
       //     setText("No match was found!")
       //     setTimeout(()=> history.push("/"), 1000)
        //}, 10000)
   // }, [])

    return(
        <div className="game__container">
            {text}
            <ReactLoading type="bubbles" color="black" height={'50%'} width={'50%'} />  
        </div>
    )
}

const Game = ()=>{
    let history = useHistory()

    const socket = useContext(SocketContext)
    if(!socket) history.push("/")

    const [gameState, setGameState] = useState(null)

            
    const makeMove = (row, col)=>{
        console.log("Making a move")
        //setGameState(() =>{
           // let newGameState = gameState
           // newGameState.boardState[row][col] = gameState.playerSymbol
           // return newGameState
       // })
       // socket.emit("move", gameState)
    }

    useEffect(()=>{
        let mounted = socket && true
        if(mounted){
            socket.on("getGameState", (res)=>{
                setGameState(res)
                console.log(res)
            })
            socket.on("move", (res)=>{
                console.log(res)
                //setGameState(res)
            })
        }
        return () => mounted = false
    }, [socket, gameState])
    return gameState &&(
        <>
        {gameState.playersOnline === 2?        
        <>
            <Header/>
            <div className="game__container">
                <div className="player_turn">{`${gameState.playerTurn === socket.id ? "Your turn" : "Other player's turn"}`}</div>
                <Grid board={gameState.boardState} active={gameState.playerTurn === socket.id} clickEvent={makeMove}></Grid>
            </div> 
        </> : <Loading/>
        }
        </>
    )
}


export default Game;