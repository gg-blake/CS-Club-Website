import { useEffect , useState } from 'react';
import MatrixCanvas from './matrix-canvas';
import Logo from "./umb.png";
import Image from 'next/image';
import useEventListener from '@/hooks/useEventListener';

function NavBar({ scroll }: { scroll: number }) {
    return (
        <div className={`nav-bar z-20 w-full flex items-center h-8 text-md text-xl text-secondary-100 gap-2 px-5 bg-secondary-900 ${scroll > 650 ? 'bg-opacity-100 fixed top-0' : 'bg-opacity-0'}`}>
            {["About", "Events", "Competitions", "Insights"].map((item, index) => {
                if (index != 0) {
                    return (
                        <>
                        <div className='w-1 h-1 mt-1 bg-white rounded-full' />
                        <div className=' flex items-center hover:text-primary-500 hover:underline text-white transition-colors'>{item}</div>
                        </>
                    )
                } else {
                    return (
                        <div className=' flex items-center hover:text-primary-500 hover:underline text-white transition-colors'>{item}</div>
                    )
                }
            })}
        </div>
    )
}

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
            /*
            if (position > 100) {
                el.style.padding = `${(100 - shrink) / 2}vw ${(100 - shrink) / 2}vh` ;
                el.style.width = `${shrink}vw`;
                el.style.height = `${shrink}vh`;
            } 
            else {
                el.style.padding = "0px";
                el.style.width = "100vw";
                el.style.height = "100vh";
            }
            */

            splashElement.style.transform = `translateY(${position * 0.5}px)`;
            
        }

        if (matrixElement) {
            matrixElement.style.opacity = `${1 - (position / 100)}`;
        }
        
    });

    return (
        <>
        {scroll > 650 ? <NavBar scroll={scroll}/> : <></>}
        
        <div id="splash" className={`absolute z-10 top-0 w-screen h-screen flex flex-col justify-center`}>
            <MatrixCanvas scroll={scroll} />
            {scroll > 650 ? <></> : <NavBar scroll={scroll}/>}
            <div id="title" className='my-2 px-3 z-10'>
                <span className='flex items-center gap-[35px] ml-[10px] flex-wrap'>
                    <Image
                    className='pt-[10px] h-[80px] w-auto'
                    src={Logo}
                    alt="UMass Boston Logo"
                    />
                    <h1 className='flex items-center text-8xl text-secondary-100 font-bold leading-none'>CS CLUB</h1>

                </span>
                
                <p className='text-xl text-secondary-100 px-2 py-2'>UMass Boston's official center for technology-driven students.</p>
            </div>
            
        </div>
        </>
        
    )
}