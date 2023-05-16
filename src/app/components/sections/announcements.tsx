import "@/app/module.event-deck.css";
import { FC, useState, useContext } from "react";
import TimelineMini from "@/app/components/core/timeline-mini";
import GenericTimestamp from "@/app/components/core/generic-timestamp";
import GenericButton from "@/app/components/core/generic-button";
import LangContent from "@/app/components/types/lang-content";
import { LangContext } from "@/app/components/context/lang-context";
import ThoughtBubble from "@/app/components/core/thought-bubble";
import StyledAnchor from "@/app/components/core/styled-anchor";


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

const ButtonIcon = <svg className={`w-[15px] h-auto fill-transparent group-hover:fill-secondary-50 group-hover:transparent  transition-all group-active:group-hover:fill-secondary-400`} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480.118 726Q551 726 600.5 676.382q49.5-49.617 49.5-120.5Q650 485 600.382 435.5q-49.617-49.5-120.5-49.5Q409 386 359.5 435.618q-49.5 49.617-49.5 120.5Q310 627 359.618 676.5q49.617 49.5 120.5 49.5Zm-.353-58Q433 668 400.5 635.265q-32.5-32.736-32.5-79.5Q368 509 400.735 476.5q32.736-32.5 79.5-32.5Q527 444 559.5 476.735q32.5 32.736 32.5 79.5Q592 603 559.265 635.5q-32.736 32.5-79.5 32.5ZM480 856q-138 0-251.5-75T53.145 582.923Q50 578 48.5 570.826 47 563.652 47 556t1.5-14.826Q50 534 53.145 529.077 115 406 228.5 331T480 256q138 0 251.5 75t175.355 198.077Q910 534 911.5 541.174 913 548.348 913 556t-1.5 14.826q-1.5 7.174-4.645 12.097Q845 706 731.5 781T480 856Zm0-300Zm-.169 240Q601 796 702.5 730.5 804 665 857 556q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359 316 257.5 381.5 156 447 102 556q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z"/></svg>;

