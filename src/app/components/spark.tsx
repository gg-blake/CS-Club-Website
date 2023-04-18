import React, { useRef, useEffect } from 'react';

const Spark = ({ width, height, color }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const sparks = [];

    const createSpark = (x, y) => {
      const spark = {
        x,
        y,
        vx: Math.random() * 10 - 5,
        vy: Math.random() * 10 - 5,
        radius: 2 + Math.random() * 2,
        alpha: 1,
        color,
      };
      sparks.push(spark);
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < sparks.length; i++) {
        const spark = sparks[i];
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.alpha -= 0.02;
        spark.radius -= 0.05;

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(${spark.color.join(',')}, ${spark.alpha})`;
        ctx.fill();
      }

      sparks.splice(
        sparks.findIndex((spark) => spark.alpha <= 0),
        1
      );

      if (Math.random() < 0.1) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        createSpark(x, y);
      }

      requestAnimationFrame(render);
    };

    render();
  }, [width, height, color]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Spark;