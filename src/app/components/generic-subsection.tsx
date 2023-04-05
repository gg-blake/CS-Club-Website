import React, { useRef , useEffect, ForwardedRef } from "react";
import useEventListener from "@/hooks/useEventListener";
import useForwardRef from "@/hooks/useForwardRef";

const GenericSubsection = React.forwardRef(({ children , title }: { children?: JSX.Element[] | JSX.Element, title: string }, ref: ForwardedRef<HTMLHeadingElement>) => {
    const thisElementRef = useForwardRef<HTMLHeadingElement>(ref);
    const titleElementRef = useRef<HTMLHeadingElement>(null);
    const titleElementUnderlineRef = useRef<HTMLDivElement>(null);
    const childrenElementRef = useRef<HTMLDivElement>(null);

    useEventListener('scroll', (e: Event) => {
        if (!thisElementRef.current) return;
        if (!titleElementRef.current) return;
        if (!titleElementUnderlineRef.current) return;
        if (!childrenElementRef.current) return;
        // Calculate the distance from the top of the page to the top of the parent element
        const thisElementPageTopDistance = thisElementRef.current.getBoundingClientRect().top + window.scrollY;
        // Calculate how much of the parent element is visible on the viewport
        let thisElementVisualRelevance = (window.innerHeight - Math.abs((thisElementPageTopDistance + 200) - window.scrollY)) / window.innerHeight;
        // If the element is not visible at all, set the visual relevance to 0
        thisElementVisualRelevance = thisElementVisualRelevance < 0 ? 0 : thisElementVisualRelevance;
        thisElementVisualRelevance = thisElementVisualRelevance > 1 ? 1 : thisElementVisualRelevance;
        // If the element's visibility is passed a threshold, set the visual relevance to 1
        //thisElementVisualRelevance = thisElementVisualRelevance >  ? 1 : thisElementVisualRelevance;
        // Set the width of the underline relative to the parent element's visual relevance
        titleElementUnderlineRef.current.style.width = `${100 * thisElementVisualRelevance}px`;
        if (thisElementVisualRelevance > 0.1 && thisElementVisualRelevance < 0.9) {
            childrenElementRef.current.style.opacity = `1`;
        } else {
            childrenElementRef.current.style.opacity = `0`;
        }
    });

    return (
        <>
        <div ref={thisElementRef} className="relative w-full h-auto z-50 bg-gradient-b from-transparent to-secondary-900 px-5 flex ">
            <div ref={titleElementUnderlineRef} className="w-0 h-[5px] mt-[25px] bg-primary-500 rounded-sm"></div>
            <div className="h-auto w-auto">
                <div className="flex w-full h-auto items-center">
                    <h1 ref={titleElementRef} className="flex-shrink text-5xl inline-block text-secondary-100 pl-4 font-semibold">
                        { title }
                    </h1>
                </div>
                <div ref={childrenElementRef} className="transition-all w-auto h-auto max-h-full max-w-full">
                    { children }
                </div>
            </div>
        </div>
        
        </>
    )
})

export default GenericSubsection;