import { useEffect , useState } from 'react';
import MatrixCanvas from './matrix-canvas';

import Image from 'next/image';
import useEventListener from '@/hooks/useEventListener';
import GlitchText from '@/app/components/glitch-text';


export default function Splash() {
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

    return (
        <>
        <head>
        <title>CS Club - UMass Boston</title>
        </head>
        <div className='z-0 relative h-screen overflow-clip p-0 m-0'>
            <div id="splash" className={`absolute z-10 top-0 w-screen h-screen flex flex-col justify-center`}>
                <MatrixCanvas scroll={scroll} />
                <div id="title" className='my-2 px-3 z-10'>
                    <span className='flex items-center gap-[35px] ml-[10px] flex-wrap'>
                        <img
                        className='pt-[10px] h-[80px] w-auto'
                        src={"/umb.png"}
                        alt="UMass Boston Logo"
                        />
                        <div className='relative'>
                            <GlitchText className=" bg-transparent text-secondary-200 text-8xl font-bold">CS CLUB</GlitchText>
                        </div>
                        
                    </span>
                    
                    <p className='text-xl text-secondary-100 px-2 py-2'>UMass Boston's official center for technology-driven students.</p>
                </div>
                
            </div>
            </div>
            </>
        
    )
}