import { FC, useState , useRef , useEffect , useContext } from "react";
import EventListing from "./generic-event-types";
import "./module.event-deck.css";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import UserContext from "../context/user-context";
import CALENDAR_ICON from "./../../../public/images/calendar.png";

interface EventDeckProps {
    className?: string;
    items: EventListing[];
    cardWidth?: number;
    cardHeight?: number;
    duration?: number;
    animationDuration?: number;
}

function PlusIcon({ className } : { className? : string }) {
    // return a visual representation of a plus icon
    return (
        <svg className={`w-7 h-7 text-secondary-200 ${ className }`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
    )
}

function PinIcon({ className } : { className? : string }) {
    return (
        <svg focusable="false" width="20" height="24" viewBox="0 0 20 24" className={className}>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
            <circle cx="12" cy="9" r="2.5"></circle>
        </svg>
    )
}

const EventDeckCard: FC<EventListing> = ({ title, description, date, time, location }) => {
    const [isSelect, setIsSelect] = useState<boolean>(false);
    const {user, setUser} = useContext(UserContext);

    return (
        <div className="w-[300px] h-[300px] py-2 px-3 border-[2px] border-secondary-600 border-opacity-50 rounded-[4px] gap-0 text-base bg-secondary-900 shadow-md relative z-20 overflow-clip flex flex-col">
            <h2  className={`text-2xl font-semibold text-secondary-200`}>{title}</h2>
            <span className="font-light whitespace-nowrap w-auto flex flex-row items-center gap-2 pl-[5px]">
                <img src={CALENDAR_ICON.src} className="w-[15px] h-[15px] mt-[2px]" alt="calendar.png" />
                <h3 className="inline-block">{ date }</h3>
                <div className="w-[5px] h-[5px] bg-secondary-200 rounded-full mt-[2px]" />
                <h3 className="inline-block">{ time }</h3>
            </span>
            <span className="font-light whitespace-nowrap w-auto flex flex-row items-center gap-2">
                <PinIcon className="stroke-secondary-200 fill-none scale-[80%]" />
                <h3 className="inline-block">{ location }</h3>
                
            </span>
            <div className="w-[92%] h-[2px] rounded-full my-3 bg-secondary-800 self-center mx-2" />
            <p className="text-secondary-200 opacity-50 leading-tight font-light overflow-y-scroll pr-2">{ description }</p>
            <div onClick={() => console.log(user)} className="w-full h-[70px] bg-secondary-900">
                
            </div>
        </div>
    )
}

const EventDeck: FC<EventDeckProps> = ({ className="h-auto" , items , cardWidth , cardHeight , duration=3000 , animationDuration=200 }) => {
    return (
        <div className={`flex absolute h-auto flex-row gap-5 pr-[30px] ${className}`}>
            {
            items.map( (event: EventListing, index: number) => <EventDeckCard key={"EventDeckCard-" + index} {...event} /> )
            }
        </div>
    )
}

export default EventDeck;