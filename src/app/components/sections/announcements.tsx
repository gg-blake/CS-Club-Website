import "@/app/module.event-deck.css";
import { FC, useState } from "react";
import TimelineMini from "@/app/components/core/timeline-mini";
import GenericTimestamp from "@/app/components/core/generic-timestamp";
import GenericButton from "@/app/components/core/generic-button";


interface Platform {
    name: string;
    icon: string;
}

interface AnnouncementListing {
    time: string;
    date: string;
    platform: Platform;
    channel?: string;
    postUser: string;
    message: string;
    href: string;
}

const DISCORD_PLATFORM: Platform = {
    name: "Discord",
    icon: "/discord_logo.png"
}

const INSTAGRAM_PLATFORM: Platform = {
    name: "Instagram",
    icon: "/instagram_logo.png"
}

const testAnnouncements: AnnouncementListing[] = [
    {
        time: "4:00PM",
        date: "4/14/2023",
        platform: DISCORD_PLATFORM,
        channel: "announcements",
        postUser: "TheSwiginator",
        message: "Attention all members! The next meeting will be held on April 14th at 4:00PM. Please join us in the Discord server to discuss the upcoming events and activities.",
        href: "https://www.google.com"
    },
    {
        time: "3:00PM",
        date: "4/13/2023",
        platform: INSTAGRAM_PLATFORM,
        postUser: "umbcsclub",
        message: "Attention all members! The next meeting will be held on April 14th at 4:00PM. Please join us in the Discord server to discuss the upcoming events and activities.",
        href: "https://www.google.com"
    },
    {
        time: "11:00AM",
        date: "4/10/2023",
        platform: DISCORD_PLATFORM,
        channel: "announcements",
        postUser: "TheSwiginator",
        message: "Attention all members! The next meeting will be held on April 14th at 4:00PM. Please join us in the Discord server to discuss the upcoming events and activities.",
        href: "https://www.google.com"
    },
    {
        time: "12:30PM",
        date: "4/9/2023",
        platform: DISCORD_PLATFORM,
        channel: "announcements",
        postUser: "TheSwiginator",
        message: "Attention all members! The next meeting will be held on April 14th at 4:00PM. Please join us in the Discord server to discuss the upcoming events and activities.",
        href: "https://www.google.com"
    }
];

const Announcement: FC<AnnouncementListing> = ({ time, date, platform , channel, postUser, message, href }) => {
    const [isSelect, setIsSelect] = useState<boolean>(false);

    return (
        <div className="w-auto max-w-full h-auto min-h-[100px] max-h-[300px] flex flex-col lg:flex-row mb-[25px] gap-[3px] text-base bg-transparent relative z-20">

            <div className="w-auto min-w-[18vw] h-auto flex flex-col text-secondary-200 pt-1 gap-1">
                    <svg className="bg-secondary-900 w-[18px] h-[18px] absolute left-[-30px] translate-y-[20px] stroke-[20px] fill-none stroke-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.36 276.67"><path d="M42.88,173.32c-27.44,10.17-40,41.39-28.76,65.91s42.49,34.08,64.76,22.66c22.08-11.32,25-38,25.14-40l154.29-84c.25-7.82,1-56.07-37.33-93.33C178.21,3,122.76,10.09,116.21,11Z"/><path d="M157.36,216.94c6.72,11.89,6.74,26.08-.19,36-9.52,13.62-31.19,17.84-48.5,6.54"/></svg>
                    <div className="flex flex-row h-[12px] items-center gap-2 pl-[1px] mb-1">
                        <img className="h-full w-auto opacity-[30%]" src={platform.icon} alt={platform.name} />
                        <GenericTimestamp className="text-secondary-700 font-light text-xs pl-[2px]" date={date} time={time} />
                    </div>
                    <h2  className={`text-2xl font-semibold  w-full leading-none`}>@{postUser}</h2>
                    { channel && 
                    <h2 className="flex flex-row items-center">
                        <svg className="w-[16px] h-[16px] fill-secondary-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                            <path d="M216,148H172V108h44a12,12,0,0,0,0-24H172V40a12,12,0,0,0-24,0V84H108V40a12,12,0,0,0-24,0V84H40a12,12,0,0,0,0,24H84v40H40a12,12,0,0,0,0,24H84v44a12,12,0,0,0,24,0V172h40v44a12,12,0,0,0,24,0V172h44a12,12,0,0,0,0-24Zm-108,0V108h40v40Z"/>
                        </svg>
                        {channel}
                    </h2> }
                    <GenericButton>
                        <a href={href} target="_blank" rel="noreferrer">View Post</a>
                    </GenericButton>
            </div>
            <div className="flex-grow max-w-[600px] h-auto flex gap-3 mt-[10px] items-center pr-[100px]">
                <div className="w-auto h-auto text-4xl sm:text-6xl font-semibold text-primary-500 leading-none">“</div>    
                <span className="flex-grow h-auto font-normal text-sm sm:text-base md:text-xl text-secondary-200 leading-tight opacity-50 hover:opacity-100 transition-all">{ message }</span>
                <div className="w-auto h-auto text-4xl sm:text-6xl font-semibold text-primary-500 flex items-end leading-none">”</div>
            </div>
        </div>
    )
}

export default function Announcements() {
    const [isSelect, setIsSelect] = useState<boolean>(false);

    return (
        <div className="w-full h-auto max-h-screen overflow-y-scroll flex flex-col gap-x-4 relative text-4xl text-secondary-200 font-bold mt-[25px]">
            <TimelineMini bulletType={true}>
            { testAnnouncements.map( (announcement: AnnouncementListing, index: number) => <Announcement key={"EventDeckCard-" + index} {...announcement} /> ) }
            </TimelineMini>
        </div>
    )
}