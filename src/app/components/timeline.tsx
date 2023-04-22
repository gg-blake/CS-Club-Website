import { FC } from 'react';
import GlitchText from './glitch-text';

function TimelineNode({ children , title , marginTop=0 } : { children : JSX.Element , title? : string , marginTop? : number }) {
    return (
        <>
        <div id={title} className="w-[40px] h-full flex flex-col items-center relative">
            <div className="h-full w-[4px] bg-primary-500" />
        </div>
        <div className={`w-full h-auto min-h-screen transition-all mt-[${marginTop}px]`}>
            <div className='flex items-center'>
                <div className="absolute translate-x-[-30px] w-[20px] h-[20px] rounded-full bg-primary-500" />
                { title ? <GlitchText className='text-4xl sm:text-6xl md:text-8xl font-bold text-secondary-200'>{ title }</GlitchText> : null }
            </div>
            { children }
        </div>
        </>
    )
}

interface TimelineItem {
    children : JSX.Element[];
    className?: string;
    titles?: string[];
}

const Timeline: FC<TimelineItem> = ({ children , className , titles }) => {
    let timelineNodeList = children.map((child, index) => <TimelineNode title={ titles && titles[index] } marginTop={index == 0 ? 100 : 0}>{ child }</TimelineNode>);

    return (
        <div className={`relative grid grid-cols-[40px_100%] ${ className }`}>
            { timelineNodeList }
        </div>
    )
}

export default Timeline;