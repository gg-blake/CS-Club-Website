import { useEffect } from 'react';

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
  

export default function MatrixCanvas({ scroll } : { scroll: number }) {
    useEffect(() => {
        // Get the canvas node and the drawing context
        const canvas = document.getElementById('canv') as HTMLCanvasElement;

        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        // set the width and height of the canvas
        const w = canvas.width = window.innerWidth;
        const h = canvas.height = window.innerHeight;

        // draw a black rectangle of width and height same as that of the canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, w, h);

        const cols = Math.floor(w / 20) + 1;
        const ypos = Array(cols).fill(0);

        function matrix () {
            if (!ctx) return;

            // Draw a semitransparent black rectangle on top of previous drawing
            ctx.fillStyle = '#0001';
            ctx.fillRect(0, 0, w, h);
          
            // Set color to green and font to 15pt monospace in the drawing context
            ctx.fillStyle = '#C13DDA';
            ctx.font = '15pt monospace';
          
            // for each column put a random character at the end
            ypos.forEach((y, ind) => {
                // generate a random character
                const text = String.fromCharCode(Math.random() * 128);
                //const text = String.fromCharCode(getRandomInt(0xfeff3041, 0xfeff30fe));
            
                // x coordinate of the column, y coordinate is already given
                const x = ind * 20;
                // render the character at (x, y)
                ctx.fillText(text, x, y);
            
                // randomly reset the end of the column if it's at least 100px high
                if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
                // otherwise just move the y coordinate for the column 20px down,
                else ypos[ind] = y + 20;
                
            });
        }

        setInterval(matrix, 50);
    }, [])
    
    return (
        <div className="absolute w-full h-full flex z-10">
            
            <canvas className="z-0" width={window.innerWidth} height={window.innerHeight} id="canv" />
            <div className={`matrix absolute w-full h-full  z-20 transition-all bg-gradient-to-b from-transparent to-[#000000]`}></div>
        </div>
    )
}