import "@/app/module.event-deck.css";
import { FC, useRef , useState , useContext, use } from "react";
import { doc, getDocs, collection, setDoc, QuerySnapshot, DocumentData, Timestamp } from "firebase/firestore";
import { db } from "@/config/firebase";
import { AuthContext } from "@/app/components/context/auth-context";
import { LangContext } from "@/app/components/context/lang-context";
import TimelineMini from "@/app/components/core/timeline-mini";
import GenericTimestamp from "@/app/components/core/generic-timestamp";
import GenericParagraph from "@/app/components/core/generic-paragraph";
import GenericButton from "@/app/components/core/generic-button";
import LangContent from "@/app/components/types/lang-content";

interface EventListing {
    title: LangContent;
    desc: LangContent;
    start: Timestamp;
    end: Timestamp;
    where: LangContent;
    who: string[];
}

interface LoginPromptState {
    isLoginPrompt: boolean;
    setLoginPrompt: React.Dispatch<React.SetStateAction<boolean>>;
}

interface EventProps {
    uid: string;
    data: EventListing;
}

const fetchEvents = getDocs(collection(db, "events"))
                    .then((res: QuerySnapshot<DocumentData>) => res.docs.sort((a, b) =>  b.data().start.seconds - a.data().start.seconds))

const Event: FC<EventProps & LoginPromptState> = ({ uid, data, isLoginPrompt, setLoginPrompt }) => {
    const { title, desc, start, end, where, who } = data;
    const { user, setUser } = useContext(AuthContext);
    const rsvpButtonRef = useRef<HTMLDivElement>(null);
    const { lang } = useContext(LangContext);

    const pad = (n: number) => {
        return ("0" + n).slice(-2);
    }

    const parsedDate = `${start.toDate().getMonth()}-${start.toDate().getDate()}-${start.toDate().getFullYear()}`;
    const parsedTime = `${pad(start.toDate().getHours())}:${pad(start.toDate().getMinutes())}-${pad(end.toDate().getHours())}:${pad(end.toDate().getMinutes())}`;

    const RSVP = async () => {
        if (!user.uid) return;
        if (who.includes(user.uid) || user.events.includes(uid)) return;
        // Add the event to the user's list of events
        const updatedUser = {
            ...user,
            events: [...user.events, uid],
        }
        await setDoc(doc(db, "users", user.uid), updatedUser)
        .then(() => setUser(updatedUser));
        // Add the user to the event's list of users
        const updatedEvent = {
            ...data,
            who: [...who, user.uid],
        }
        await setDoc(doc(db, "events", uid), updatedEvent);
    }

    const unRSVP = async () => {
        if (!user.uid) return;
        if (!who.includes(user.uid) || !user.events.includes(uid)) return;
        // Remove the event from the user's list of events
        const updatedUser = {
            ...user,
            events: user.events.filter((event) => event !== uid),
        }
        await setDoc(doc(db, "users", user.uid), updatedUser)
        .then(() => setUser(updatedUser));
        // Remove the user from the event's list of users
        const updatedEvent = {
            ...data,
            who: who.filter((u) => u !== user.uid),
        }
        await setDoc(doc(db, "events", uid), updatedEvent);
    }

    const smoothScroll = (id: string) => {
        document.querySelector(`#${id}`)?.scrollIntoView({
            behavior: 'smooth'
        });
    }

    return (
        <div className="w-full h-auto grid grid-rows-[auto_auto_1fr] lg:grid-cols-[auto_auto_1fr] mb-[25px] gap-[3px] text-base bg-transparent relative z-20">
            <div className=" min-w-[18vw] h-auto flex flex-col items-start gap-1">
                <div className="flex flex-row h-[12px] items-center gap-2 pl-[1px] mb-1 mt-[10px]">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="h-full w-auto scale-125 fill-secondary-700"><path d="M180 976q-24 0-42-18t-18-42V296q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600V486H180v430Zm0-490h600V296H180v130Zm0 0V296v130Zm300 230q-17 0-28.5-11.5T440 616q0-17 11.5-28.5T480 576q17 0 28.5 11.5T520 616q0 17-11.5 28.5T480 656Zm-160 0q-17 0-28.5-11.5T280 616q0-17 11.5-28.5T320 576q17 0 28.5 11.5T360 616q0 17-11.5 28.5T320 656Zm320 0q-17 0-28.5-11.5T600 616q0-17 11.5-28.5T640 576q17 0 28.5 11.5T680 616q0 17-11.5 28.5T640 656ZM480 816q-17 0-28.5-11.5T440 776q0-17 11.5-28.5T480 736q17 0 28.5 11.5T520 776q0 17-11.5 28.5T480 816Zm-160 0q-17 0-28.5-11.5T280 776q0-17 11.5-28.5T320 736q17 0 28.5 11.5T360 776q0 17-11.5 28.5T320 816Zm320 0q-17 0-28.5-11.5T600 776q0-17 11.5-28.5T640 736q17 0 28.5 11.5T680 776q0 17-11.5 28.5T640 816Z"/></svg>
                    <GenericTimestamp className="text-secondary-700 font-light text-xs pl-[2px]" date={parsedDate.split('-').join('/')} time={parsedTime} />
                </div>
                <div className="flex flex-row h-[12px] items-center gap-2 pl-[1px] mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="h-full w-auto scale-125 fill-secondary-700"><path d="M480.089 566Q509 566 529.5 545.411q20.5-20.588 20.5-49.5Q550 467 529.411 446.5q-20.588-20.5-49.5-20.5Q451 426 430.5 446.589q-20.5 20.588-20.5 49.5Q410 525 430.589 545.5q20.588 20.5 49.5 20.5ZM480 897q133-121 196.5-219.5T740 504q0-117.79-75.292-192.895Q589.417 236 480 236t-184.708 75.105Q220 386.21 220 504q0 75 65 173.5T480 897Zm0 79Q319 839 239.5 721.5T160 504q0-150 96.5-239T480 176q127 0 223.5 89T800 504q0 100-79.5 217.5T480 976Zm0-472Z"/></svg>
                    <GenericTimestamp className="text-secondary-700 font-light text-xs pl-[2px]" date={ where[lang] } />
                </div>
                <h2  className={`text-2xl font-semibold text-secondary-200 w-full leading-none`}>{ title[lang] }</h2>
                <div className="w-full flex justify-start mt-[2px] items-center">
                    <GenericButton className={`text-xs group transition-all flex items-center gap-0 hover:gap-2 active:hover:bg-transparent border-primary-500 text-primary-500 hover:border-secondary-100 hover:text-secondary-100  ${!user.events.includes(uid) ? "hover:bg-primary-500 active:hover:border-red-400 active:hover:text-red-400" : "hover:bg-red-400 active:hover:border-secondary-400 active:hover:text-secondary-400"}`} ref={rsvpButtonRef} onClick={!user.uid ? "" : user.events.includes(uid) ? () => unRSVP() : () => RSVP()}>
                    <div className="w-0 h-full group-hover:w-[15px] transition-all overflow-clip">
                        {user.uid ? !user.events.includes(uid) ?
                            <svg className={`w-[15px] h-auto fill-transparent group-hover:fill-secondary-50 group-hover:transparent  transition-all ${!user.events.includes(uid) ? "group-active:group-hover:fill-red-400" : "group-active:group-hover:fill-secondary-400"}`} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M321 896q-24 0-42-18t-18-42V736h124V609q-38 3-76-10.5T241 556v-58h-50L60 367q36-34 86-55.5T248 290q30 0 68.5 9.5T385 330v-74h455v535q0 44-30.5 74.5T735 896H321Zm124-160h245v55q0 20 12.5 32.5T735 836q20 0 32.5-12.5T780 791V316H445v57l241 241v43h-43L517 531l-17 20q-13 15-26 23t-29 15v147ZM218 438h83v89q17 11 33.5 16.5T368 549q25 0 51-13.5t38-27.5l17-20-69-69q-32-32-72-50.5T248 350q-27 0-49 6.5T154 374l64 64Zm412 358H321v40h323q-6-6-10-16.5t-4-23.5Zm-309 40v-40 40Z"/></svg>
                            :
                            <svg className={`w-[15px] h-auto fill-transparent group-hover:fill-secondary-50 group-hover:transparent  transition-all ${!user.events.includes(uid) ? "group-active:group-hover:fill-red-400" : "group-active:group-hover:fill-secondary-400"}`} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m815 1000-64-64H180q-24.75 0-42.375-17.625T120 876V305l-54-54 43-43 749 749-43 43ZM180 876h511L180 364v512Zm660-22-60-60V373H359L202 216h578q24.75 0 42.375 17.625T840 276v578Z"/></svg>
                        : <svg className={`w-[15px] h-auto fill-transparent group-hover:fill-secondary-50 group-hover:transparent  transition-all ${!user.events.includes(uid) ? "group-active:group-hover:fill-red-400" : "group-active:group-hover:fill-secondary-400"}`} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M220 976q-24.75 0-42.375-17.625T160 916V482q0-24.75 17.625-42.375T220 422h70v-96q0-78.85 55.606-134.425Q401.212 136 480.106 136T614.5 191.575Q670 247.15 670 326v96h70q24.75 0 42.375 17.625T800 482v434q0 24.75-17.625 42.375T740 976H220Zm0-60h520V482H220v434Zm260.168-140Q512 776 534.5 753.969T557 701q0-30-22.668-54.5t-54.5-24.5Q448 622 425.5 646.5t-22.5 55q0 30.5 22.668 52.5t54.5 22ZM350 422h260v-96q0-54.167-37.882-92.083-37.883-37.917-92-37.917Q426 196 388 233.917 350 271.833 350 326v96ZM220 916V482v434Z"/></svg>
                        }
                    </div>
                    { !user.uid ? {
                        "en": "Login to RSVP",
                        "jp": "RSVP にログインする",
                    }[lang] : !user.events.includes(uid) ? "RSVP" : "unRSVP" }
                    </GenericButton>
                </div>
            </div>
            <div className="hidden lg:visible lg:flex w-[2px] h-[92%] mt-3 my-3 mx-2 rounded-full bg-secondary-800 self-center  " />
            <GenericParagraph className="text-secondary-200 text-[.95rem] md:text-[1.1rem] flex-shrink opacity-50 hover:opacity-100 transition-opacity leading-tight font-light overflow-y-scroll">{ desc[lang] }</GenericParagraph>
        </div>
    )
}

export default function Events() {
    const [isLoginPrompt, setLoginPrompt] = useState<boolean>(false);
    const eventList = use(fetchEvents);

    return (
        <div className="w-full h-auto overflow-y-scroll flex flex-col relative text-4xl text-secondary-200 font-bold mt-[25px] pr-[70px]">
            <TimelineMini>
            { eventList.map( (event: DocumentData, index: number) => <Event key={"EventDeckCard-" + index}  isLoginPrompt={isLoginPrompt} setLoginPrompt={setLoginPrompt} uid={event.id} data={event.data()} /> ) }
            </TimelineMini>
        </div>
    )
}