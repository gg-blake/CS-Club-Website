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
    const [isSelect, setIsSelect] = useState<boolean>(false);
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
            <div className="w-auto min-w-[18vw] h-auto flex flex-col">
                <h2  className={`text-2xl font-semibold text-secondary-200 w-full leading-none my-1`}>{title[lang]}</h2>
                <GenericTimestamp className="pl-[5px] font-thin" date={parsedDate} time={parsedTime} icon={true} />
                <span className="font-thin whitespace-nowrap w-auto flex flex-row items-center gap-2">
                    <svg focusable="false" width="20" height="24" viewBox="0 0 20 24" className="stroke-secondary-200 fill-none scale-[80%]">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
                        <circle cx="12" cy="9" r="2.5"></circle>
                    </svg>
                    <h3 className="inline-block">{ where[lang] }</h3>
                </span>
                <GenericButton className={`hover:border-secondary-200 hover:text-secondary-200 ${!user.events.includes(uid) ? "border-primary-500 text-sm text-primary-500 hover:bg-primary-500" : "border-[#29ff4c] text-sm text-[#29ff4c] hover:bg-[#29ff4c]"}`} ref={rsvpButtonRef} onClick={!user.uid ? () => setLoginPrompt(true) : () => RSVP()}>
                { !user.uid ? <div onClick={() => smoothScroll("events")} >Login to RSVP</div> : !user.events.includes(uid) ? "RSVP" : "RSVP'd" }
                </GenericButton>
                { user.events.includes(uid) && <GenericButton className="border-[#ff0000] text-sm text-[#ff0000] hover:bg-[#ff0000] hover:border-[#ff0000]" onClick={() => unRSVP()}>Un-RSVP</GenericButton> }
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