import { FC , useEffect, useRef , useState , useContext , RefObject , ChangeEvent } from "react";
import UserContext from "../context/user-context";
import CALENDAR_ICON from "./../../../public/images/calendar.png";
import "./module.event-deck.css";
import TimelineMini from "./timeline-mini";
import GenericTimestamp from "./generic-timestamp";
import GenericParagraph from "./generic-paragraph";
import GenericButton from "./generic-button";

interface EventListing {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
}

interface LoginPromptState {
    isLoginPrompt: boolean;
    setLoginPrompt: React.Dispatch<React.SetStateAction<boolean>>;
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

function PinIcon({ className } : { className? : string }) {
    return (
        <svg focusable="false" width="20" height="24" viewBox="0 0 20 24" className={className}>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
            <circle cx="12" cy="9" r="2.5"></circle>
        </svg>
    )
}

const Event: FC<EventListing & LoginPromptState> = ({ title, description, date, time, location, isLoginPrompt, setLoginPrompt }) => {
    const [isSelect, setIsSelect] = useState<boolean>(false);
    const rsvpButtonRef = useRef<HTMLButtonElement>(null);
    const {user, setUser} = useContext(UserContext);

    const rsvp = () => {
        if (!rsvpButtonRef.current) return;
        rsvpButtonRef.current.style.borderColor = "#29ff4c";
        console.log(`RSVP'd to ${title} at ${location} on ${date} at ${time}`);
    }

    return (
        <div className="w-full h-auto grid grid-rows-[auto_auto_1fr] lg:grid-cols-[auto_auto_1fr] mb-[25px] gap-[3px] text-base bg-transparent relative z-20">
            <div className="w-auto min-w-[18vw] h-auto flex flex-col">
                <h2  className={`text-2xl font-semibold text-secondary-200 w-full leading-none my-1`}>{title}</h2>
                <GenericTimestamp className="pl-[5px] font-thin" date={date} time={time} icon={true} />
                <span className="font-thin whitespace-nowrap w-auto flex flex-row items-center gap-2">
                    <PinIcon className="stroke-secondary-200 fill-none scale-[80%]" />
                    <h3 className="inline-block">{ location }</h3>
                </span>
                <GenericButton ref={rsvpButtonRef} onClick={() => !user.username ? setLoginPrompt(true) : rsvp()}>
                { !user.username ? <a href="#login" >Login to RSVP</a> : "RSVP" }
                </GenericButton>
            </div>
            <div className="hidden lg:visible lg:flex w-[2px] h-[92%] mt-3 my-3 mx-2 rounded-full bg-secondary-800 self-center  " />
            <GenericParagraph className="text-secondary-200 text-[.95rem] md:text-[1.1rem] flex-shrink opacity-50 hover:opacity-100 transition-opacity leading-tight font-light overflow-y-scroll  pr-[100px]">{ description }</GenericParagraph>
        </div>
    )
}

interface LoginState {
    isLoginPrompt: boolean;
    setLoginPrompt: React.Dispatch<React.SetStateAction<boolean>>;
}

interface RegisterDetails {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface LoginDetails {
    username: string;
    password: string;
}

const Login: FC<LoginState> = ({ isLoginPrompt, setLoginPrompt }) => {
    const thisElementRef = useRef<HTMLDivElement>(null);
    const loginRef = useRef<HTMLDivElement>(null);
    const registerRef = useRef<HTMLDivElement>(null);
    const [focusedRef, setFocusedRef] = useState<RefObject<HTMLDivElement | null>>(loginRef);
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [fieldFlag, setFieldFlag] = useState<string>("");
    const [registerDetails, setRegisterDetails] = useState<RegisterDetails>({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [loginDetails, setLoginDetails] = useState<LoginDetails>({
        username: "",
        password: "",
    });
    const [submittedDetails, setSubmittedDetails] = useState<RegisterDetails | LoginDetails>({
        username: "",
        password: ""
    });

    const fieldStyle: string = "w-full h-[35px] bg-secondary-900 border-[1px] p-1 pl-3 font-light border-secondary-700 text-secondary-200 rounded-none placeholder-secondary-700 focus:outline-none focus:border-primary-500";

    const loginFields = <>
    <input onChange={(event) => handleChange(event)} name="username" type="text" placeholder="Username" value={loginDetails.username} className={fieldStyle} />
    <input onChange={(event) => handleChange(event)} name="password" type="password" placeholder="Password" value={loginDetails.password} className={fieldStyle} />
    </>

    const registerFields = <>
    <input onChange={(event) => handleChange(event)} name="username" type="text" placeholder="Username" value={registerDetails.username} className={fieldStyle} />
    <div className="w-full h-auto grid grid-cols-2 relative gap-2">
        <input onChange={(event) => handleChange(event)} name="firstName" type="text" placeholder="First Name" value={registerDetails.firstName} className={fieldStyle} />
        <input onChange={(event) => handleChange(event)} name="lastName" type="text" placeholder="Last Name" value={registerDetails.lastName} className={fieldStyle} />
    </div>
    <input onChange={(event) => handleChange(event)} name="email" type="text" placeholder="Email" value={registerDetails.email} className={fieldStyle} />
    <input onChange={(event) => handleChange(event)} name="password" type="password" placeholder="Password" value={registerDetails.password} className={fieldStyle} />
    <input onChange={(event) => handleChange(event)} name="confirmPassword" type="password" placeholder="Confirm Password" value={registerDetails.confirmPassword} className={fieldStyle} />
    </>

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (isLogin) setLoginDetails({...loginDetails, [event.target.name]: event.target.value});
        else setRegisterDetails({...registerDetails, [event.target.name]: event.target.value});
    }

    

    const handleSubmit = () => {
        if (isLogin) {
            if (loginDetails.username === "" || loginDetails.password === "") {
                setFieldFlag("Please fill out all fields");
                return;
            }
        } else {
            if (registerDetails.username === "" || registerDetails.firstName === "" || registerDetails.lastName === "" || registerDetails.email === "" || registerDetails.password === "" || registerDetails.confirmPassword === "") {
                setFieldFlag("Please fill out all fields");
                return;
            }
            if (registerDetails.password !== registerDetails.confirmPassword) {
                setFieldFlag("Passwords do not match");
                return;
            }
            if (!(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm).test(registerDetails.email)) {
                setFieldFlag("Invalid email address");
                return;
            }
        }

        setFieldFlag("");

        
    }

    useEffect(() => {
        console.log(registerDetails);
    }, [registerDetails])

    useEffect(() => {
        console.log(loginDetails);
    }, [loginDetails])

    

    return (
        <div id="login" ref={thisElementRef} style={{ height: `${isLoginPrompt ? "auto" : 0}`}} className={`w-full max-w-[500px] text-base overflow-clip`}>
            <div className="flex flex-row w-auto relative gap-2 px-2">
                <div onClick={() => {setFocusedRef(loginRef); setIsLogin(true);}} ref={loginRef} className="text-xl font-normal hover:text-primary-500 transition-colors">Login</div>
                <div onClick={() => {setFocusedRef(registerRef); setIsLogin(false);}} ref={registerRef} className="text-xl font-normal hover:text-primary-500 transition-colors">Register</div>
                <div style={{width: `${focusedRef.current?.offsetWidth}px`, left: `${focusedRef.current?.offsetLeft}px`}} className="absolute h-[2px] bg-primary-500 transition-all bottom-[1px]"></div>
            </div>
            <div className="w-auto h-auto mt-4 flex flex-col gap-2 pl-[8px]">
                { isLogin ? loginFields : registerFields }
                { fieldFlag !== "" ? <div className="text-xs text-[#d64646]">{fieldFlag}</div> : null }
                <GenericButton onClick={() => handleSubmit()}>
                    { isLogin ? "Login" : "Register"}
                </GenericButton>
            </div>
        </div>
    )
}

export default function Events() {
    const [isLoginPrompt, setLoginPrompt] = useState<boolean>(false);
    

    return (
        <div className="w-full h-auto overflow-y-scroll flex flex-col gap-y-4 relative text-4xl text-secondary-200 font-bold mt-[25px] pr-[70px]">
            <Login isLoginPrompt={isLoginPrompt} setLoginPrompt={setLoginPrompt} />
            <TimelineMini>
            { testEvents.map( (event: EventListing, index: number) => <Event key={"EventDeckCard-" + index}  isLoginPrompt={isLoginPrompt} setLoginPrompt={setLoginPrompt} {...event} /> ) }
            </TimelineMini>
        </div>
    )
}