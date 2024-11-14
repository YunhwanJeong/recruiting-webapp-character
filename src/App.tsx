import { useReducer } from "react";
import "./App.css";
import { ATTRIBUTE_LIST } from "./consts";

type Action =
  | { type: "INCREMENT"; attribute: string }
  | { type: "DECREMENT"; attribute: string };

type Attributes = {
  [key: string]: number;
};

const initialAttributes: Attributes = ATTRIBUTE_LIST.reduce(
  (acc, attr) => ({ ...acc, [attr]: 10 }),
  {}
);

const reducer = (state: Attributes, action: Action): Attributes => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, [action.attribute]: state[action.attribute] + 1 };
    case "DECREMENT":
      return {
        ...state,
        [action.attribute]: Math.max(0, state[action.attribute] - 1),
      };
    default:
      return state;
  }
};

function App() {
  const [attributes, dispatch] = useReducer(reducer, initialAttributes);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section"></section>
    </div>
  );
}

export default App;
