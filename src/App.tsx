import React, { useState } from "react";
import BodyCard from "./components/BodyCard";
import "./App.css";

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);

  return (
    <div className="App">
      <div className="appContent">
        <div className="appHeader">
          <h1>Clouds.AI</h1>
          <h3>Identify any cloud, with just a photo!</h3>
        </div>
        <BodyCard />
      </div>
    </div>
  );
}

export default App;
