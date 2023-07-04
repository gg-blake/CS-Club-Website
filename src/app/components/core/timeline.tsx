import { FC , useContext, useEffect } from 'react';
import GlitchText from '@/app/components/core/glitch-text';
import { LangContext } from '@/app/components/context/lang-context';

function TimelineNode({ children , title , marginTop=0 } : { children : JSX.Element , title : {[index:string]: string} , marginTop? : number }) {
    const { lang } = useContext(LangContext);

    
    return (
        <>
        <div id={title[lang]} className="w-[40px] h-full flex flex-col items-center relative">
            <div className="h-full w-[4px] bg-primary-500" />
        </div>
        <div className={`max-w-[calc(100vw_-_40px)] h-auto transition-all mt-[${marginTop}px]`}>
            
            <div className='flex items-center mt-[100px]'>
                <div className="absolute translate-x-[-30px] w-[20px] h-[20px] rounded-full bg-primary-500" />
                { title ? <GlitchText className='text-4xl sm:text-6xl md:text-8xl font-bold text-secondary-200'>{ title[lang] }</GlitchText> : null }
            </div>
            { children }
        </div>
        </>
    )
}

interface TimelineItem {
    children : JSX.Element[];
    className?: string;
    titles: { [index:string]: string[] };
}

const Timeline: FC<TimelineItem> = ({ children , className , titles }) => {
    const { lang } = useContext(LangContext);

    return (
        <>
        <img src="/hair_1.svg" className="absolute top-0 h-full object-cover stroke-[5px] stroke-primary-500" />
        <div className={`relative grid grid-cols-[40px_1fr] ${ className }`}>
            { children.map((child, index) => <TimelineNode key={`timeline-node-${index}`} title={ {'en': titles && titles['en'][index], 'ja': titles && titles['ja'][index], "es": titles && titles['es'][index]} } marginTop={index == 0 ? 100 : 0}>{ child }</TimelineNode>) }
        </div>
        </>
    )
}

export default Timeline;