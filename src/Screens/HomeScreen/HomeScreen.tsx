import React from "react";
import { Link, RouteComponentProps } from "@reach/router";
import "./HomeScreen.css";

export default function HomeScreen(props: RouteComponentProps) {
  return (
    <div className="HomeScreen">
      <div id="HomeScreenContentContainer">
        <h1>Cards Against Christmas</h1>
        <button className="main" style={{ marginTop: "10px" }}>
          <Link to="/joinGame">Join a game</Link>
        </button>
        <button className="main" style={{ marginTop: "10px" }}>
          <Link to="/createGame">Create a game</Link>
        </button>
      </div>
    </div>
  );
}
