import { FC , useEffect, useRef , useState , useContext } from "react";
import EventDeck from "../components/event-deck";

interface EventListing {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
}

const testEvents: EventListing[] = [
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
];

function Elipsis() {
    // make an svg representation of the elipsis
    return (
        <svg className="w-4 h-4 scale-150 text-secondary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 10a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
        </svg>
    )
}

function EventsSection({ children , className , title }: { children? : JSX.Element , className?: string , title: string }) {
    const scrollElementRef = useRef<HTMLDivElement>(null);
    const [isEnd, setIsEnd] = useState<boolean>(false);
    

    useEffect(() => {
        if (!scrollElementRef.current) return;
        
        const scrollElement = scrollElementRef.current;
        scrollElement.addEventListener("scroll", () => {
            if (!scrollElementRef?.current) return;
            if (scrollElementRef.current.offsetWidth - scrollElementRef.current.scrollLeft < 30) {
                setIsEnd(true);
            } else {
                setIsEnd(false);
            }
        });
        return () => {
            scrollElement.removeEventListener("scroll", () => {});
        } 
    }, [scrollElementRef]);

    return (
        <>
        <h1 className="w-auto h-auto text-3xl font-bold">{ title }</h1>
        <div className={`w-full h-[320px] relative flex ${ className }`}>
            <div ref={scrollElementRef} className="w-full h-full py-2 relative overflow-x-scroll overflow-y-visible flex z-10">
                <EventDeck items={testEvents} />
            </div>
            
            <div className={`w-1/5 h-[calc(100%_-_10px)] absolute top-0 right-0 ${!isEnd ? "bg-gradient-to-l from-secondary-900 via-secondary-900 to-transparent" : "bg-transparent"} z-20 flex items-center justify-end`}>
                { children }
            </div>
            
        </div>
        </>
    )
}

function EventsColumnsTitles() {
    return (
        <>
        <div className="w-auto h-auto left-0 z-20">
        Soon
        </div>
        <div className="w-auto h-auto left-0 z-20">
        Upcoming
        </div>
        <div className="w-auto h-auto left-0  z-20 ">
        Past
        </div>
        </>
    )
}

export default function Events() {
    const [isSelect, setIsSelect] = useState<boolean>(false);

    return (
        <div className="w-full h-auto flex flex-col gap-x-4 px-6 relative text-4xl text-secondary-200 font-bold underline underline-offset-4">
            <EventsSection title="Past" />
            {isSelect && <EventsSection title="Upcoming" />}
            {isSelect && <EventsSection title="Past" />}
            <div onClick={() => setIsSelect(!isSelect)} className="w-auto h-auto text-xl text-normal">
                {isSelect ? "Hide future and past events" : "Show future and past events"}
            </div>
        </div>
    )
}