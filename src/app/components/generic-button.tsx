import React, { ForwardedRef } from 'react';
import useForwardRef from "@/hooks/useForwardRef";

const GenericButton = React.forwardRef(({ children , className }: { children? : string | JSX.Element , className? : string }, ref: ForwardedRef<HTMLDivElement>) => {
    const thisElementRef = useForwardRef<HTMLDivElement>(ref);
    
    return (
        <>
        <div ref={thisElementRef} className={`peer bg-secondary-800 hover:bg-secondary-700 hover:scale-[105%] transition-all z-30 ${ className }`}>
            { children }
        </div>
        
        </>
    )
});

export default GenericButton;