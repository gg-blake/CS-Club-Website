export default function GenericParagraph({ children , className } : { children? : string , className? : string }) {
    return (
        <div className={`w-full h-auto flex gap-4 ${className}`}>
            <div className={"font-bold w-auto h-full text-primary-500 text-2xl"}>{"➔"}</div>
            <p className={"w-auto h-auto"}>
                {children}
            </p>
        </div>
    )
}