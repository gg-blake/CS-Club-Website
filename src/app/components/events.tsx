import { FC , useEffect, useRef , useState , useContext , RefObject , ChangeEvent } from "react";
import UserContext from "../context/user-context";
import CALENDAR_ICON from "./../../../public/images/calendar.png";
import "./module.event-deck.css";
import TimelineMini from "./timeline-mini";
import GenericTimestamp from "./generic-timestamp";
import GenericParagraph from "./generic-paragraph";
import GenericButton from "./generic-button";
import Login from "./login";
import { db } from "../../../config/firebase";
import { doc, getDocs, collection, setDoc, QuerySnapshot, DocumentData, Timestamp } from "firebase/firestore";
import { use } from "react";
import { AuthContext } from "./authcontext";
import { LangContext } from "./langcontext";
import LangContent from "./lang-types";

interface EventListing {
    title: LangContent;
    desc: LangContent;
    start: Timestamp;
    end: Timestamp;
    where: string;
    who: string[];
}

interface LoginPromptState {
    isLoginPrompt: boolean;
    setLoginPrompt: React.Dispatch<React.SetStateAction<boolean>>;
}

/*const testEvents: EventListing[] = [
    {
        title: "Leetcode Competition",
        description: "The UMB CS Club LeetCode Competition is an event where computer science enthusiasts solve algorithmic challenges on LeetCode. Participants compete against each other in a friendly and challenging environment to showcase their problem-solving skills. The event is open to students from UMB, other universities, and professionals. It usually lasts several hours and includes coding challenges of varying difficulty levels. It's an excellent opportunity to improve coding skills and network with like-minded individuals in the computer science community.",
        date: "4/17/2023",
        time: "4:00PM-5:00PM",
        location: "University Hall, Room 2320"
    },
    {
        title: "Resume Roast",
        description: "The UMB CS Club hosted a \"Resume Roast\" event where students submitted their resumes to be critiqued by industry professionals. The event provided valuable feedback and advice to help students improve their resumes and increase their chances of success in the job market. Students were also able to network with professionals and learn about potential job opportunities.",
        date: "5/23/2023",
        time: "3:00PM-4:00PM",
        location: "University Hall, Room 2320"
    },
    {
        title: "Job Search Presentation",
        description: "The UMBC CS Club held a job search presentation where they discussed tips and tricks for finding employment in the computer science field. The presentation covered a wide range of topics, including crafting an effective resume, leveraging online resources, and networking strategies. Attendees were encouraged to start early, stay organized, and take advantage of available resources in order to increase their chances of success in the job market.",
        date: "6/2/2023",
        time: "3:30PM-4:30PM",
        location: "University Hall, Room 2320"
    },
    {
        title: "Test Event 4",
        description: "This is a test event",
        date: "20/20/2023",
        time: "13:37PM-13:37AM",
        location: "Test Location"
    },
];*/

function PinIcon({ className } : { className? : string }) {
    return (
        <svg focusable="false" width="20" height="24" viewBox="0 0 20 24" className={className}>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
            <circle cx="12" cy="9" r="2.5"></circle>
        </svg>
    )
}

interface EventProps {
    uid: string;
    data: EventListing;
}

const Event: FC<EventProps & LoginPromptState> = ({ uid, data, isLoginPrompt, setLoginPrompt }) => {
    const { title, desc, start, end, where, who } = data;
    const [isSelect, setIsSelect] = useState<boolean>(false);
    const { user, setUser } = useContext(AuthContext);
    const rsvpButtonRef = useRef<HTMLButtonElement>(null);
    const { lang } = useContext(LangContext);

    const pad = (n: number) => {
        return ("0" + n).slice(-2);
    }

    useEffect(() => {
        if (!user) return;
        /*if (user.events.includes(uid)) {
            if (!rsvpButtonRef.current) return;
            rsvpButtonRef.current.style.borderColor = "#29ff4c";
            rsvpButtonRef.current.style.color = "#29ff4c";
        } else {
            if (!rsvpButtonRef.current) return;
            rsvpButtonRef.current.style.borderColor = "#0095ff";
            rsvpButtonRef.current.style.color = "#0095ff";
        }*/
    }, [user])

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

    function smoothScroll(id: string){
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
                    <PinIcon className="stroke-secondary-200 fill-none scale-[80%]" />
                    <h3 className="inline-block">{ where }</h3>
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


// store use getDocs(collection(db, "events")) to get all events and cache them in localstorage
getDocs(collection(db, "events"))
.then(res => console.log(res.docs.map(doc => doc.id)));
// print

const fetchEvents = getDocs(collection(db, "events"))
                    .then((res: QuerySnapshot<DocumentData>) => res.docs.sort((a, b) =>  b.data().start.seconds - a.data().start.seconds))


export default function Events() {
    const [isLoginPrompt, setLoginPrompt] = useState<boolean>(false);
    const eventList = use(fetchEvents);

    useEffect(() => {
        console.log(eventList);
    }, [eventList])

    return (
        <div className="w-full h-auto overflow-y-scroll flex flex-col relative text-4xl text-secondary-200 font-bold mt-[25px] pr-[70px]">
            <TimelineMini>
            { eventList.map( (event: DocumentData, index: number) => <Event key={"EventDeckCard-" + index}  isLoginPrompt={isLoginPrompt} setLoginPrompt={setLoginPrompt} uid={event.id} data={event.data()} /> ) }
            </TimelineMini>
        </div>
    )
}