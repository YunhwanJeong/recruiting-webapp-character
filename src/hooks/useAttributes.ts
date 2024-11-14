import { useState } from "react";
import { ATTRIBUTE_LIST } from "../consts";
import { Attributes } from "../types";

const initialAttributes: Attributes = ATTRIBUTE_LIST.reduce(
  (acc, attr) => ({ ...acc, [attr]: 10 }),
  {} as Attributes
);

export const useAttributes = () => {
  const [attributes, setAttributes] = useState<Attributes>(initialAttributes);

  const incrementAttribute = (attribute: keyof Attributes) => {
    const totalPoints = Object.values(attributes).reduce(
      (sum, val) => sum + val,
      0
    );

    if (totalPoints >= 70) {
      alert("Maximum points (70) reached! You cannot add more points.");
      return;
    }

    setAttributes((prev) => ({ ...prev, [attribute]: prev[attribute] + 1 }));
  };

  const decrementAttribute = (attribute: keyof Attributes) => {
    setAttributes((prev) => ({
      ...prev,
      [attribute]: Math.max(0, prev[attribute] - 1),
    }));
  };

  return {
    attributes,
    incrementAttribute,
    decrementAttribute,
  };
};
