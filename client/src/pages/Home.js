
//Components
import Grid from '../components/Grid.js'
import Header from '../components/Header'
import Button from '../components/Button'
import {Link} from 'react-router-dom'

import './Home.css'

const Home = ()=>{
    return (
        <div className="home__container">
            <Header/>
            <div className="grid__area">
                <Grid size={3} temp={true}/>
            </div>
            <div className="button__area">
               <Link to="/settings"><Button text="Single Player"/></Link>
                <Button text="Multiplayer"/>
            </div>
        </div>
    );
}

export default Home;