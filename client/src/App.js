import './styles.css'
import socketIO from 'socket.io-client';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import StartScreen from './components/StartScreen/StartScreen';
import Game from './components/Game/Game';
import AddQuestion from './components/Admin/AddQuestion';
import Controller from './components/Game/Controller';


function App() {

  const socket = socketIO.connect(`http://192.168.1.42:9000`, {
    path: "/socket.io",
  });
  

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<StartScreen socket={socket} />} />
        <Route path='/game' element={<Game socket={socket} />} />
        <Route path='/add' element={<AddQuestion socket={socket} />} />
        <Route path='/controller' element={<Controller socket={socket} />} />
      </Routes>
    </div>
  );
}

export default App;
