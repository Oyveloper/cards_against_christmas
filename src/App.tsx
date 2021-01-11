import React from "react";
import "./App.css";

import GameScreen from "./Screens/GameScreen";

import { Router, RouteComponentProps, Link } from "@reach/router";

const Home = (props: RouteComponentProps) => (
  <div>
    <h1>Cards against Christmas</h1>
    <Link to="/game">Game</Link>
  </div>
);

function App() {
  return (
    <div className="App">
      <Router style={{ height: "100%" }}>
        <Home path="/" />
        <GameScreen path="/game" />
      </Router>
    </div>
  );
}

export default App;
