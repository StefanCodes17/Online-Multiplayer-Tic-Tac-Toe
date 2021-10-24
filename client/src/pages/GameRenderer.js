import {useState} from 'react'

import Header from '../components/Header';
import Button from '../components/Button'
import Grid from '../components/Grid'
import './GameRenderer.css'

const GameRenderer = ()=>{

    const [formState, setFormState] = useState({
        grid_size: 4,
        time_per_action: 2
    })

    const selectChangeHandler = (e)=>{
        const newFormData = {
            ...formState,
            [e.target.name] : e.target.value
        }
        setFormState(newFormData)
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        console.log(formState);
    }

    return (
        <div className="gamerend__container">
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
                    <Grid size={formState['grid_size']} />
                </div>
            </div>
        </div>
    );
}

export default GameRenderer;