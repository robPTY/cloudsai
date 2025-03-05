import React, { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import BodyCard from "./components/BodyCard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="appContent">
        <div className="appHeader">
          <h1>Clouds.AI</h1>
          <h3>Identify any cloud, with just a photo!</h3>
        </div>
        <BodyCard />
        <Analytics />
      </div>
    </div>
  );
}

export default App;
