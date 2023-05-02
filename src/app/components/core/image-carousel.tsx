import { FC, useEffect, useRef, useState, RefObject, useCallback, createRef, useContext } from "react";
import LangContent from "@/app/components/types/lang-content";
import { LangContext } from "@/app/components/context/lang-context";

interface ImageCarouselItem {
    filename: string;
    alt: LangContent;
}

interface ImageCarouselOPTPRops {
    images: ImageCarouselItem[];
    interval: number;
    duration: number;
    containerWidth: number;
    containerHeight: number;
    containerAngle: number;
    childWidth: number;
    childHeight: number;
}

interface ImageLinkToContainer {
    [key: string]: {
        ref: RefObject<HTMLDivElement>;
        image: ImageCarouselItem;
    };
}

const ImageCarouselOPT: FC<ImageCarouselOPTPRops> = ({ images, interval, duration, containerWidth, containerHeight, containerAngle, childWidth, childHeight }) => {
    const { lang } = useContext(LangContext);
    const [imageContainerRefs, setImageContainerRefs] = useState<JSX.Element[]>([]);
    const imageContainerRefsMap = useRef<ImageLinkToContainer>({});
    const thisElementRef = useRef<HTMLDivElement>(null);
    // Calculate the required padding needed to prevent last image from being clipped
    const paddingRight = childWidth - (containerWidth / images.length) > 0 ? childWidth - (containerWidth / images.length) : 0;
    // Moves the top image to the back of the carousel and shifts the other images forward
    const cycle = useCallback(() => {
        setImageContainerRefs((prevImageRefs: JSX.Element[]) => {
          const first = prevImageRefs[0];
          const rest = prevImageRefs.slice(1);
          return [...rest, first];
        });
    }, []);

    useEffect(() => {
        // Populated the carousel with image containers
        images.forEach((currentImage, imageIndex: number) => {
            // Prevents overflow of image containers
            if (imageContainerRefs.length === images.length) return;
            // Create a ref for each image container
            const containerElementRef = createRef<HTMLDivElement>();
            // Give the container element a key so that React can track it
            const containerElement = <div ref={containerElementRef} key={`container-element-${imageIndex}`} className="flex-grow h-full" />;
            // Used to track the contaier element position in the DOM
            // This allows us to find where the image smoothly transitions to once the images are cycled
            imageContainerRefsMap.current[currentImage.filename] = {
                ref: containerElementRef,
                image: currentImage,
            };
            // Add the container element to the imageRefs array
            setImageContainerRefs((prevImageContainerRefs) => [...prevImageContainerRefs, containerElement]);
        });
    }, [images]);

    useEffect(() => {
        // Auto cycle the images
        let cycleInterval = setInterval(cycle, interval);
        return () => clearInterval(cycleInterval);
    }, []);

    function findMaxIndex() {
        const arr = Object.values(imageContainerRefsMap.current).map(element => element.ref.current?.offsetLeft || 0);
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
        const arr = Object.values(imageContainerRefsMap.current).map(element => element.ref.current?.offsetLeft || 0);
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
        <div ref={thisElementRef} style={{transform: `rotate(${containerAngle}deg)`, width:`${containerWidth + paddingRight}px`, paddingRight: `${paddingRight}px` }} className={`flex flex-row h-auto`}>
            <style>
                {`

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
                            left: ${thisElementRef.current?.offsetWidth! - ((thisElementRef.current?.offsetWidth! - paddingRight) / imageContainerRefs.length) - paddingRight}px;
                            z-index: 0;
                        }
                        100% {
                            opacity: 1;
                            transform: translateY(0) rotate(${-containerAngle}deg);
                            left: ${thisElementRef.current?.offsetWidth! - ((thisElementRef.current?.offsetWidth! - paddingRight) / imageContainerRefs.length) - paddingRight}px;
                            z-index: 0;
                        }
                    }
                `}
            </style>
            {imageContainerRefs}
            {Object.values(imageContainerRefsMap.current).map((element, index) => {
                return (
                    <div style={{zIndex: window.innerWidth - Math.round(element.ref.current?.offsetLeft!), left: `${element.ref.current?.offsetLeft}px`, transitionDelay: `${findMaxIndex() != index ? 0 : duration - 150}ms` , animation: (findMaxIndex() === index) ? `slide-out ${duration/2}ms ease-in-out, slide-in ${duration/2}ms ease-in-out ${duration/2}ms` : "", transform: `rotate(${-containerAngle}deg)`}} className={`absolute w-auto h-auto transition-[transform_opacity] opacity-1`}>
                        <img src={element.image.filename} alt={element.image.filename} style={{width: `${childWidth ? `${childWidth}px` : `${childHeight}px`}`, height: `${childHeight}px`}} className={`rounded-md object-cover transition-all ${findMinIndex() !== index ? "brightness-[25%] shadow-lg" : ""}`} />
                        <p style={{opacity: findMinIndex() === index ? 1 : 0}} className="absolute bottom--[20px] text-sm text-secondary-600 font-normal transition-opacity">{element.image.alt[lang]}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default ImageCarouselOPT;