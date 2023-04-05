import { useState } from "react";

export default function ProfileCard({ children , name="Generic Profile" , title="Rookie" } : { children? : string | JSX.Element , name? : string , title? : string }) {
    const [expanded, setExpanded] = useState(false);
    
    return (
        <div className={`relative w-[300px] transition-all ${expanded ? "h-auto" : "h-[40vh] overflow-y-clip"}`}>
            <h1 className="text-3xl text-primary-400 font-medium">{name}</h1>
            <h2 className="text-2xl text-secondary-600 font-light">{title}</h2>
            <p className={`w-full h-auto transition-all z-10`}>
                {children}
                <div className={`${!expanded ? "absolute bottom-0" : ""} z-20 w-full h-[30px] flex items-end ml-[40px] bg-secondary-900 text-secondary-300`} onClick={() => setExpanded(!expanded)}>{expanded ? "show less" : "show more"}</div>
            </p>
            
        </div>
    );
}