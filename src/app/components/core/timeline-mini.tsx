import { FC , useRef, useState } from 'react';
import GlitchText from './glitch-text';

function TimelineNode({ children , title , marginTop=20 , bullet } : { children : JSX.Element , title? : string , marginTop : number , bullet? : boolean}) {
    const defaultBullet = <div className="absolute translate-x-[-26px] translate-y-[17px] w-[12px] h-[12px] rounded-full border-[2px] border-primary-500 bg-secondary-900" />;

    return (
        <>
        <div className="w-[40px] h-full flex flex-col items-center relative">
            <div className="h-full w-[1px] bg-primary-500" />
        </div>
        <div className={`w-full h-auto transition-all mt-[${marginTop}px]`}>
            <div className='flex items-center relative'>
                { !bullet && defaultBullet }
                { title ? <GlitchText className='text-8xl font-bold text-secondary-200'>{ title }</GlitchText> : null }
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
    bulletType? : boolean;
}



const TimelineMini: FC<TimelineItem> = ({ children , className , titles , bulletType=false }) => {
    const [isSelect, setSelect] = useState<boolean>(false);

    let timelineNodeList = children.map((child, index) => <TimelineNode title={ titles && titles[index] } marginTop={(index == 0 ? 30 : 0)} bullet={bulletType}>{ child }</TimelineNode>);

    return (
        <>
        <div className={`grid grid-cols-[auto_1fr] ${ className }`}>
            { timelineNodeList.slice(0, 3) }
            { isSelect && timelineNodeList.slice(3) }
        </div>
        <div onClick={() => setSelect(!isSelect)} className='w-[40px] h-[40px] flex justify-center items-center px-3 py-2 text-center rounded-full border-[1px] border-primary-500 hover:border-secondary-200 text-sm text-primary-500 hover:text-secondary-200 hover:bg-primary-500 transition-colors'>
            <svg style={{transform: `rotate(${isSelect ? 45 : 0}deg)`}} className="w-6 h-6 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
        </div>
        </>
    )
}

export default TimelineMini;