import React, { useState } from "react";
import "./App.css";

import GameScreen from "./Screens/GameScreen";

import { Router } from "@reach/router";
import HomeScreen from "./Screens/HomeScreen";
import CreateGameScreen from "./Screens/CreateGameScreen";
import JoinGameScreen from "./Screens/JoinGameScreen";
import { JoinGameData } from "./types";

const defaultJoinGameData: JoinGameData = {
  gameId: "",
  playerName: "",
};
export const JoinGameContext = React.createContext({
  joinGameData: defaultJoinGameData,
  setJoinGameData: (data: JoinGameData) => {},
});

function App() {
  const [joinGameData, setJoinGameData] = useState(defaultJoinGameData);
  return (
    <JoinGameContext.Provider
      value={{ joinGameData: joinGameData, setJoinGameData: setJoinGameData }}
    >
      <div className="App">
        <Router style={{ height: "100%" }}>
          <HomeScreen path="/" />
          <GameScreen path="/game" />
          <CreateGameScreen path="/createGame" />
          <JoinGameScreen path="/joinGame" />
        </Router>
      </div>
    </JoinGameContext.Provider>
  );
}

export default App;
