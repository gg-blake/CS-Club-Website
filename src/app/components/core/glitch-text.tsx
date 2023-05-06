import "@/app/module.glitch-text.css";



export default function GlitchText({ children , className , complexity=3 }: { children: string , className?: string , complexity?: number }) {
    const spanList = [];
    for (let i = 0; i < complexity; i++) {
        // @ts-ignore
        spanList.push(<span style={{"--index": i}}>{ children }</span>);
    }

    // @ts-ignore
    return (<div className={`container ${ className }`}><div className="stack" style={{"--stacks": complexity}}>
                { spanList }
            </div>
        </div>
    )
}