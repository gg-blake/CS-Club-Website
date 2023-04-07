import { useState , useEffect , useRef } from 'react';
import UMBImage from './umb.png';
import { StaticImageData } from 'next/image';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import useEventListener from '@/hooks/useEventListener';

import "../globals.css";


export default function ImageCarousel({ className, images , scale=3 , offsetY=40, duration=3000, animationDuration=200 }: { className : string , images : StaticImageData[] , scale? : number , offsetY? : number, duration? : number , animationDuration? : number } ) {
    const [items, setItems] = useState(images);
    const [thisElementRefCallback, enableAnimations] = useAutoAnimate();
    const itemRef = useRef<HTMLLIElement>(null);
    
    useEffect(() => {
        const interval = setInterval(cycle, duration);
        return () => clearInterval(interval);
    }, []);

    const cycle = () => {
        setItems(prevItems => {
            const first = prevItems[0];
            const rest = prevItems.slice(1);
            return [...rest, first];
        })
    };

    return (
        <ul ref={thisElementRefCallback} className={`${className} flex flex-row-reverse `}>
            {items.map(
            (item, index) => {
                return (
                    <li ref={itemRef} key={item.src} className={`w-full h-full`}>
                        <div style={{transform: `translateY(${offsetY * index}px) scale(${scale + index * 0.8})`, animationDelay: `${duration - animationDuration + 30}ms`, animationDuration: `${animationDuration}ms`, animationTimingFunction: "ease-in-out"}} className={`w-full h-auto shadow-md rounded-md  ${index == 0 ? `fade-out opacity-1` : index == (images.length - 1) ? `fade-in opacity-0` : "transition-all"}`}>
                            <img src={item.src} alt={item.src} className='rounded-[0.5px]' />
                        </div>
                    </li>
                )
            }
            )}
        </ul>
    )
}