
import Grid from '../components/Grid.js'

import './Home.css'

const Home = ()=>{
    return (
        <div className="home__container">
            <div className="header__text">
                <h2> Tic Tac Toe <sup>n</sup></h2>
                <h4>By Stefan Kolev</h4>
            </div>
            <div className="grid__area">
                <Grid size={3}/>
            </div>
            <div className="button__area">
                <button>Single Player</button>
                <button>Multiplayer</button>
            </div>
        </div>
    );
}

export default Home;