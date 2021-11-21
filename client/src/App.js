import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {SocketProvider} from './context/SocketContext';
import Home from './pages/Home.js'
import GameRenderer from './pages/Settings'
import Game from './pages/Game'

import './App.css';


function App() {
  return (
    <SocketProvider>
      <div className="App">
       <Router>
        <Switch>
           <Route path="/settings"><GameRenderer/></Route>
           <Route path="/single/:id"><Game/></Route>
           <Route path="/"> <Home/> </Route>
        </Switch>
       </Router>
    </div>
    </SocketProvider>
  );
}

export default App;
