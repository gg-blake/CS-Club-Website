import "@/app/globals.css";
import { useState , useEffect , useRef , useContext, FC } from 'react';
import { LangContext } from '@/app/components/context/lang-context';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Carousel from '@/app/components/types/carousel-types';


const ImageCarousel: FC<Carousel<{[index:string]:{[index:string]:string}}>> = ({ className, items , scale=3 , offsetY=40, duration=4000, animationDuration=800 } ) => {
    const { lang } = useContext(LangContext);
    const [imageItems, setImageItems] = useState(Object.keys(items));
    const [thisElementRefCallback, enableAnimations] = useAutoAnimate({
        duration: 800,
        easing: "ease-in-out",
    });
    const [direction, setDirection] = useState<"forward" | "back">("forward");
    const itemRef = useRef<HTMLLIElement>(null);
    
    useEffect(() => {
        const interval = setInterval(cycle, duration);
        return () => clearInterval(interval);
    }, []);

    const cycle = () => {
        setDirection("forward");
        setImageItems((prevImageItems: string[]) => {
            const first = prevImageItems[0];
            const rest = prevImageItems.slice(1);
            return [...rest, first];
        })
    };

    const cycleBack = () => {
        setDirection("back");
        setImageItems((prevImageItems: string[]) => {
            const last = prevImageItems[prevImageItems.length - 1];
            const rest = prevImageItems.slice(0, prevImageItems.length - 1);
            return [last, ...rest];
        })
    };

    return (
        <>
        <ul ref={thisElementRefCallback} className={`${className} flex flex-row-reverse `}>
            {imageItems.map(
            (image, index) => {
                return (
                    <li ref={itemRef} key={image} className={`w-full h-full`}>
                        <div style={{transform: `translateY(${offsetY * index}px) scale(1800%)`, transitionProperty: "transform", transitionDuration: `50ms`, transitionTimingFunction: `linear` , animationDelay: `${duration - animationDuration + 30}ms`, animationDuration: `${animationDuration}ms`, animationTimingFunction: "cubic-bezier(.65,.21,.32,.9)"}} className={`w-full h-auto shadow-md rounded-md  ${index == 0 ? `fade-out opacity-1` : index == (imageItems.length - 1) ? `fade-in opacity-0` : ""}`}>
                            <img src={image} alt={image} className={`rounded-[0.5px] shadow-xl`} />
                            <div style={{opacity: index === (imageItems.length - 2) ? 1 : 0}} className='absolute left-0 text-[10%] font-normal text-secondary-400 mt-[1.2px] transition-opacity'>{items[image][lang]}</div>
                        </div>
                    </li>
                )
            }
            )}
        </ul>
        
        </>
    )
}

export default ImageCarousel;