import { FC, useEffect, useRef, useState, RefObject, useCallback, createRef, useContext, ReactNode, createContext } from "react";

// Interface for a JSX element with a key
interface KeyedElement {
    children: string;
    key: string | number;
}

// Each child of the carousel must be a an JSX element with a defined key
type CarouselElement = JSX.Element & KeyedElement;

// Interface for the carousel component props
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

// Carousel elements are stored in the map as ref and the carousel element
type Link = {
    ref: RefObject<HTMLDivElement>;
    node: CarouselElement;
};

// Interface for the map of containers to their respective carousel elements
interface LinkToContainer {
    [key: string]: Link;
}

// Interface for the carousel index context; stores the state and the dispatch function
interface CarouselIndexContextProps {
    carouselIndex: number;
    setCarouselIndex: React.Dispatch<React.SetStateAction<number>>;
}

// Context to keep track of the current index of the carousel
const CarouselIndexContext = createContext<CarouselIndexContextProps>({
    carouselIndex: 0,
    setCarouselIndex: () => {},
})

// Returns the necessary padding needed to prevent the last element from being clipped by the carousel
function getPaddingOffset(childWidth: number, containerWidth: number, numberOfChildren: number) {
    // Calculate the amount how big a child is allowed to fit in the container
    const maxWidthPerChild = containerWidth / numberOfChildren;
    // Calculate the difference between the child width and the max width of the children
    const averageWidthDelta = childWidth - maxWidthPerChild;
    // Check if the child width is greater than the max width per child
    if (averageWidthDelta > 0) {
        // Return the difference between the child width and the max width per child
        return averageWidthDelta;
    } else {
        // Return 0 if the child width is less than the max width per child
        return 0;
    }
}

// Returns the index of the smallest number in an array
function findMinIndex(array: number[]) {
    let minIndex = 0;
    for (let i = 1; i < array.length; i++) {
        if (array[i] < array[minIndex]) {
            minIndex = i;
        }
    }
    return minIndex;
}

// Returns the index of the largest number in an array
function findMaxIndex(array: number[]) {
    let maxIndex = 0;
    for (let i = 1; i < array.length; i++) {
        if (array[i] > array[maxIndex]) {
            maxIndex = i;
        }
    }
    return maxIndex;
}

// Returns the keyframes for the carousel element animation
function getCarouselElementKeyframes(containerAngle: number, containerWidth: number, containerCount: number, containerPaddingRight: number) {
    return (
    `
    @keyframes slide-out {
        0% {
            z-index: 99999;
            opacity: 1;
            transform: translateY(0) rotate(${-containerAngle}deg);
        }
        100% {
            z-index: 99999;
            opacity: 0;
            transform: translateY(-100px) rotate(${-containerAngle}deg);
        }
    }

    @keyframes slide-in {
        0% {
            opacity: 0;
            transform: translateY(100px) rotate(${-containerAngle}deg);
            left: ${containerWidth - ((containerWidth - containerPaddingRight) / containerCount) - containerPaddingRight}px;
            z-index: 0;
        }
        100% {
            opacity: 1;
            transform: translateY(0) rotate(${-containerAngle}deg);
            left: ${containerWidth - ((containerWidth - containerPaddingRight) / containerCount) - containerPaddingRight}px;
            z-index: 0;
        }
    }
    `
    )
};


