import { FC, useEffect, useRef, useState, RefObject, useCallback, createRef } from "react";

interface ImageCarouselOPTPRops {
    images: string[];
    interval: number;
    width: number;
    height: number;
    angle: number;
}

interface ImageLinkToContainer {
    [key: string]: {
        ref: RefObject<HTMLDivElement>;
        index: number;
    };
}

const ImageCarouselOPT: FC<ImageCarouselOPTPRops> = ({ images, interval, width, height, angle }) => {
    const [imageRefs, setImageRefs] = useState<JSX.Element[]>([]);
    const [containerRefs, setContainerRefs] = useState<ImageLinkToContainer>({});

    

    const cycle = useCallback(() => {
        setImageRefs((prevImageRefs: JSX.Element[]) => {
          const first = prevImageRefs[0];
          const rest = prevImageRefs.slice(1);
          return [...rest, first];
        });
    }, []);

    const containerRefsMap = useRef<ImageLinkToContainer>({});

    useEffect(() => {
    images.forEach((image, index: number) => {
        if (imageRefs.length === images.length) return;
        
        const ref = createRef<HTMLDivElement>();
        const el = (
            <div ref={ref} key={`test-${index}`} className="flex-grow h-full bg-primary-400">
                {image}
            </div>
            );
        containerRefsMap.current[image] = {
            ref: ref,
            index: index,
        };
        setImageRefs((prevImageRefs) => [...prevImageRefs, el]);
    });
    }, [images]);

    const handleClick = () => {
        cycle();
        if (!containerRefsMap.current) return;
        console.log(Object.values(containerRefsMap.current).map(item => item.current.offsetLeft));
    }

    function findMaxIndex(arr) {
        let maxIndex = 0;
        for (let i = 1; i < arr.length; i++) {
          if (arr[i] > arr[maxIndex]) {
            maxIndex = i;
          }
        }
        return maxIndex;
    }

    return (
        <div onClick={() => handleClick()} className={`flex flex-row w-[${width}px] h-[${height}px]`}>
            {imageRefs}
            {Object.values(containerRefsMap.current).map((element, index) => {
                return (
                    <div style={{left: element.ref.current?.offsetLeft}} className="absolute w-[20px] h-[20px] bg-red-500 transition-all">{findMaxIndex(Object.values(containerRefsMap.current).map(element => element.ref.current?.offsetLeft))}</div>
                )
            })}
        </div>
    )
}

export default ImageCarouselOPT;