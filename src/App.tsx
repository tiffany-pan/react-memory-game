import { useEffect, useState } from 'react'
import './App.css'
import Form from './components/Form';
import MemoryCard, { type Card } from './components/MemoryCard';
import AssistiveTechInfo from './components/AssistiveTechInfo';
import GameOver from './components/GameOver';
import ErrorCard from './components/ErrorCard';

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
  const [areAllCardsMatched, setAreAllCardsMatched] = useState(false);
  const [isError, setIsError] = useState(false);

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
      setAreAllCardsMatched(true);
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
      setIsError(true);
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
    setSelectedCards(selectedCards.length < 2 ? (prev => [...prev, { name, index }]) : [{ name, index }]);
  }

  function resetError() {
    setIsError(false);
  }

  function resetGame() {
    setIsGameOn(false);
    setSelectedCards([]);
    setMatchedCards([]);
    setAreAllCardsMatched(false);
  }

  return (
    <main>
      <h1>Memory game</h1>
      {!isGameOn && !isError && <Form handleSubmit={startGame} />}
      {isGameOn && !areAllCardsMatched && <AssistiveTechInfo emojisData={emojisData} matchedCards={matchedCards}/>}
      {areAllCardsMatched && <GameOver handleClick={resetGame}/>}
      {isGameOn && 
        <MemoryCard
          handleClick={turnCard}
          data={emojisData}
          selectedCards={selectedCards}
          matchedCards={matchedCards}
        />
      }
      {isError && <ErrorCard handleClick={resetError} />}
    </main>
  );
}

export default App;
