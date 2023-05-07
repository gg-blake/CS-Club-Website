import { useContext } from 'react';
import { LangContext } from '@/app/components/context/lang-context';

export default function GenericParagraph({ children , className } : { children? : string , className? : string }) {
    const { lang } = useContext(LangContext);

    return (
        <div className={`w-full h-auto flex gap-4  ${className}`}>
            
            <p className={"w-auto h-auto"}>
                <div className={"inline-block font-bold w-auto h-auto pr-2 translate-y-[2px] text-primary-500 text-2xl animate-pulse"}>{lang !== "jp" ? "➔" : "ツ"}</div>
                {children}
            </p>
        </div>
    )
}