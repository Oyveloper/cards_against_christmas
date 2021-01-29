import React from "react";
import ReactDOM from "react-dom";
import App from "../App";

it("renders correctly", () => {
  const div = document.createAttribute("div");
  ReactDOM.render(<App />, div);
});
