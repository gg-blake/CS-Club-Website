import { useState , useEffect , useRef } from 'react';
import UMBImage from './umb.png';
import { StaticImageData } from 'next/image';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import useEventListener from '@/hooks/useEventListener';
import EventListing from './generic-event-types';

import "../globals.css";
import GenericEvent from './generic-event';
import Carousel from './carousel-types';
import { FC } from 'react';




const EventCarousel: FC<Carousel<EventListing[]>> = ({ className, items , scale=3 , offsetY=40, duration=3000, animationDuration=200 }) => {
    const [eventItems, setEventItems] = useState(items);
    const [thisElementRefCallback, enableAnimations] = useAutoAnimate();
    const itemRef = useRef<HTMLLIElement>(null);
    
    useEffect(() => {
        const interval = setInterval(cycle, duration);
        return () => clearInterval(interval);
    }, []);

    const cycle = () => {
        setEventItems(prevItems => {
            const first = prevItems[0];
            const rest = prevItems.slice(1);
            return [...rest, first];
        })
    };

    return (
        <ul ref={thisElementRefCallback} className={`${className} flex flex-row-reverse `}>
            {eventItems.map(
            (event, index) => {
                return (
                    <li ref={itemRef} key={event.title} className={`w-full h-full`}>
                        <div style={{transform: `translateY(${offsetY * index}px) scale(${scale + index * 0.8})`, animationDelay: `${duration - animationDuration + 30}ms`, animationDuration: `${animationDuration}ms`, animationTimingFunction: "ease-in-out"}} className={`w-full h-auto shadow-md rounded-md  ${index == 0 ? `fade-out opacity-1` : index == (eventItems.length - 1) ? `fade-in opacity-0` : "transition-all"}`}>
                            <GenericEvent {...event} />
                        </div>
                    </li>
                )
            }
            )}
        </ul>
    )
}

export default EventCarousel;