import { SKILL_LIST } from "../consts";
import { Attributes, SkillPoints } from "../types";
import { calculateModifier } from "../utils/character";

interface SkillsSectionProps {
  attributes: Attributes;
  skillPoints: SkillPoints;
  remainingPoints: number;
  onIncrement: (skillName: string) => void;
  onDecrement: (skillName: string) => void;
}
export default function SkillsSection({
  attributes,
  skillPoints,
  remainingPoints,
  onIncrement,
  onDecrement,
}: SkillsSectionProps) {
  return (
    <section className="column">
      <h2>Skills</h2>
      <div>Total skill points available: {remainingPoints}</div>
      {SKILL_LIST.map((skill) => {
        const modifier = calculateModifier(attributes[skill.attributeModifier]);
        const totalSkillValue = skillPoints[skill.name] + modifier;
        return (
          <div key={skill.name} className="skill-row">
            <span>{skill.name}:</span>
            <button onClick={() => onDecrement(skill.name)}>-</button>
            <span>{skillPoints[skill.name]}</span>
            <button onClick={() => onIncrement(skill.name)}>+</button>
            <span>
              Modifier ({skill.attributeModifier}): {modifier}
            </span>
            <span>Total: {totalSkillValue}</span>
          </div>
        );
      })}
    </section>
  );
}
