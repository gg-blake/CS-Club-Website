import { useState } from "react";
import IconButton from "./icon-button";
import { StaticImageData } from "next/image";

export default function ProfileCard({ children , name="Generic Profile" , title="Rookie" , src , links } : { children? : any , name? : string , title? : string , src : StaticImageData , links? : { name : string , href : string }[] }) {
    const [expanded, setExpanded] = useState(false);
    
    return (
        <div className={`relative w-[300px] transition-all ${expanded ? "h-auto" : "h-[90vh] overflow-y-clip"}`}>
            <div className="w-full h-auto p-5">
                <img src={src.src} alt={src.src} className="w-full h-auto rounded-full shadow-xl" />
            </div>
            <h1 className="text-3xl text-primary-400 font-medium leading-tight text-center">{name}</h1>
            <h2 className="text-lg text-secondary-300 font-thin leading-tight mb-2 text-center">{title}</h2>
            <div className="w-full h-auto flex justify-center gap-2">
                {links?.map((link, index) => <a className="px-1 py-[1px] border-[1px] border-primary-300 text-primary-300 text-xs underline hover:no-underline underline-offset-[2px]" href={link.href} key={index}>{link.name}</a>)}
            </div>
            <p className={`w-full h-auto transition-all z-10 flex flex-col`}>
                {children}
                <div className={`${!expanded ? "absolute bottom-0" : ""} z-20 w-full h-[30px] flex items-end bg-secondary-900 text-secondary-300`} onClick={() => setExpanded(!expanded)}>{expanded ? "show less" : "show more"}</div>
            </p>
            
        </div>
    );
}