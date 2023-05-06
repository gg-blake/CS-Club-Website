import { FC } from 'react';

const ThoughtBubble: FC<{ children : string }> = ({ children }) => {
    return (
        <div className='w-auto h-auto  translate-y-[-90px] translate-x-[30px] relative'>
            <div id="cloud-bubble-main" className='w-auto h-auto py-[10px] rounded-full border-[2px] border-secondary-400 bg-secondary-200 text-primary-300 font-bold px-[15px] flex justify-center text-center'>
                { children }
            </div>
            <div className="absolute bottom-0">
                <div id="cloud-bubble-a" className="w-[20px] h-[20px] rounded-full border-[2px] border-secondary-400 bg-secondary-200"></div>
                <div id="cloud-bubble-b" className="w-[17px] h-[17px] rounded-full border-[2px] border-secondary-400 bg-secondary-200"></div>
                <div id="cloud-bubble-c" className="w-[12px] h-[12px] rounded-full border-[2px] border-secondary-400 bg-secondary-200"></div>
            </div>
        </div>
    )
}

export default ThoughtBubble;