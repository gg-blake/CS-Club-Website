import { useEffect , useState , useContext } from 'react';
import { LangContext } from '@/app/components/langcontext';
import MatrixCanvas from './matrix-canvas';
import LangContent from '../components/lang-types';

import Image from 'next/image';
import useEventListener from '@/hooks/useEventListener';
import GlitchText from '@/app/components/glitch-text';

export default function Splash({ title, desc } : { title : LangContent , desc : LangContent}) {
    const { lang } = useContext(LangContext);
    const [scroll, setScroll] = useState(0);

    useEventListener('scroll', (e: Event) => {
        const position = window.pageYOffset;
        const splashElement = document.getElementById('splash');
        const matrixElement = document.getElementById('matrix');
        const titleElement = document.getElementById('title');
        let shrink = 97;
        setScroll(position);
        if (splashElement) {
            splashElement.style.transform = `translateY(${position * 0.5}px)`;
            
        }

        if (matrixElement) {
            matrixElement.style.opacity = `${1 - (position / 100)}`;
        }
        
    });

    useEffect(() => {console.log(lang)}, [lang])

    return (
        <>
        <head>
        <title>CS Club - UMass Boston</title>
        </head>
        <div className='z-0 relative h-screen overflow-clip p-0 m-0'>
            <div id="splash" className={`absolute z-10 top-0 w-screen h-screen flex flex-col justify-center`}>
                <MatrixCanvas scroll={scroll} />
                <div id="title" className='my-2 px-3 z-10'>
                    <p className='text-3xl text-primary-200 px-2 py-2 font-extrabold'>{{
                        'en': 'UMass Boston',
                        'jp': 'ウマッスボストン',
                        'es': 'UMass Boston'
                    }[lang]}</p>
                    <GlitchText className=" bg-transparent text-secondary-200 text-8xl font-bold">{title[lang]}</GlitchText>
                    
                    <p className='text-xl text-secondary-100 px-2 py-2'>{desc[lang]}</p>
                </div>
                
            </div>
            </div>
            </>
        
    )
}