import { useEffect, useContext, useState } from 'react';
import ReactLoading from 'react-loading';
import { SocketContext } from '../context/SocketContext';

import {useHistory, Link} from 'react-router-dom'


import Grid from '../components/Grid'
import Header from '../components/Header';
import Button from '../components/Button'

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

const ResultsModal = ({playerWin, tie})=> {
    const socket = useContext(SocketContext)
    return(
        <div className='modal__container'>
            <div className='modal__text'>
                <h1>{playerWin === socket.id ? "You win!" : tie ? "It's a tie!" : "You lost!" }</h1>
                <div className='btn__display'>
                <Link to="/"><Button text="Home"/></Link>
                </div>
            </div>
        </div>
    )
}

const Game = ()=>{
    let history = useHistory()

    const socket = useContext(SocketContext)
    if(!socket) history.push("/")

    const [gameState, setGameState] = useState(null)

    useEffect(()=>{
        let mounted = socket && true
        if(mounted){
            socket.on("getGameState", (res)=>{
                setGameState(res)
            })
        }
        return () => mounted = false
    }, [socket, gameState])

            
    const makeMove = (row, col)=>{
        socket.emit("move", {...gameState, row, col})
    }

    return gameState &&(
        <>
        {gameState.playersOnline === 2?        
        <>
            <Header/>
            <div className="game__container">
                <div className="player_turn">{`${gameState.playerTurn === socket.id ? "Your turn" : "Opponent's turn"}`}</div>
                <Grid board={gameState.boardState} active={!gameState.win && gameState.playerTurn === socket.id} clickEvent={makeMove}></Grid>
            </div> 
            {gameState.win && <ResultsModal playerWin = {gameState.playerWin} tie={gameState.tie}/>}
        </> : <Loading/>
        }
        </>
    )
}


export default Game;