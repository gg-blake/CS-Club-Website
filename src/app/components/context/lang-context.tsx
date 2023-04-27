import { createContext, useState } from "react";

interface LangContextType {
    lang: string;
    setLang: React.Dispatch<React.SetStateAction<string>>;
}

export const LangContext = createContext<LangContextType>({
    lang: "en",
    setLang: () => {},
});

export const LangContextProvider = ({ children } : { children: React.ReactNode }) => {
    const [lang, setLang] = useState<string>("en");

    return (
        <LangContext.Provider value={{ lang, setLang }}>
            {children}
        </LangContext.Provider>
    )
}   //       const user = response.user;                                