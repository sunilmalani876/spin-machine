import React, { useEffect, useRef } from "react";
import PixiNewApp from "./pixiNewApp";

const PixiCanvas = () => {
  const pixiCanvasRef = useRef(null);

  useEffect(() => {
    const app = PixiNewApp();

    if (pixiCanvasRef.current) {
      pixiCanvasRef.current.appendChild(app.view);
    }

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", app.resize);
      app.destroy(true, { children: true });
    };
  }, []);

  return (
    <div
      ref={pixiCanvasRef}
      style={{ overflow: "hidden", width: "100vw", height: "100vh" }}
    />
  );
};

export default PixiCanvas;
