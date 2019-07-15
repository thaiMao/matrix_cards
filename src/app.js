import React, { useCallback, useEffect, useState } from "react";
import { css } from "@emotion/core";
import Overlay from "./overlay";
import update from "immutability-helper";
import Card from "./card";

const imageUrls = [
  "https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif",
  "https://media.giphy.com/media/Nm8ZPAGOwZUQM/giphy.gif",
  "https://media.giphy.com/media/Q94xQWspTUkShljj8P/giphy.gif",
  "https://media.giphy.com/media/nR4L10XlJcSeQ/giphy.gif",
  "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif",
];

function App() {
  const [cards, setCards] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function requestCards() {
      const response = await fetch("http://localhost:3000/data");
      let cards = await response.json();
      cards = cards.map((card, index) => {
        const imageUrl = imageUrls[index];
        return { ...card, hasImageLoaded: false, imageUrl };
      });
      setCards(cards);
    }
    requestCards();
  }, []);

  function handleEscapeKey(event) {
    if (event.keyCode === 27) {
      setShowOverlay(false);
      setSelected(null);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey, false);
    return () =>
      document.removeEventListener("keydown", handleEscapeKey, false);
  }, []);

  function handleOnImageLoad(event) {
    const { position } = event.target.dataset;
    let update = [...cards];
    update[position] = { ...update[position], hasImageLoaded: true };
    setCards(update);
  }

  function handleClick(event) {
    const { position } = event.target.dataset;
    setSelected(position);
    setShowOverlay(true);
  }

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex];
      setCards(
        update(cards, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        }),
      );
    },
    [cards],
  );

  function renderCard({ title, position, index, hasImageLoaded, imageUrl }) {
    return (
      <Card
        hasImageLoaded={hasImageLoaded}
        imageUrl={imageUrl}
        index={index}
        key={position}
        position={position}
        title={title}
        handleOnImageLoad={handleOnImageLoad}
        handleClick={handleClick}
        moveCard={moveCard}
      />
    );
  }

  return (
    <div
      css={css`
        display: ${showOverlay ? "none" : "grid"};
        grid-gap: 0.5em;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
      `}
    >
      {cards.map((card, index) => {
        const { imageUrl, title, hasImageLoaded, position } = card;
        return renderCard({
          title,
          position,
          index,
          hasImageLoaded,
          imageUrl,
        });
      })}
      {showOverlay && selected && (
        <Overlay>
          <section
            css={css`
              height: 100vh;
              width: 100vw;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            `}
          >
            <h2>{cards[selected].title}</h2>
            <img alt="cat" src={imageUrls[selected]} />
            <p>Press the Escape key to return to go back</p>
          </section>
        </Overlay>
      )}
    </div>
  );
}

export default App;
