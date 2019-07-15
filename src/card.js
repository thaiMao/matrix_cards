import React, { useRef } from "react";
import Spinner from "./spinner.gif";
import { css } from "@emotion/core";
import { useDrag, useDrop } from "react-dnd";

const GRID = {
  0: {
    column: "1/2",
    row: "1/2",
  },
  1: {
    column: "2/3",
    row: "1/2",
  },
  2: {
    column: "3/4",
    row: "1/2",
  },
  3: {
    column: "1/2",
    row: "2/3",
  },
  4: {
    column: "2/3",
    row: "2/3",
  },
};

const TYPES = {
  CARD: "card",
};

function Card({
  hasImageLoaded,
  imageUrl,
  index,
  position,
  title,
  handleOnImageLoad,
  handleClick,
  moveCard,
}) {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: TYPES.CARD,
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: TYPES.CARD, position, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <article
      css={css`
        grid-column: ${GRID[index].column};
        grid-row: ${GRID[index].row};
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 0.1em solid grey;
        padding: 0.5em;
        opacity: ${opacity};
      `}
      ref={ref}
    >
      <header>
        <h2>{title}</h2>
      </header>
      <img
        alt="cat"
        css={css`
          height: 100%;
          width: 100%;
          &:hover {
            cursor: pointer;
          }
        `}
        data-position={position}
        src={hasImageLoaded ? imageUrl : Spinner}
        onLoad={handleOnImageLoad}
        onClick={handleClick}
      />
    </article>
  );
}

export default Card;
