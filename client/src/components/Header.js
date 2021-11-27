
import './Header.css'

const Header = ()=>{
    return (
        <div className="header__text">
            <div className="title__container">
                <h2> Tic Tac Toe <sup>n</sup></h2>
                <h4>Evolve your game</h4>
            </div>
            {/*Implement a leaderboard modal */}
            <a href="/" className="btn__leaderboard">Leaderboard</a>
        </div>
    )
}

export default Header;