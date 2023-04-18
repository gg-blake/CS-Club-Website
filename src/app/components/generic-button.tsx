import React, { ForwardedRef, ReactNode } from 'react';
import useForwardRef from "@/hooks/useForwardRef";

const GenericButton = React.forwardRef(({ children , className , ...buttonProps }: { children? : ReactNode , className? : string , buttonProps? : any }, ref: ForwardedRef<HTMLButtonElement>) => {
    const thisElementRef = useForwardRef<HTMLButtonElement>(ref);
    
    return (
        <button ref={thisElementRef} {...buttonProps} className="w-[130px] h-auto px-3 py-2 text-center border-[1px] mt-3 rounded-sm border-primary-500 hover:border-secondary-200 text-sm text-primary-500 hover:text-secondary-200 hover:bg-primary-500 transition-colors ">
            { children }
        </button>
    )
});

export default GenericButton;