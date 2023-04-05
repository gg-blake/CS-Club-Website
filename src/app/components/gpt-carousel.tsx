import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';

type Props = {
  images: StaticImageData[];
};

const Deck: React.FC<Props> = ({ images }) => {
  const [deck, setDeck] = useState<StaticImageData[]>(images);

  const cardStyles = useRef<Array<React.CSSProperties>>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDeck((prevDeck) => {
        const topCard = prevDeck[0];
        const newDeck = [...prevDeck.slice(1), topCard];

        for (let i = 0; i < deck.length; i++) {
          const newPos = i + 1 >= deck.length ? 0 : i + 1;
          const newTransform = `translate(${newPos * 20}px, ${newPos * 20}px)`;
          const newZIndex = deck.length - newPos;
          const newStyle = {
            transform: newTransform,
            zIndex: newZIndex,
            transition: 'transform 0.5s ease-in-out',
          };

          cardStyles.current[i] = newStyle;
        }

        return newDeck;
      });
    }, 2000);

    cardStyles.current = deck.map((_, index) => {
      const zIndex = deck.length - index;
      const transform = `translate(${index * 20}px, ${index * 20}px)`;
      const isTopCard = index === 0;
      const transition = isTopCard ? 'transform 0.5s ease-in-out' : '';

      return {
        zIndex,
        transform,
        transition,
      };
    });

    // Check if the top card has shifted to the back of the deck
    if (cardStyles.current[0].transform === 'translate(0px, 0px)') {
      // Set the transform and transition properties of the new top card
      const newTransform = `translate(20px, 20px)`;
      const newTransition = 'transform 0.5s ease-in-out';
      const newStyle = {
        transform: newTransform,
        zIndex: deck.length,
        transition: newTransition,
      };

      // Update the style object for the second card
      cardStyles.current[1] = newStyle;
    }

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex justify-center items-center h-screen">
      {deck.map((card, index) => {
        const style = cardStyles.current[index];

        return (
          <div
            key={card.src}
            className="absolute transform-gpu"
            style={style}
          >
            <Image src={card} alt={`Card ${index}`} width={200} height={300} />
          </div>
        );
      })}
    </div>
  );
};

export default Deck;
