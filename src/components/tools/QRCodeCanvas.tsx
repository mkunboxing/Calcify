"use client";
import { useEffect, useRef } from "react";
import QRCode from "qrcode";

export default function QRCodeCanvas({ text, size }: { text: string; size: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, text, {
      width: size,
      margin: 2,
      color: { dark: "#000000", light: "#ffffff" },
    }).catch(console.error);
  }, [text, size]);

  function download() {
    if (!canvasRef.current) return;
    const a = document.createElement("a");
    a.href = canvasRef.current.toDataURL("image/png");
    a.download = "qrcode.png";
    a.click();
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="rounded-2xl overflow-hidden p-3 bg-white shadow-xl inline-block">
        <canvas ref={canvasRef} />
      </div>
      <button onClick={download} className="btn-secondary text-sm px-6 py-2">
        ⬇ Download PNG
      </button>
    </div>
  );
}
