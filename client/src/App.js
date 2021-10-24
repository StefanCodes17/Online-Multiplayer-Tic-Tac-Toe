import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './pages/Home.js'
import GameRenderer from './pages/GameRenderer'

function App() {
  return (
    <div className="App">
       <Router>
        <Switch>
           <Route path="/settings"><GameRenderer/></Route>
           <Route path="/"> <Home/> </Route>
        </Switch>
       </Router>
    </div>
  );
}

export default App;
