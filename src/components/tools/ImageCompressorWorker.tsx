"use client";
import { useEffect } from "react";
import imageCompression from "browser-image-compression";

interface Props {
  file: File;
  quality: number;
  maxWidth: number;
  onResult: (r: { blob: Blob; url: string; size: number }) => void;
  onError: (e: string) => void;
  onLoading: (l: boolean) => void;
}

export default function ImageCompressorWorker({ file, quality, maxWidth, onResult, onError, onLoading }: Props) {
  useEffect(() => {
    let objectUrl = "";
    onLoading(true);

    imageCompression(file, {
      maxSizeMB: 10,
      maxWidthOrHeight: maxWidth,
      initialQuality: quality / 100,
      useWebWorker: true,
    })
      .then((compressed) => {
        objectUrl = URL.createObjectURL(compressed);
        onResult({ blob: compressed, url: objectUrl, size: compressed.size });
        onLoading(false);
      })
      .catch((err) => {
        onError(err.message ?? "Compression failed");
        onLoading(false);
      });

    return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, quality, maxWidth]);

  return null;
}
