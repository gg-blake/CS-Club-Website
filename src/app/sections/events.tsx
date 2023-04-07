import { FC } from "react";

interface EventListing {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
}

const Event: FC<EventListing> = ({ title, description, date, time, location }) => {
    return (
        <div className="w-[200px] h-[300px]">
            <h1 className="text-2xl font-medium text-primary-400">{title}</h1>
            <p className="text-sm text-secondary-300 font-thin">{description}</p>
            <p className="text-sm text-secondary-300 font-thin">{date}</p>
            <p className="text-sm text-secondary-300 font-thin">{time}</p>
            <p className="text-sm text-secondary-300 font-thin">{location}</p>
        </div>
    )
}

const TestEvents: EventListing[] = [
    {
        title: "Test Event",
        description: "This is a test event",
        date: "2021-01-01",
        time: "12:00",
        location: "Test Location"
    },
    {
        title: "Test Event",
        description: "This is a test event",
        date: "2021-01-01",
        time: "12:00",
        location: "Test Location"
    },
    {
        title: "Test Event",
        description: "This is a test event",
        date: "2021-01-01",
        time: "12:00",
        location: "Test Location"
    },
    {
        title: "Test Event",
        description: "This is a test event",
        date: "2021-01-01",
        time: "12:00",
        location: "Test Location"
    },
];

function EventsSection({ title }: { title: string }) {
    return (
        <div className="flex-grow h-full">
            <h2 className="text-2xl font-medium text-secondary-200">{title}</h2>
            {TestEvents.map((event, index) => <Event {...event} key={index} />)}
        </div>
    )
}

export default function Events() {
    return (
        <div className="w-full h-auto flex gap-4 items-center pl-4">
            <EventsSection title="Past" />
            <div className="w-[5px] h-[80%] bg-primary-500 rounded-full"></div>
            <EventsSection title="Now" />
            <div className="w-[5px] h-[80%] bg-primary-500 rounded-full"></div>
            <EventsSection title="Upcoming" />
        </div>
    )
}