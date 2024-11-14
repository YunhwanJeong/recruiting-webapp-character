import { ATTRIBUTE_LIST } from "../consts";
import { Attributes } from "../types";
import { calculateModifier } from "../utils/character";

interface AttributeSectionProps {
  attributes: Attributes;
  onIncrement: (attr: keyof Attributes) => void;
  onDecrement: (attr: keyof Attributes) => void;
}
export default function AttributeSection({
  attributes,
  onIncrement,
  onDecrement,
}: AttributeSectionProps) {
  return (
    <section className="column">
      <h2>Attributes</h2>
      {ATTRIBUTE_LIST.map((attribute) => (
        <div key={attribute} className="attribute-row">
          <strong>{attribute}: </strong>
          <button onClick={() => onDecrement(attribute)}>-</button>
          <span>{attributes[attribute]}</span>
          <button onClick={() => onIncrement(attribute)}>+</button>
          <span>Modifier: {calculateModifier(attributes[attribute])}</span>
        </div>
      ))}
    </section>
  );
}
