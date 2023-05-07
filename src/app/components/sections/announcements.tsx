import "@/app/module.event-deck.css";
import { FC, useState, useContext } from "react";
import TimelineMini from "@/app/components/core/timeline-mini";
import GenericTimestamp from "@/app/components/core/generic-timestamp";
import GenericButton from "@/app/components/core/generic-button";
import LangContent from "@/app/components/types/lang-content";
import { LangContext } from "@/app/components/context/lang-context";
import ThoughtBubble from "@/app/components/core/thought-bubble";


interface Platform {
    name: LangContent;
    icon: string;
}

interface AnnouncementListing {
    time: string;
    date: string;
    platform: Platform;
    channel?: string;
    postUser: string;
    message: LangContent;
    href: string;
}

const DISCORD_PLATFORM: Platform = {
    name: {en: "Discord", jp: "ディスコード"},
    icon: "/discord_logo.png"
}

const INSTAGRAM_PLATFORM: Platform = {
    name: {en: "Instagram", jp: "インスタグラム"},
    icon: "/instagram_logo.png"
}

const testAnnouncements: AnnouncementListing[] = [
    {
        time: "5:00PM",
        date: "5/31/2023",
        platform: DISCORD_PLATFORM,
        channel: "announcements",
        postUser: "TheSwiginator",
        message: {
            "en": "Hi all, those who are interested in helping us at our bakesale fundraiser, we will be meeting and setting up around 10 am in Campus Center, on the first floor. Please message me if you plan to come. Thanks!",
            "jp": "こんにちは、私たちのベイクセールの資金調達に協力したい人は、午前10時ごろにキャンパスセンターの1階で会って設定します。来る予定の場合はメッセージを送ってください。ありがとうございました！",
        },
        href: "https://www.google.com"
    },
    {
        time: "11:00AM",
        date: "4/10/2023",
        platform: DISCORD_PLATFORM,
        channel: "announcements",
        postUser: "TheSwiginator",
        message: {
            "en": "Hi all, just wanted to give a thanks to everyone who was at our most recent LeetCode competition! The competition was fierce! Next time we plan to run concurrent competitions for graduate and undergraduate students.",
            "jp": "こんにちは、さいきんのLeetCodeコンテストにさんかしたすべてのひとにかんしゃしたいとおもいます! 次回は、大学院生と学部生の両方の競争を同時に実施する予定です。",
        },
        href: "https://www.google.com"
    },
];

const Announcement: FC<AnnouncementListing> = ({ time, date, platform , channel, postUser, message, href }) => {
    const [isSelect, setIsSelect] = useState<boolean>(false);
    const { lang } = useContext(LangContext);

    return (
        <div className="w-auto max-w-full h-auto min-h-[100px] max-h-[300px] flex flex-col lg:flex-row mb-[25px] gap-[3px] text-base bg-transparent relative z-20">

            <div className="w-auto min-w-[18vw] h-auto flex flex-col text-secondary-200 pt-1 gap-1">
                    <svg className="bg-secondary-900 w-[18px] h-[18px] absolute left-[-30px] translate-y-[20px] stroke-[20px] fill-none stroke-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.36 276.67"><path d="M42.88,173.32c-27.44,10.17-40,41.39-28.76,65.91s42.49,34.08,64.76,22.66c22.08-11.32,25-38,25.14-40l154.29-84c.25-7.82,1-56.07-37.33-93.33C178.21,3,122.76,10.09,116.21,11Z"/><path d="M157.36,216.94c6.72,11.89,6.74,26.08-.19,36-9.52,13.62-31.19,17.84-48.5,6.54"/></svg>
                    <div className="flex flex-row h-[12px] items-center gap-2 pl-[1px] mb-1">
                        <img className="h-full w-auto opacity-[30%]" src={platform.icon} alt={platform.name[lang]} />
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
                        <a href={href} target="_blank" rel="noreferrer">{{
                            "en": "View Post",
                            "jp": "投稿を見る"
                        }[lang]}</a>
                    </GenericButton>
            </div>
            <div className="flex-grow max-w-[600px] h-auto flex gap-3 mt-[10px] items-center pr-[100px]">
                <div className="w-auto h-auto text-4xl sm:text-6xl font-semibold text-primary-500 leading-none">“</div>    
                <span className="flex-grow h-auto font-normal text-sm sm:text-base md:text-xl text-secondary-200 leading-tight opacity-50 hover:opacity-100 transition-all">{ message[lang] }</span>
                <div className="w-auto h-auto text-4xl sm:text-6xl font-semibold text-primary-500 flex items-end leading-none">”</div>
            </div>
        </div>
    )
}

export default function Announcements() {
    const [isSelect, setIsSelect] = useState<boolean>(false);
    const { lang } = useContext(LangContext);

    return (
    <div>
        <ThoughtBubble className="w-[200px] h-auto text-sm absolute translate-x-[calc(100vw_-_500px)] flex">
        {{
            "en": "You can find all of our announcements on our",
            "jp": "すべてのはっぴょは,"
        }[lang]}
        &nbsp;
        <a className="text-violet-400 underline underline-offset-4 hover:text-violet-700" href="https://discord.gg/T26dc7tc" target="_blank">{{
            "en": "Discord Server",
            "jp": <>Discordのサーバー&nbsp;</>
        }[lang]}</a>
        {{
            "en": "!",
            "jp": "で見つけることができます!"
        }[lang]}
        </ThoughtBubble>
        <div className="w-full h-auto max-h-screen overflow-y-scroll flex flex-col gap-x-4 relative text-4xl text-secondary-200 font-bold mt-[25px]">
            
            <TimelineMini bulletType={true}>
            { testAnnouncements.map( (announcement: AnnouncementListing, index: number) => <Announcement key={"EventDeckCard-" + index} {...announcement} /> ) }
            </TimelineMini>
        </div>
    </div>
        
    )
}