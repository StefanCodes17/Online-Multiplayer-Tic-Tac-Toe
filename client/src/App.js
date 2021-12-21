import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//Socket.io
import {SocketProvider} from './context/SocketContext';

//Pages
import Home from './pages/Home.js'
import Settings from './pages/Settings'
import Game from './pages/Game'

import './App.css';


function App() {
  return (
    <SocketProvider>
      <div className="App">
       <Router>
        <Switch>
           <Route path="/settings"><Settings/></Route>
           <Route path="/singleplayer/:id"><Game/></Route>
           <Route path="/multiplayer/:id"><Game/></Route>
           <Route path="/"> <Home/> </Route>
        </Switch>
       </Router>
    </div>
    </SocketProvider>
  );
}

export default App;
