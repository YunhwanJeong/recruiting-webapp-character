import { useState } from "react";
import "./App.css";
import { AttributeSection } from "./components/AttributeSection";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts";
import type { Attributes, Class, SkillCheckResult, SkillPoints } from "./types";
import {
  calculateModifier,
  calculateTotalSkillPoints,
  calculateUsedSkillPoints,
  meetsClassRequirements,
  performSkillCheck,
} from "./utils/character";

const initialAttributes: Attributes = ATTRIBUTE_LIST.reduce(
  (acc, attr) => ({ ...acc, [attr]: 10 }),
  {} as Attributes
);

const initialSkillPoints: SkillPoints = SKILL_LIST.reduce(
  (acc, skill) => ({ ...acc, [skill.name]: 0 }),
  {} as SkillPoints
);

export default function App() {
  const [attributes, setAttributes] = useState<Attributes>(initialAttributes);
  const [skillPoints, setSkillPoints] =
    useState<SkillPoints>(initialSkillPoints);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [difficultyClass, setDifficultyClass] = useState<number>(0);
  const [rollResult, setRollResult] = useState<SkillCheckResult | null>(null);

  const intelligenceModifier = calculateModifier(attributes.Intelligence);
  const totalSkillPoints = calculateTotalSkillPoints(intelligenceModifier);
  const usedSkillPoints = calculateUsedSkillPoints(skillPoints);
  const remainingSkillPoints = totalSkillPoints - usedSkillPoints;

  const handleIncrementAttribute = (attribute: keyof Attributes) => {
    const totalPoints = Object.values(attributes).reduce(
      (sum, val) => sum + val,
      0
    );
    if (totalPoints < 70) {
      setAttributes((prev) => ({
        ...prev,
        [attribute]: prev[attribute] + 1,
      }));
    }
  };

  const handleDecrementAttribute = (attribute: keyof Attributes) => {
    setAttributes((prev) => ({
      ...prev,
      [attribute]: Math.max(0, prev[attribute] - 1),
    }));
  };

  const handleIncrementSkill = (skillName: string) => {
    if (remainingSkillPoints > 0) {
      setSkillPoints((prev) => ({
        ...prev,
        [skillName]: prev[skillName] + 1,
      }));
    }
  };

  const handleDecrementSkill = (skillName: string) => {
    setSkillPoints((prev) => ({
      ...prev,
      [skillName]: Math.max(0, prev[skillName] - 1),
    }));
  };

  const handleSkillCheck = () => {
    if (selectedSkill) {
      const result = performSkillCheck(
        selectedSkill,
        attributes,
        skillPoints,
        difficultyClass
      );
      if (result) setRollResult(result);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <main className="App-main">
        <div className="container">
          <section className="column-full">
            <h2>Skill Check</h2>
            <label>
              Select Skill:
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
              >
                <option value="">Select Skill</option>
                {SKILL_LIST.map((skill) => (
                  <option key={skill.name} value={skill.name}>
                    {skill.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Difficulty Class (DC):
              <input
                type="number"
                value={difficultyClass}
                onChange={(e) => setDifficultyClass(Number(e.target.value))}
              />
            </label>
            <button onClick={handleSkillCheck}>Roll</button>
            {rollResult && (
              <p>
                {rollResult.roll}, Total: {rollResult.total} -{" "}
                {rollResult.success ? "Success" : "Failure"}
              </p>
            )}
          </section>
          <AttributeSection
            attributes={attributes}
            onIncrement={handleIncrementAttribute}
            onDecrement={handleDecrementAttribute}
          />
          <section className="column">
            <h2>Classes</h2>
            {(Object.keys(CLASS_LIST) as Class[]).map((className) => (
              <div
                key={className}
                className={`class-item ${
                  meetsClassRequirements(attributes, className)
                    ? "eligible"
                    : ""
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
                  <button onClick={() => handleDecrementSkill(skill.name)}>
                    -
                  </button>
                  <span>{skillPoints[skill.name]}</span>
                  <button onClick={() => handleIncrementSkill(skill.name)}>
                    +
                  </button>
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
