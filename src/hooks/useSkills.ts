import { useState } from "react";
import { SKILL_LIST } from "../consts";
import { Attributes, SkillPoints } from "../types";
import {
  calculateModifier,
  calculateTotalSkillPoints,
  calculateUsedSkillPoints,
} from "../utils/character";

const initialSkillPoints: SkillPoints = SKILL_LIST.reduce(
  (acc, skill) => ({ ...acc, [skill.name]: 0 }),
  {} as SkillPoints
);

export const useSkills = (attributes: Attributes) => {
  const [skillPoints, setSkillPoints] =
    useState<SkillPoints>(initialSkillPoints);

  const intelligenceModifier = calculateModifier(attributes.Intelligence);
  const totalSkillPoints = calculateTotalSkillPoints(intelligenceModifier);
  const usedSkillPoints = calculateUsedSkillPoints(skillPoints);
  const remainingSkillPoints = totalSkillPoints - usedSkillPoints;

  const incrementSkill = (skillName: string) => {
    if (remainingSkillPoints > 0) {
      setSkillPoints((prev) => ({ ...prev, [skillName]: prev[skillName] + 1 }));
    }
  };

  const decrementSkill = (skillName: string) => {
    setSkillPoints((prev) => ({
      ...prev,
      [skillName]: Math.max(0, prev[skillName] - 1),
    }));
  };

  return {
    skillPoints,
    remainingSkillPoints,
    incrementSkill,
    decrementSkill,
  };
};
