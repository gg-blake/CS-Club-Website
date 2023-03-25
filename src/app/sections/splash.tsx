import { useEffect } from 'react';

export default function Splash({ scroll }: { scroll: number}) {
    return (
        <div className='w-screen h-screen flex flex-col justify-center'>
            <div className={`nav-bar sticky w-full flex items-center h-8 top-0 text-md text-xl text-white gap-2 px-5 bg-smoky-black ${scroll > 300 ? 'bg-opacity-100' : 'bg-opacity-0'}`}>
                {["About", "Events", "Competitions", "Insights"].map((item, index) => {
                    if (index != 0) {
                        return (
                            <>
                            <div className='w-1 h-1 mt-1 bg-white rounded-full' />
                            <div className=' flex items-center hover:text-muave-pink text-white transition-colors'>{item}</div>
                            </>
                        )
                    } else {
                        return (
                            <div className=' flex items-center hover:text-muave-pink text-white transition-colors'>{item}</div>
                        )
                    }
                })}
            </div>
            <div className='my-2 px-3'>
                <h1 className='text-8xl text-white font-bold'>UMB CS CLUB</h1>
                <p className='text-xl text-silver px-2 py-2'>UMass Boston's official center for technology-driven students.</p>
            </div>
        </div>
    )
}