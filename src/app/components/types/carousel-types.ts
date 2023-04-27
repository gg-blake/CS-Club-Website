import { StaticImageData } from "next/image";

interface Carousel<T> { 
    className : string;
    items : T;
    scale? : number;
    offsetY? : number;
    duration? : number;
    animationDuration? : number;
}

export default Carousel;