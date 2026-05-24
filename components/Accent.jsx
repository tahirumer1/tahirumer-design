import { Fragment } from "react";

/**
 * Renders a string, turning *phrases wrapped in asterisks* into accent <em> highlights.
 * e.g. "I make them *work*." → I make them <em>work</em>.
 */
export default function Accent({ children }) {
  const parts = String(children || "").split(/\*([^*]+)\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <em key={i}>{part}</em> : <Fragment key={i}>{part}</Fragment>
  );
}