const Carousel: FC<CarouselProps> = (props: CarouselProps) => {
    // List of carousel containers
    const [containerRefs, setContainerRefs] = useState<JSX.Element[]>([]);
    // Index of the element that is at the front of the carousel
    const [carouselIndex, setCarouselIndex] = useState<number>(0);
    // List of carousel containers and their corresponding element refs
    const containerRefsMap = useRef<LinkToContainer>({});
    // Ref to the carousel container
    const carouselRef = useRef<HTMLDivElement>(null);
    // Stores the required padding needed to prevent last element from being clipped
    const paddingRight = getPaddingOffset(props.childWidth, props.containerWidth, props.children.length);

    // Find the index of the element that is at the front of the carousel
    const frontElementIndex = () => findMinIndex(Object.values(containerRefsMap.current).map(element => element.ref.current?.offsetLeft || 0));

    // Find the index of the element that is at the back of the carousel
    const backElementIndex = () => findMaxIndex(Object.values(containerRefsMap.current).map(element => element.ref.current?.offsetLeft || 0));

    // Moves the top container to the back of the carousel and shifts the other containers forward
    const cycle = useCallback(() => {
        setContainerRefs((prevImageRefs: JSX.Element[]) => {
          const first = prevImageRefs[0];
          const rest = prevImageRefs.slice(1);
          return [...rest, first];
        });
        setCarouselIndex(frontElementIndex() || 0);
    }, []);

    // Creates a map of the carousel elements and their corresponding element containers
    // This is used to track the position of the element containers in the DOM
    // This allows us to find where the element smoothly transitions to once the images are cycled
    const mapChildrenToContainers = useCallback(() => {
        // Populated the carousel with element containers
        props.children.forEach((child: CarouselElement, index: number) => {
            // Prevents overflow of element containers
            if (containerRefs.length === props.children.length) return;
            // Create a ref for each element container
            const containerElementRef = createRef<HTMLDivElement>();
            // Give the container element a key so that React can track it
            const containerElement = <div ref={containerElementRef} key={`container-element-${index}`} className="flex-grow h-full" />;
            // Used to track the contaier element position in the DOM
            // This allows us to find where the element smoothly transitions to once the images are cycled
            containerRefsMap.current[child.key] = {
                ref: containerElementRef,
                node: child,
            };
            // Add the container element to the imageRefs array
            setContainerRefs((prevContainerRefs) => [...prevContainerRefs, containerElement]);
        })
    }, [props.children])

    // Returns the style for a carousel element
    const getElementStyle = (element: Link, index: number, duration: number, angle: number) => {
        return {
        zIndex: window.innerWidth - Math.round(element.ref.current?.offsetLeft!), 
        left: `${element.ref.current?.offsetLeft}px`, transitionDelay: `${backElementIndex() != index ? 0 : duration - 150}ms`, 
        animation: (backElementIndex() === index) ? `slide-out ${duration/2}ms ease-in-out, slide-in ${duration/2}ms ease-in-out ${duration/2}ms` : "", 
        transform: `rotate(${-angle}deg)`
        }
    }

    // Returns the style for the carousel
    const getCarouselStyle = (containerAngle: number, containerWidth: number, containerPaddingRight: number) => {
        return {
        transform: `rotate(${containerAngle}deg)`, 
        width:`${containerWidth + paddingRight}px`, 
        paddingRight: `${containerPaddingRight}px` 
        }
    };

    // Returns a list of carousel elements
    const carouselElements = Object.values(containerRefsMap.current).map((element, index) => {
        return (
        <div 
        style={getElementStyle(element, index, props.duration, props.containerAngle)} 
        className="absolute w-auto h-auto transition-[transform_opacity] opacity-1">
        {element.node}
        </div>
        )
    })
    
    // On page render and when the children prop changes, populate the carousel with element containers
    useEffect(mapChildrenToContainers, [props.children]);
    // On page render, begin the auto cycle of the carousel elements
    useEffect(() => {
        // Auto cycle the images
        let cycleInterval = setInterval(cycle, props.interval);
        return () => clearInterval(cycleInterval);
    }, []);

    return (
    <div 
    ref={carouselRef} 
    style={getCarouselStyle(props.containerAngle, props.containerWidth, paddingRight)} 
    className="flex flex-row h-auto">
        <style>
            {getCarouselElementKeyframes(props.containerAngle, carouselRef.current?.offsetWidth!, containerRefs.length, paddingRight)}
        </style>
        {containerRefs}
        <CarouselIndexContext.Provider value={{carouselIndex, setCarouselIndex}}>
            {carouselElements}
        </CarouselIndexContext.Provider>
    </div>
    )
}

export type {CarouselElement};
export {Carousel, CarouselIndexContext};