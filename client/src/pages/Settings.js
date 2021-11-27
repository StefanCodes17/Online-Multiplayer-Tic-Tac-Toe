import {useState, useContext} from 'react'
import { SocketContext } from '../context/SocketContext';

//React Router
import {useHistory} from 'react-router-dom'

//Components
import Header from '../components/Header';
import Button from '../components/Button'
import Grid from '../components/Grid'

//Utils
import { GenerateTemplateBoard } from '../utils/GridUtils';

import './Settings.css'

const Settings = (props)=>{

    let history = useHistory()
    const socket = useContext(SocketContext)

    const [formState, setFormState] = useState({
        grid_size: 3,
        time_per_action: 2,
    })

    const selectChangeHandler = (e)=>{
        const newFormData = {
            ...formState,
            [e.target.name] : parseInt(e.target.value)
        }
        setFormState(newFormData)
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        let gameMode = window.location.pathname.split('/')[2]
        socket.emit(gameMode, formState)
        //history.push(f`/${gameMode}/2`)
    }

    return (
        <div className="settings__container">
            <Header/>
            <div className="game__viewer">
                <div className="settings__panel">
                    <h3 className="sub__header">Settings</h3>
                        <form onSubmit={(e) => submitHandler(e)}>
                            <label>Choose Degree of Tic Tac Toe</label>
                            <select name="grid_size" onChange={(e) => selectChangeHandler(e)} value={formState['grid_size']}> 
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                            <label>Time Per Action</label>
                            <select name="time_per_action" onChange={(e) => selectChangeHandler(e)} value={formState['time_per_action']}>
                                <option value="2">2 sec</option>
                                <option value="5">5 sec</option>
                                <option value="8">8 sec</option>
                                <option value="10">10 sec</option>
                            </select>
                            <Button text="Start Game" />
                        </form>
                </div>
                <div className="game__showcase">
                    <Grid board={GenerateTemplateBoard(formState['grid_size'])}/>
                </div>
            </div>
        </div>
    );
}

export default Settings;