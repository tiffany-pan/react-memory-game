import { decodeEntity } from "html-entities";
import { Emoji } from "../App";
import { type Card } from "./MemoryCard";

interface EmojiButtonProps {
  emoji: Emoji;
  handleClick: () => void;
  selectedCardEntry?: Card;
  matchedCardEntry?: Card;
  index: number;
}

export default function EmojiButton({emoji, handleClick, selectedCardEntry, matchedCardEntry, index}: EmojiButtonProps) {
  const btnContent = selectedCardEntry || matchedCardEntry ? decodeEntity(emoji.htmlCode[0]) : "?";

  /**
   * When you're done, there should be hover/focus effects (box-shadow and background-color)
   * on cards lying face-down, animation when cards are turned,
   * and greyed out background on matched cards.
   */

  const btnStyle =
    matchedCardEntry ? "btn--emoji__back--matched" :
      selectedCardEntry ? "btn--emoji__back--selected" :
      "btn--emoji__front";

  const matchedStatus = 
    matchedCardEntry ? 'Matched.' :
      selectedCardEntry ? 'Not matched yet.' :
      'Card is face down.';

  const btnAria = `Position ${index + 1}: ${decodeEntity(emoji.name)}. ${matchedStatus}`;

  return (
    <button
      className={`btn btn--emoji ${btnStyle}`}
      onClick={() => selectedCardEntry ? null : handleClick()}
      disabled={!!matchedCardEntry}
      aria-live="polite"
      aria-label={btnAria}
    >
      {btnContent}
    </button>
  );
};