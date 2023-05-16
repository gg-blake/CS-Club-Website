import { createContext, Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

interface ViewportContextState {
    width: number;
    height: number;
    isMobile: boolean;
}

interface ViewportContextProps {
    viewport: ViewportContextState;
    setViewport: Dispatch<SetStateAction<ViewportContextState>>;
}

interface ViewportProviderProps {
    children: React.ReactNode;
}

const ViewportContext = createContext<ViewportContextProps>({
    viewport: {
        width: 0,
        height: 0,
        isMobile: false,
    },
    setViewport: () => {},
});

export const ViewportProvider: FC<ViewportProviderProps> = ({ children }) => {
    const [viewport, setViewport] = useState<ViewportContextState>({
        width: 0,
        height: 0,
        isMobile: false,
    });

    useEffect(() => {
        const handleResize = () => {
            setViewport({
                width: window.innerWidth,
                height: window.innerHeight,
                isMobile: window.innerWidth < 640,
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <ViewportContext.Provider value={{ viewport, setViewport }}>
            {children}
        </ViewportContext.Provider>
    );
};