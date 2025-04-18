import { useEffect, useState } from 'react'
import './App.css'
import Form from './components/Form';
import MemoryCard, { type Card } from './components/MemoryCard';

export type Emoji = {
  name: string;
  htmlCode: string[];

  /* unused props
  category: string;
  group: string;
  unicode: string[];
  */
}

function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState([] as Emoji[]);
  const [selectedCards, setSelectedCards] = useState([] as Card[]);
  const [matchedCards, setMatchedCards] = useState([] as Card[]);
  const [isGameOver, setIsGameOver] = useState(false);


  console.log(selectedCards)
  useEffect(() => {
    if (selectedCards.length === 2) {
      const [firstCard, secondCard] = selectedCards;
      if (firstCard.name === secondCard.name) {
        // Add the matched cards to matchedCards state
        setMatchedCards(prev => [...prev, ...selectedCards]);
      }
    }
  }, [selectedCards]);

  useEffect(() => {
    if (emojisData.length && matchedCards.length === emojisData.length) {
      setIsGameOver(true);
    }
  }, [emojisData, matchedCards]);

  async function startGame(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      const response = await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature");
      if (response.ok) {
        const data = await response.json();
        getEmojis(data);
        setIsGameOn(true);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (err) {
      console.error(err);
    }
  }

  function getEmojis(data: Emoji[]) {
    // Get random 5 unique emojis
    const randomIndices = new Set<number>();
    const totalEmojis = data.length;
    while (randomIndices.size < 5) {
      const randomIndex = Math.floor(Math.random() * totalEmojis);
      randomIndices.add(randomIndex);
    }

    const randomEmojis = Array.from(randomIndices).map(index => data[index]);
    const duplicatedEmojis = [...randomEmojis, ...randomEmojis];

    // use the fisher-yates algo to shuffle the array
    for (let i = duplicatedEmojis.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = duplicatedEmojis[i];
      duplicatedEmojis[i] = duplicatedEmojis[j];
      duplicatedEmojis[j] = temp;
    }

    setEmojisData(duplicatedEmojis);
  }

  function turnCard({name, index} : Card) {
    const selectedCardEntry = selectedCards.find(card => card.index === index);
    if (!selectedCardEntry) {
      setSelectedCards(selectedCards.length < 2 ? (prev => [...prev, { name, index }]) : [{ name, index }]);
    }
  }

  return (
    <main>
      <h1>Memory</h1>
      {!isGameOn && <Form handleSubmit={startGame} />}
      {isGameOn && 
        <MemoryCard
          handleClick={turnCard}
          data={emojisData}
          selectedCards={selectedCards}
          matchedCards={matchedCards}
        />
      }
    </main>
  );
}

export default App;
