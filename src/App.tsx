import { useReducer } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts";

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

const calculateModifier = (value: number) => {
  return Math.floor((value - 10) / 2);
};

function App() {
  const [attributes, dispatch] = useReducer(reducer, initialAttributes);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <main className="App-main">
        <div className="container">
          <section className="column">
            <h2>Attributes</h2>
            {ATTRIBUTE_LIST.map((attribute) => (
              <div key={attribute}>
                <h3>{attribute}</h3>
                <button
                  onClick={() => dispatch({ type: "DECREMENT", attribute })}
                >
                  -
                </button>
                <span>{attributes[attribute]}</span>
                <button
                  onClick={() => dispatch({ type: "INCREMENT", attribute })}
                >
                  +
                </button>
                <span>
                  Modifier: {calculateModifier(attributes[attribute])}
                </span>
              </div>
            ))}
          </section>
          <section className="column">
            <h2>Classes</h2>
            {Object.keys(CLASS_LIST).map((className) => (
              <div key={className}>{className}</div>
            ))}
          </section>
          <section className="column">
            <h2>Skills</h2>
            {SKILL_LIST.map((skill) => (
              <div key={skill.name}>
                <span>{skill.name}</span>
                <span>(Modifier: {skill.attributeModifier})</span>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
