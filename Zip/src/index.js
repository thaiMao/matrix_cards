import React from "react";
import ReactDOM from "react-dom";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import App from "./app";

var mountNode = document.getElementById("app");
ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    <App />
  </DndProvider>,
  mountNode,
);
