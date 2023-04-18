import "./module.glitch-text.css";



export default function GlitchText({ children , className , complexity=3 }: { children: string , className?: string , complexity?: number }) {
    const spanList = [];
    for (let i = 0; i < complexity; i++) {
        // tslint:disable-next-line: no-default-export
        spanList.push(<span style={{"--index": i}}>{ children }</span>);
    }

    return (
        <div className={`container ${ className }`}>
            <div className="stack" style={{"--stacks": complexity}}>
                { spanList }
            </div>
        </div>
    )
}