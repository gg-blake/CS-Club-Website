import React, { ForwardedRef, ReactNode } from 'react';
import useForwardRef from "@/hooks/useForwardRef";

const GenericButton = React.forwardRef(({ children , className , onClick }: { children? : ReactNode , className? : string , onClick? : any }, ref: ForwardedRef<HTMLButtonElement>) => {
    const thisElementRef = useForwardRef<HTMLButtonElement>(ref);
    
    return (
        <button ref={thisElementRef} onClick={onClick} className={`w-[130px] h-auto px-3 py-2 text-center border-[1px] mt-3 rounded-sm transition-colors ${ className }`}>
            { children }
        </button>
    )
});

export default GenericButton;