import { FC } from 'react';
import EventListing from './generic-event-types';

const GenericEvent: FC<EventListing> = ({ title, description, date, time, location }) => {
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

export default GenericEvent;