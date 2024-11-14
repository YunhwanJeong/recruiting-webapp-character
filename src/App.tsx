import { useReducer, useState } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts";
import { Attributes } from "./types";

type Action =
  | { type: "INCREMENT"; attribute: string }
  | { type: "DECREMENT"; attribute: string };

const initialAttributes: Attributes = ATTRIBUTE_LIST.reduce(
  (acc, attr) => ({ ...acc, [attr]: 10 }),
  {} as Attributes
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
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const meetsClassRequirements = (className: string) => {
    const classRequirements = CLASS_LIST[className];
    return ATTRIBUTE_LIST.every(
      (attr) => attributes[attr] >= classRequirements[attr]
    );
  };

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
              <div key={attribute} className="attribute-row">
                <strong>{attribute}: </strong>
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
              <div
                key={className}
                className={`class-item ${
                  meetsClassRequirements(className) ? "eligible" : ""
                }`}
                onClick={() => setSelectedClass(className)}
              >
                {className}
              </div>
            ))}
            {selectedClass && (
              <div className="class-requirements">
                <h3>Requirements for {selectedClass}</h3>
                {Object.entries(CLASS_LIST[selectedClass] as Attributes).map(
                  ([attr, value]) => (
                    <div key={attr}>
                      {attr}: {value}
                    </div>
                  )
                )}
              </div>
            )}
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
