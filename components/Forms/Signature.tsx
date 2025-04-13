import { ReactSketchCanvas } from "react-sketch-canvas";
import type { ReactSketchCanvasRef } from "react-sketch-canvas";
import { Button } from "@heroui/react";
import { useRef } from "react";

const Signature = () => {
  // const canvasRef = useRef(null);
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  return (
    <div>
      <ReactSketchCanvas
        ref={canvasRef}
        style={{ border: "1px solid black", height: "200px", color: "black" }}
      />
      <Button onClick={() => canvasRef.current?.clearCanvas()}>
        Clear Signature
      </Button>
    </div>
  );
};

export default Signature;