const Announcement: FC<AnnouncementListing> = ({ time, date, platform , channel, postUser, message, href }) => {
    const [isSelect, setIsSelect] = useState<boolean>(false);
    const { lang } = useContext(LangContext);
    const [ isLinkHover, setIsLinkHover ] = useState<boolean>(false);

    return (
        <div className="max-w-full h-auto min-h-[100px] max-h-[300px] flex flex-col-reverse lg:flex-row mb-[25px] gap-[3px] text-base bg-transparent relative z-20">
            <div className="group relative flex-grow max-w-[600px] h-auto w-auto flex flex-col gap-3 mt-[10px] items-center overflow-x-clip pr-[10px]">
                <svg className="w-[36px] h-auto sm:w-[60px] opacity-50 fill-primary-500 rotate-180 absolute left-0 top-0 translate-y-[-15px] group-hover:translate-y-[-20px] group-hover:rotate-[192deg] transition-transform" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm477 220q-25 0-37.5-20.5T658 713l48-97H580q-25 0-42.5-17.5T520 556V396q0-25 17.5-42.5T580 336h160q25 0 42.5 17.5T800 396v214q0 7-1.5 14t-4.5 13l-58 115q-5 11-15.5 17.5T697 776Zm-360 0q-25 0-37.5-20.5T298 713l48-97H220q-25 0-42.5-17.5T160 556V396q0-25 17.5-42.5T220 336h160q25 0 42.5 17.5T440 396v214q0 7-1.5 14t-4.5 13l-58 115q-5 11-15.5 17.5T337 776Zm-37-300Zm360 0Z"/></svg>    
                <span className="flex-grow h-auto font-normal text-justify text-sm sm:text-base md:text-xl text-secondary-200 leading-tight transition-all px-[10px] py-[20px] group-hover:rotate-[-3deg]">{ message[lang] }</span>
                <svg className="w-[36px] h-auto sm:w-[60px] opacity-50 fill-primary-500 absolute right-0 bottom-0 translate-y-[15px] group-hover:translate-y-[20px] group-hover:rotate-12 transition-transform" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm477 220q-25 0-37.5-20.5T658 713l48-97H580q-25 0-42.5-17.5T520 556V396q0-25 17.5-42.5T580 336h160q25 0 42.5 17.5T800 396v214q0 7-1.5 14t-4.5 13l-58 115q-5 11-15.5 17.5T697 776Zm-360 0q-25 0-37.5-20.5T298 713l48-97H220q-25 0-42.5-17.5T160 556V396q0-25 17.5-42.5T220 336h160q25 0 42.5 17.5T440 396v214q0 7-1.5 14t-4.5 13l-58 115q-5 11-15.5 17.5T337 776Zm-37-300Zm360 0Z"/></svg>   
            </div>
            <div className="h-auto flex flex-col text-secondary-200 gap-1">
                <svg className="w-[28px] h-auto absolute left-[-30px] translate-y-[30px] fill-primary-500" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M760 606q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T760 546h90q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T850 606h-90Zm-4 272-73-54q-10-8-12-19.826T677 782q8-10 19.826-12T719 776l73 54q10 8 12 19.826T798 872q-8 10-19.826 12T756 878Zm-34-503q-10.348 8-22.174 6Q688 379 680 369t-6-22q2-12 12-20l70-53q10.348-8 22.174-6Q790 270 798 280t6 22q-2 12-12 20l-70 53ZM210 856V696h-70q-24.75 0-42.375-17.625T80 636V516q0-24.75 17.625-42.375T140 456h180l155-93q15-9 30-.064T520 389v374q0 17.128-15 26.064T475 789l-155-93h-50v160h-60Zm90-280Zm260 134V442q27 24 43.5 58.5T620 576q0 41-16.5 75.5T560 710Zm-100 0V442l-124 74H140v120h196l124 74Z"/></svg>
                
                <div className="flex flex-row h-[12px] items-center gap-2 pl-[1px] mt-[40px] mb-1">
                    <img className="h-full w-auto opacity-[30%]" src={platform.icon} alt={platform.name[lang]} />
                    <GenericTimestamp className="text-secondary-700 font-light text-xs" date={date} time={time} />
                </div>
                { channel && 
                <h2 className="flex flex-row items-center gap-2 mb-1">
                    <svg className="h-[12px] w-auto scale-125 fill-secondary-700 ml-[3px]" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M80 776V218q0-14 13-28t27-14h519q15 0 28 13.5t13 28.5v356q0 14-13 28t-28 14H240L80 776Zm201 40q-14 0-27.5-14T240 774v-98h500V336h100q14 0 27 14t13 29v596L721 816H281Zm339-580H140v395l75-75h405V236Zm-480 0v395-395Z"/></svg>
                    <GenericTimestamp className="text-secondary-700 font-light text-xs" date={channel} />
                </h2> }
                <h2  className={`text-2xl font-semibold  w-full leading-none`}>@{postUser}</h2>
                <div className="w-full h-auto flex mt-[2px]">
                    <StyledAnchor onMouseEnter={() => setIsLinkHover(true)} onMouseLeave={() => setIsLinkHover(false)} href={href} icon={ButtonIcon}>
                    {{
                        "en": "View Post",
                        "jp": isLinkHover ? "とうこうをみる" : "投稿を見る",
                    }[lang]}
                    </StyledAnchor>
                </div>
            </div>
            
        </div>
    )
}

export default function Announcements() {
    const [isSelect, setIsSelect] = useState<boolean>(false);
    const { lang } = useContext(LangContext);

    return (
    <div>
        <div className="w-full h-auto max-h-screen max-w-[calc(100vw_-_40px)] overflow-y-scroll flex flex-col gap-x-4 relative text-4xl text-secondary-200 font-bold mt-[25px]">
            
            <TimelineMini bulletType={true}>
            { testAnnouncements.map( (announcement: AnnouncementListing, index: number) => <Announcement key={"EventDeckCard-" + index} {...announcement} /> ) }
            </TimelineMini>
        </div>
    </div>
        
    )
}