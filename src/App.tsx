import { useReducer, useState } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts";
import { Attributes, Class } from "./types";

type Action =
  | { type: "INCREMENT"; attribute: keyof Attributes }
  | { type: "DECREMENT"; attribute: keyof Attributes };

type SkillAction =
  | { type: "INCREMENT_SKILL"; skill: string }
  | { type: "DECREMENT_SKILL"; skill: string };

type SkillPoints = {
  [key: string]: number;
};

const initialAttributes: Attributes = ATTRIBUTE_LIST.reduce(
  (acc, attr) => ({ ...acc, [attr]: 10 }),
  {} as Attributes
);

const initialSkillPoints: SkillPoints = SKILL_LIST.reduce(
  (acc, skill) => ({ ...acc, [skill.name]: 0 }),
  {} as SkillPoints
);

const attributeReducer = (state: Attributes, action: Action): Attributes => {
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

const skillPointsReducer = (
  state: SkillPoints,
  action: SkillAction
): SkillPoints => {
  switch (action.type) {
    case "INCREMENT_SKILL":
      return { ...state, [action.skill]: state[action.skill] + 1 };
    case "DECREMENT_SKILL":
      return {
        ...state,
        [action.skill]: Math.max(0, state[action.skill] - 1),
      };
    default:
      return state;
  }
};

const calculateModifier = (value: Attributes[keyof Attributes]) => {
  return Math.floor((value - 10) / 2);
};

function App() {
  const [attributes, dispatchAttributes] = useReducer(
    attributeReducer,
    initialAttributes
  );
  const [skillPoints, dispatchSkillPoints] = useReducer(
    skillPointsReducer,
    initialSkillPoints
  );
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  // Calculate available skill points based on Intelligence modifier
  const intelligenceModifier = calculateModifier(attributes["Intelligence"]);
  const totalSkillPoints = 10 + 4 * intelligenceModifier;
  const usedSkillPoints = Object.values(skillPoints).reduce(
    (acc, points) => acc + points,
    0
  );
  const remainingSkillPoints = totalSkillPoints - usedSkillPoints;

  const meetsClassRequirements = (className: Class) => {
    const classRequirements = CLASS_LIST[className];
    return ATTRIBUTE_LIST.every(
      (attr) => attributes[attr] >= classRequirements[attr]
    );
  };

  const incrementSkill = (skillName: string) => {
    if (remainingSkillPoints > 0) {
      dispatchSkillPoints({ type: "INCREMENT_SKILL", skill: skillName });
    }
  };

  const decrementSkill = (skillName: string) => {
    dispatchSkillPoints({ type: "DECREMENT_SKILL", skill: skillName });
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
                  onClick={() =>
                    dispatchAttributes({ type: "DECREMENT", attribute })
                  }
                >
                  -
                </button>
                <span>{attributes[attribute]}</span>
                <button
                  onClick={() =>
                    dispatchAttributes({ type: "INCREMENT", attribute })
                  }
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
            {(Object.keys(CLASS_LIST) as Class[]).map((className) => (
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
                {Object.entries(CLASS_LIST[selectedClass] || {}).map(
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
            <div>Total skill points available: {remainingSkillPoints}</div>
            {SKILL_LIST.map((skill) => {
              const modifier = calculateModifier(
                attributes[skill.attributeModifier]
              );
              const totalSkillValue = skillPoints[skill.name] + modifier;
              return (
                <div key={skill.name} className="skill-row">
                  <span>{skill.name}:</span>
                  <button onClick={() => decrementSkill(skill.name)}>-</button>
                  <span>{skillPoints[skill.name]}</span>
                  <button onClick={() => incrementSkill(skill.name)}>+</button>
                  <span>
                    Modifier ({skill.attributeModifier}): {modifier}
                  </span>
                  <span>Total: {totalSkillValue}</span>
                </div>
              );
            })}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
