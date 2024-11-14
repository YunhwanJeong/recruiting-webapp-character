import { useState } from "react";
import "./App.css";

type Action =
  | { type: "INCREMENT"; attribute: string }
  | { type: "DECREMENT"; attribute: string };

type Attributes = {
  [key: string]: number;
};

function App() {
  const [num, setNum] = useState<number>(0);
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div>
          Value:
          {num}
          <button>+</button>
          <button>-</button>
        </div>
      </section>
    </div>
  );
}

export default App;
