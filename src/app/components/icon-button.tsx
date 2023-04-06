import { useRef } from "react";
import { StaticImageData } from "next/image";
import GenericButton from "./generic-button";

export default function IconButton({ children , className , src } : { children? : string , className? : string , src : string }) {
    const thisElementRef = useRef(null);
    
    return (
        <GenericButton ref={thisElementRef} className={`flex w-auto h-full relative p-1 rounded-[6px] opacity-50`}>
            <img src={src} alt={src} className='h-full w-auto rounded-[0.5px]' />
        </GenericButton>
    )
}