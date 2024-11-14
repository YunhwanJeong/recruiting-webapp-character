import { useState } from "react";
import "./App.css";
import AttributeSection from "./components/AttributeSection";
import ClassSection from "./components/ClassSection";
import SkillCheck from "./components/SkillCheck";
import SkillsSection from "./components/SkillsSection";
import { ATTRIBUTE_LIST, SKILL_LIST } from "./consts";
import type { Attributes, Class, SkillCheckResult, SkillPoints } from "./types";
import {
  calculateModifier,
  calculateTotalSkillPoints,
  calculateUsedSkillPoints,
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
      setAttributes((prev) => ({ ...prev, [attribute]: prev[attribute] + 1 }));
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
      setSkillPoints((prev) => ({ ...prev, [skillName]: prev[skillName] + 1 }));
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
          <SkillCheck
            selectedSkill={selectedSkill}
            difficultyClass={difficultyClass}
            rollResult={rollResult}
            onSkillSelect={setSelectedSkill}
            onDifficultyChange={setDifficultyClass}
            onRoll={handleSkillCheck}
          />
          <AttributeSection
            attributes={attributes}
            onIncrement={handleIncrementAttribute}
            onDecrement={handleDecrementAttribute}
          />
          <ClassSection
            attributes={attributes}
            selectedClass={selectedClass}
            onClassSelect={setSelectedClass}
          />
          <SkillsSection
            attributes={attributes}
            skillPoints={skillPoints}
            remainingPoints={remainingSkillPoints}
            onIncrement={handleIncrementSkill}
            onDecrement={handleDecrementSkill}
          />
        </div>
      </main>
    </div>
  );
}
