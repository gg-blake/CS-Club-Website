export default function GenericTimestamp({ className, date, time , icon=false } : { className?: string, date : string, time? : string , icon? : boolean }) {
    return (
        <span className={`whitespace-nowrap w-auto flex flex-row items-center gap-2 ${className}`}>
            <h3 className="inline-block">{ date }</h3>
            { time && 
            <><div className="w-[5px] h-[5px] bg-secondary-200 opacity-[25%] rounded-full mt-[2px]" />
            <h3 className="inline-block">{ time }</h3></>
            }
        </span>
    )
}