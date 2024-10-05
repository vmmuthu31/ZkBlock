import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
// import Lobby from "./Pages/Lobby";
import NotFound from "./Pages/NotFound";
// import Game from "./Pages/Game";
import Game from "./GameComponents/Game.jsx";
import Lobby from "./GameComponents/Lobby.jsx";
import Home from "./GameComponents/Home.jsx";
import NotFound from "./GameComponents/NotFound.jsx";
import MainLobby from  "./Widgets/MainLobby.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby" element={<MainLobby />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
