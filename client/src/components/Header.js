
import './Header.css'

const Header = ()=>{
    return (
        <div className="header__text">
            <div className="title__container">
                <h2> Tic Tac Toe <sup>n</sup></h2>
                <h4>By Stefan Kolev</h4>
            </div>
            <a href="#" className="btn__leaderboard">Leaderboard</a>
        </div>
    )
}

export default Header;