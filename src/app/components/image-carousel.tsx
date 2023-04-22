import { useState , useEffect , useRef } from 'react';
import UMBImage from './umb.png';
import { StaticImageData } from 'next/image';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import useEventListener from '@/hooks/useEventListener';

import "../globals.css";
import { FC } from 'react';
import Carousel from './carousel-types';
import GlitchText from './glitch-text';


const ImageCarousel: FC<Carousel<string[]>> = ({ className, items , scale=3 , offsetY=40, duration=3000, animationDuration=200 } ) => {
    const [imageItems, setImageItems] = useState(items);
    const [thisElementRefCallback, enableAnimations] = useAutoAnimate();
    const itemRef = useRef<HTMLLIElement>(null);
    
    useEffect(() => {
        const interval = setInterval(cycle, duration);
        return () => clearInterval(interval);
    }, []);

    const cycle = () => {
        setImageItems((prevImageItems: string[]) => {
            const first = prevImageItems[0];
            const rest = prevImageItems.slice(1);
            return [...rest, first];
        })
    };

    return (
        <ul ref={thisElementRefCallback} className={`${className} flex flex-row-reverse `}>
            {imageItems.map(
            (image, index) => {
                return (
                    <li ref={itemRef} key={image} className={`w-full h-full`}>
                        <div style={{transform: `translateY(${offsetY * index}px) scale(${scale + index * 0.8})`, animationDelay: `${duration - animationDuration + 30}ms`, animationDuration: `${animationDuration}ms`, animationTimingFunction: "ease-in-out"}} className={`w-full h-auto shadow-md rounded-md  ${index == 0 ? `fade-out opacity-1` : index == (imageItems.length - 1) ? `fade-in opacity-0` : "transition-all"}`}>
                            <img src={image} alt={image} className={`rounded-[0.5px]`} />
                        </div>
                    </li>
                )
            }
            )}
        </ul>
    )
}

export default ImageCarousel;