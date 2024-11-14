import "./App.css";
import { useAttributes } from "./hooks/useAttributes";
import { useCharacterClass } from "./hooks/useCharacterClass";
import { useSkillCheck } from "./hooks/useSkillCheck";
import { useSkills } from "./hooks/useSkills";

import AttributeSection from "./components/AttributeSection";
import ClassSection from "./components/ClassSection";
import SkillCheck from "./components/SkillCheck";
import SkillsSection from "./components/SkillsSection";

export default function App() {
  const { attributes, incrementAttribute, decrementAttribute } =
    useAttributes();

  const { skillPoints, remainingSkillPoints, incrementSkill, decrementSkill } =
    useSkills(attributes);

  const {
    selectedSkill,
    difficultyClass,
    rollResult,
    setSelectedSkill,
    setDifficultyClass,
    handleSkillCheck,
  } = useSkillCheck(attributes, skillPoints);

  const { selectedClass, setSelectedClass } = useCharacterClass();

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
            onIncrement={incrementAttribute}
            onDecrement={decrementAttribute}
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
            onIncrement={incrementSkill}
            onDecrement={decrementSkill}
          />
        </div>
      </main>
    </div>
  );
}
