import { decodeEntity } from 'html-entities';
import EmojiButton from './EmojiButton';
import { type Emoji } from '../App';

export type Card = {
  name: string;
  index: number;
}

interface MemoryCardProps {
  handleClick: ({name, index} : Card) => void,
  data: Emoji[],
  selectedCards: Card[];
  matchedCards: Card[];
}

export default function MemoryCard({ handleClick, data, selectedCards, matchedCards }: MemoryCardProps) {
  const cardEl = data.map((emoji, index) => {
    const selectedCardEntry = selectedCards.find(card => card.index === index);
    const matchedCardEntry = matchedCards.find(card => card.index === index);

    const cardStyle =
      matchedCardEntry ? "card-item--matched" :
        selectedCardEntry ? "card-item--selected" :
        "";

    return (
      <li key={index} className={`card-item ${cardStyle}`}>
        <EmojiButton
          content={decodeEntity(emoji.htmlCode[0])}
          handleClick={() => handleClick({name: emoji.name, index})}
          selectedCardEntry={selectedCardEntry}
          matchedCardEntry={matchedCardEntry}
        />
      </li>
    );
  });

  return <ul className="card-container">{cardEl}</ul>
}