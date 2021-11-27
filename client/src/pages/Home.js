//Components
import Grid from '../components/Grid.js'
import Header from '../components/Header'
import Button from '../components/Button'

//React Router
import {Link} from 'react-router-dom'

import './Home.css'
import { GenerateTemplateBoard } from '../utils/GridUtils.js'

const Home = ()=>{
    return (
        <div className="home__container">
            <Header/>
            <div className="grid__area">
                <Grid board={GenerateTemplateBoard()}/>
            </div>
            <div className="button__area">
               <Link to="/settings/singleplayer"><Button text="Single Player"/></Link>
               <Link to="/settings/multiplayer"><Button text="Multiplayer"/></Link>
            </div>
        </div>
    );
}

export default Home;