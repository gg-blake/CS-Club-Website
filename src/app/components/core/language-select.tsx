import { FC, useContext, useState, useRef, RefObject, useEffect } from "react"; 
import { LangContext } from "@/app/components/context/lang-context";

interface LanguageProps {
    index: number;
    language: string;
    focusedRef: RefObject<HTMLDivElement> | null;
    setFocusedRef: React.Dispatch<React.SetStateAction<RefObject<HTMLDivElement> | null>>;
}

const Language: FC<LanguageProps> = ({ index, language, focusedRef, setFocusedRef }) => {
    const { lang, setLang } = useContext(LangContext);
    const languageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!languageRef) return;
        if (index === 0) setFocusedRef(languageRef);
    }, [])

    const handleClick = () => {
        setLang(language);
        setFocusedRef(languageRef);
    }

    return (
        <div ref={languageRef} onClick={() => handleClick()} className="z-[99] font-light text-sm text-secondary-200 text-center pl-[1px]">{language}</div>
    )
}

interface LanguageSelectProps {
    availableLanguages: string[];
}

const LanguageSelect: FC<LanguageSelectProps> = ({ availableLanguages }) => {
    const [focusedRef, setFocusedRef] = useState<RefObject<HTMLDivElement> | null>(null);
    
    return (
        <div className="flex flex-row items-center gap-3">
            <div style={{left: `${focusedRef ? focusedRef.current?.offsetLeft! : 0}px`}} className="absolute w-[18px] h-[18px] z-50 scale-125 rounded-full bg-primary-400 transition-all ease-[cubic-bezier(.23,.03,.5,.99)]"></div>
            { availableLanguages.map((language, index) => <Language key={`Language-Option-${index+1}`} index={index} language={language} focusedRef={focusedRef} setFocusedRef={setFocusedRef} />)}
            <div id="language-selector-dot" style={{left: `${focusedRef ? focusedRef.current?.offsetLeft! + (focusedRef?.current?.offsetWidth! / 2) : 0}px`}} className="absolute bottom-[2px] w-[3px] h-[3px] rounded-full bg-primary-400 transition-all ease-[cubic-bezier(.23,.03,.5,.99)]"></div>
        </div>
    )
}

export default LanguageSelect;