import { SKILL_LIST } from "../consts";
import { SkillCheckResult } from "../types";

interface SkillCheckProps {
  selectedSkill: string;
  difficultyClass: number;
  rollResult: SkillCheckResult | null;
  onSkillSelect: (skill: string) => void;
  onDifficultyChange: (dc: number) => void;
  onRoll: () => void;
}

export default function SkillCheck({
  selectedSkill,
  difficultyClass,
  rollResult,
  onSkillSelect,
  onDifficultyChange,
  onRoll,
}: SkillCheckProps) {
  return (
    <section className="column-full">
      <h2>Skill Check</h2>
      <label>
        Select Skill:
        <select
          value={selectedSkill}
          onChange={(e) => onSkillSelect(e.target.value)}
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
          onChange={(e) => onDifficultyChange(Number(e.target.value))}
        />
      </label>
      <button onClick={onRoll}>Roll</button>
      {rollResult && (
        <p>
          {rollResult.roll}, Total: {rollResult.total} -{" "}
          {rollResult.success ? "Success" : "Failure"}
        </p>
      )}
    </section>
  );
}
