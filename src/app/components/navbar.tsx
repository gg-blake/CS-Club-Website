import useEventListener from '@/hooks/useEventListener';
import { useRef, useContext } from 'react';
import { LangContext } from './langcontext';

/*
The UMB CS Club hosted a "Resume Roast" event where students submitted their resumes to be critiqued by industry professionals. The event provided valuable feedback and advice to help students improve their resumes and increase their chances of success in the job market. Students were also able to network with professionals and learn about potential job opportunities.
*/

export default function NavBar({ className, ids } : { className?: string, ids: {[index:string]:string[]} }) {
    const { lang, setLang } = useContext(LangContext);

    function smoothScroll(id: string){
        document.querySelector(`#${id}`)?.scrollIntoView({
            behavior: 'smooth'
        });
    }

    return (
        <div className={`w-full h-auto flex justify-start flex-col md:flex-row md:justify-between items-center z-50 ${ className }`}>
            
            <div className="w-auto flex sm:flex-row gap-3 font-light">
            { ids[lang].map((id: string, index: number) => <div onClick={() => smoothScroll(id)} className="w-auto text-secondary-200 hover:text-primary-500 hover:underline underline-offset-4 transition-colors" >{id}</div>) }
            </div>
            <div className='w-auto h-auto flex items-center gap-2 pr-5 text-secondary-200 text-sm font-extrabold'>
                English
                <input
                onChange={(e) => setLang(e.target.checked ? 'jp' : 'en')}
                className="mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary-500 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary-500 checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary-500 checked:focus:bg-primary-500 checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary-500 dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault01" />

                日本語
                <div className='group w-auto h-auto px-2 py-[6px] bg-secondary-900 bg-opacity-[10%] hover:bg-opacity-10 active:bg-opacity-10 hover:bg-primary-500 active:bg-secondary-500 hover:backdrop-blur-sm active:backdrop-blur-sm hover:text-primary-300 active:text-secondary-300 active:bg- rounded-sm font-light text-sm text-secondary-200 transition-all'>
                {
                {
                    "en": "login/register",
                    "jp": "ログイン/登録",
                    "sp": ""
                }[lang]
                }
                </div>
            </div>
        </div>
    )
}