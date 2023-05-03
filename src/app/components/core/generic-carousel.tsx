import React, { FC, useEffect, useRef, useState, RefObject, useCallback, createRef, useContext, ReactNode } from "react";

interface KeyedElement {
    children: string;
    key: string;
}

type CarouselElement = JSX.Element & KeyedElement;

interface CarouselProps {
    children: CarouselElement[];
    interval: number;
    duration: number;
    containerWidth: number;
    containerHeight: number;
    containerAngle: number;
    childWidth: number;
    childHeight: number;
}

interface LinkToContainer {
    [key: string]: {
        ref: RefObject<HTMLDivElement>;
        node: CarouselElement;
    };
}

interface CarouselIndexContextProps {
    carouselIndex: number;
    setCarouselIndex: React.Dispatch<React.SetStateAction<number>>;
}

const CarouselIndexContext = React.createContext<CarouselIndexContextProps>({
    carouselIndex: 0,
    setCarouselIndex: () => {},
})

const Carousel: FC<CarouselProps> = (props: CarouselProps) => {
    const [containerRefs, setContainerRefs] = useState<JSX.Element[]>([]);
    const [carouselIndex, setCarouselIndex] = useState<number>(0);
    const containerRefsMap = useRef<LinkToContainer>({});
    const carouselRef = useRef<HTMLDivElement>(null);
    // Calculate the required padding needed to prevent last element from being clipped
    const paddingRight = props.childWidth - (props.containerWidth / props.children.length) > 0 ? props.childWidth - (props.containerWidth / props.children.length) : 0;
    // Moves the top element to the back of the carousel and shifts the other images forward
    const cycle = useCallback(() => {
        setContainerRefs((prevImageRefs: JSX.Element[]) => {
          const first = prevImageRefs[0];
          const rest = prevImageRefs.slice(1);
          return [...rest, first];
        });
        setCarouselIndex(findMinIndex() || 0);
    }, []);

    useEffect(() => {
        // Populated the carousel with element containers
        props.children.forEach((child, childIndex: number) => {
            // Prevents overflow of element containers
            if (containerRefs.length === props.children.length) return;
            // Create a ref for each element container
            const containerElementRef = createRef<HTMLDivElement>();
            // Give the container element a key so that React can track it
            const containerElement = <div ref={containerElementRef} key={`container-element-${childIndex}`} className="flex-grow h-full" />;
            // Used to track the contaier element position in the DOM
            // This allows us to find where the element smoothly transitions to once the images are cycled
            containerRefsMap.current[child.key] = {
                ref: containerElementRef,
                node: child,
            };
            // Add the container element to the imageRefs array
            setContainerRefs((prevContainerRefs) => [...prevContainerRefs, containerElement]);
        });
    }, [props.children]);

    useEffect(() => {
        // Auto cycle the images
        let cycleInterval = setInterval(cycle, props.interval);
        return () => clearInterval(cycleInterval);
    }, []);

    function findMaxIndex() {
        const arr = Object.values(containerRefsMap.current).map(element => element.ref.current?.offsetLeft || 0);
        if (!arr) return;
        let maxIndex = 0;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > arr[maxIndex]) {
                maxIndex = i;
            }
        }
        return maxIndex;
    }

    function findMinIndex() {
        const arr = Object.values(containerRefsMap.current).map(element => element.ref.current?.offsetLeft || 0);
        if (!arr) return;
        let minIndex = 0;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[minIndex]) {
                minIndex = i;
            }
        }
        return minIndex;
    }

    return (
        <div ref={carouselRef} style={{transform: `rotate(${props.containerAngle}deg)`, width:`${props.containerWidth + paddingRight}px`, paddingRight: `${paddingRight}px` }} className={`flex flex-row h-auto`}>
            <style>
                {`

                    @keyframes slide-out {
                        0% {
                            z-index: 99999;
                            opacity: 1;
                            transform: translateY(0) rotate(${-props.containerAngle}deg);
                        }
                        100% {
                            z-index: 99999;
                            opacity: 0;
                            transform: translateY(-100px) rotate(${-props.containerAngle}deg);
                        }
                    }

                    @keyframes slide-in {
                        0% {
                            opacity: 0;
                            transform: translateY(100px) rotate(${-props.containerAngle}deg);
                            left: ${carouselRef.current?.offsetWidth! - ((carouselRef.current?.offsetWidth! - paddingRight) / containerRefs.length) - paddingRight}px;
                            z-index: 0;
                        }
                        100% {
                            opacity: 1;
                            transform: translateY(0) rotate(${-props.containerAngle}deg);
                            left: ${carouselRef.current?.offsetWidth! - ((carouselRef.current?.offsetWidth! - paddingRight) / containerRefs.length) - paddingRight}px;
                            z-index: 0;
                        }
                    }
                `}
            </style>
            {containerRefs}
            <CarouselIndexContext.Provider value={{carouselIndex, setCarouselIndex}}>
                {Object.values(containerRefsMap.current).map((element, index) => {
                    return (
                        <div style={{zIndex: window.innerWidth - Math.round(element.ref.current?.offsetLeft!), left: `${element.ref.current?.offsetLeft}px`, transitionDelay: `${findMaxIndex() != index ? 0 : props.duration - 150}ms` , animation: (findMaxIndex() === index) ? `slide-out ${props.duration/2}ms ease-in-out, slide-in ${props.duration/2}ms ease-in-out ${props.duration/2}ms` : "", transform: `rotate(${-props.containerAngle}deg)`}} className={`absolute w-auto h-auto transition-[transform_opacity] opacity-1`}>
                            { element.node }
                        </div>
                    )
                })}
            </CarouselIndexContext.Provider>

        </div>
    )
}

export type {CarouselElement};
export {Carousel, CarouselIndexContext};