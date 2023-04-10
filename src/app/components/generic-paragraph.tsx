export default function GenericParagraph({ children , className } : { children? : string , className? : string }) {
    return (
        <div className={`w-full h-auto flex gap-4 ${className}`}>
            
            <p className={"w-auto h-auto"}>
                <div className={"inline-block font-bold w-auto h-auto pr-2 translate-y-[2px] text-primary-500 text-2xl"}>{"➔"}</div>
                {children}
            </p>
        </div>
    )
}