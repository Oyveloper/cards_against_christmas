import React from "react";
import "./App.css";

import GameScreen from "./Screens/GameScreen";

function App() {
  return (
    <div className="App">
      <GameScreen id="123" playerName="Bob" />
    </div>
  );
}

export default App;
