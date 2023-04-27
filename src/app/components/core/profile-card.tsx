import { useState, FC } from "react";

type Link = { 
    name : string,
    href : string 
};

interface ProfileCardProps { 
    children? : any; 
    name? : string; 
    title? : string;
    src : string;
    links? : Link[]; 
}

const ProfileCard:FC<ProfileCardProps> = ({ children , name="Generic Profile" , title="Rookie" , src , links }) => {
    const [expanded, setExpanded] = useState(false);
    
    return (
        <div className={`relative w-[300px] flex flex-col transition-all h-[70vh] gap-2 border-[2px] border-secondary-800 p-3 rounded-md`}>
            <div className="w-full h-auto">
                <img src={src} alt={src} className="w-full h-auto rounded-md shadow-xl" />
            </div>
            <span className="leading-tight text-secondary-200">
                <h1 className="text-3xl font-semibold">{name}</h1>
                <h2 className="text-lg font-thin">{title}</h2>
            </span>
            <div className="w-[92%] h-[3px] my-[5px] bg-secondary-600 rounded-full self-center" />
            <div className="w-full h-auto flex gap-3">
                {links?.map((link, index) => <a className="px-1 py-[1px] rounded-sm border-[1px] border-primary-500 text-primary-500 text-xs hover:bg-primary-500 hover:border-secondary-200 hover:text-secondary-200" href={link.href} key={index}>{link.name}</a>)}
            </div>
            <p className={`w-full transition-all z-10 flex flex-col flex-shrink h-full overflow-y-scroll`}>
                {children}
            </p>
            
        </div>
    );
}

export default ProfileCard;