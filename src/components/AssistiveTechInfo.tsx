import { Emoji } from "../App";
import { Card } from "./MemoryCard";

interface AssistiveTechInfoProps {
  emojisData: Emoji[];
  matchedCards: Card[];
}

export default function AssistiveTechInfo({emojisData, matchedCards}: AssistiveTechInfoProps) {
  return (
    //  
    <section className="sr-only" aria-atomic="true" aria-live="polite"> 
      <h2>Game status</h2>
      <p>Number of matched pairs: {matchedCards.length / 2}</p>
      <p>Number of cards left to match: {emojisData.length - matchedCards.length}</p>
    </section>
  );
}
