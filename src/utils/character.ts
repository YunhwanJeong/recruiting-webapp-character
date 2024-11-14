import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "../consts";
import { Attributes, Class, SkillPoints } from "../types";

export const calculateModifier = (value: number): number => {
  return Math.floor((value - 10) / 2);
};

export const calculateTotalSkillPoints = (
  intelligenceModifier: number
): number => {
  return 10 + 4 * intelligenceModifier;
};

export const calculateUsedSkillPoints = (skillPoints: SkillPoints): number => {
  return Object.values(skillPoints).reduce((acc, points) => acc + points, 0);
};

export const meetsClassRequirements = (
  attributes: Attributes,
  className: Class
): boolean => {
  const classRequirements = CLASS_LIST[className];
  return ATTRIBUTE_LIST.every(
    (attr) => attributes[attr] >= classRequirements[attr]
  );
};

export const performSkillCheck = (
  skillName: string,
  attributes: Attributes,
  skillPoints: SkillPoints,
  difficultyClass: number
) => {
  const skill = SKILL_LIST.find((s) => s.name === skillName);
  if (!skill) return null;

  const modifier = calculateModifier(attributes[skill.attributeModifier]);
  const roll = Math.floor(Math.random() * 20) + 1;
  const total = roll + modifier + (skillPoints[skillName] || 0);

  return {
    roll,
    total,
    success: total >= difficultyClass,
  };
};
