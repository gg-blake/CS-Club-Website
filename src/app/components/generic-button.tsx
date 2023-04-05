import React, { ForwardedRef } from 'react';
import useForwardRef from "@/hooks/useForwardRef";

const GenericButton = React.forwardRef(({ children , className }: { children? : string | JSX.Element , className? : string }, ref: ForwardedRef<HTMLDivElement>) => {
    const thisElementRef = useForwardRef<HTMLDivElement>(ref);
    
    return (
        <>
        <div ref={thisElementRef} className={`bg-secondary-800 hover:bg-secondary-700 hover:scale-[105%] transition-all z-30 ${ className }`}>
            { children }
        </div>
        <div className={`bg-primary-500 transition-all absolute z-20 hover:rotate-12 hover:scale-[110%] ${ className }`} />
        </>
    )
});

export default GenericButton;