import useEventListener from '@/hooks/useEventListener';
import { useRef } from 'react';

export default function NavBar({ className, ids } : { className?: string, ids?: string[] }) {

    function smoothScroll(id: string){
        document.querySelector(`#${id}`)?.scrollIntoView({
            behavior: 'smooth'
        });
    }

    return (
        <div className={`w-full h-auto flex flex-row z-50 ${ className }`}>
            { ids?.map((id: string, index: number) => <div onClick={() => smoothScroll(id)} className="w-auto text-secondary-200 hover:text-primary-500 hover:underline underline-offset-4 transition-colors" >{id}</div>) }
        </div>
    )
}