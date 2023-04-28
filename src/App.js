import { useState, useEffect } from "react";
import Card from "./components/card";
import Header from "./components/Header";
import Points from "./components/points";

const fetchImages = async (setRandomImages) => {
  const urls = [];
  for (let i = 0; i < 8; i++) {
    let randomPoke = Math.round(Math.random() * 899);
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomPoke}/`
    );
    const data = await response.json();
    urls.push({ url: data.sprites.front_default, clicked: false });
  }
  setRandomImages(urls);
};

function App() {
  const [randomImages, setRandomImages] = useState(
    Array.from({ length: 8 }, () => ({
      url: "",
      clicked: false,
    }))
  );
  const [currentPoints, setCurrentPoints] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [consecutiveWins, setConsecutiveWins] = useState(0);
  const [info, setInfo] = useState("Dont click twice on the same pokemon!");

  const handlePointsUpdate = (newPoints) => {
    setCurrentPoints(newPoints);
    if (newPoints > bestScore) {
      setBestScore(newPoints);
    }
  };

  useEffect(() => {
    fetchImages(setRandomImages);
  }, []);

  const handleCardClick = (index) => {
    if (randomImages[index].clicked) {
      //if the clicked element property is already true game endend
      const newImages = randomImages.map((image) => ({
        ...image,
        clicked: false,
      }));
      setRandomImages(newImages);
      setCurrentPoints(0);
      setConsecutiveWins(0);
      setInfo("Same pokemon twice, you lose. Click again to start a new game.");
    } else {
      //if the clicked element property is not true game continue
      const newImages = randomImages.map((image, i) => {
        //map over randomImages to find the clicked element and change his clicked property to true
        if (i === index) {
          return {
            ...image,
            clicked: true,
          };
        }
        return image;
      });
      const shuffledImages = [...newImages].sort(() => Math.random() - 0.5);
      setRandomImages(shuffledImages);
      handlePointsUpdate(currentPoints + 1);
      if (currentPoints + 1 === 8) {
        setInfo("Congratulations, you Win. Play with another set of pokemon!");
        fetchImages(setRandomImages);
        setCurrentPoints(0);
        let addConsecutive = consecutiveWins + 1;
        setConsecutiveWins(addConsecutive);
      } else {
        setInfo("Good Job! Click another Pokemon!");
      }
    }
  };

  return (
    <div className="App">
      <Header info={info} />
      <Points
        currentPoints={currentPoints}
        bestScore={bestScore}
        consecutiveWins={consecutiveWins}
      />

      <div className="CardContainer">
        {randomImages.map((image, index) => (
          <Card
            key={index}
            image={image.url}
            clicked={image.clicked}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
