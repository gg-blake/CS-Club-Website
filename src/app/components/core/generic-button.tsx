import React, { ForwardedRef, ReactNode } from 'react';
import useForwardRef from "@/app/components/hooks/useForwardRef";

const GenericButton = React.forwardRef(({ children , className , onClick }: { children? : ReactNode , className? : string , onClick? : any }, ref: ForwardedRef<HTMLDivElement>) => {
    const thisElementRef = useForwardRef<HTMLDivElement>(ref);
    
    return (
        <div ref={thisElementRef} onClick={onClick} className={`w-auto h-auto px-4 py-[4px] flex items-center border-[1px] font-light text-sm rounded-sm transition-colors ${ className }`}>
            { children }
        </div>
    )
});

export default GenericButton;