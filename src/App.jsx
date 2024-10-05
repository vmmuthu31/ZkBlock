import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Game from "./Pages/Game.jsx";
import MainLobby from "./Components/Widgets/MainLobby.jsx";
import MarketPlace from "./Pages/MarketPlace.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby" element={<MainLobby />} />
        <Route path="/game" element={<Game />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
