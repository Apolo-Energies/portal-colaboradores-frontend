import React, { useRef, useState } from "react";

import { Upload, X } from "lucide-react";
import { cn } from "@/utils/utils";

const acceptedFormats = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/bmp",
  "image/tiff",
  "application/pdf",
];

interface Props {
  onFileSelect: (file: File | string) => void;
}

export const DropzoneUpload = ({ onFileSelect }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hovering, setHovering] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHovering(false);

    const droppedFile = e.dataTransfer.files[0];
    const droppedUrl = e.dataTransfer.getData("text/plain");

    if (droppedFile) {
      if (acceptedFormats.includes(droppedFile.type)) {
        const url = URL.createObjectURL(droppedFile);
        setPreview(url);
        onFileSelect(droppedFile);
      } else {
        alert("Formato no soportado.");
      }
    } else if (droppedUrl) {
      setPreview(droppedUrl);
      onFileSelect(droppedUrl);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && acceptedFormats.includes(file.type)) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onFileSelect(file);
    } else {
      alert("Formato no soportado.");
    }
  };

  const handleClear = () => {
    setPreview(null);
    onFileSelect("");
  };

  return (
    <>
      <p className="text-sm font-semibold text-muted-foreground mb-2">
        Sube la factura
      </p>
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setHovering(true);
        }}
        onDragLeave={() => setHovering(false)}
        onDrop={handleDrop}
        className={cn(
          "w-full min-h-[200px] bg-info-bg rounded-xl border border-dashed border-blue-300 px-6 py-4 flex flex-col items-center justify-center text-center transition relative cursor-pointer",
          hovering && "ring-2 ring-blue-400"
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept={acceptedFormats.join(",")}
          className="hidden"
          onChange={handleFileChange}
        />
        {preview ? (
          <div className="relative w-full flex flex-col items-center space-y-2">
            {preview.endsWith(".pdf") ? (
              <p className="text-sm text-muted-foreground">
                📄 Archivo PDF cargado
              </p>
            ) : (
              <img
                src={preview}
                alt="preview"
                className="max-h-40 rounded-md object-contain"
              />
            )}
            <button
              onClick={handleClear}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <>
            <Upload className="w-8 h-8 text-info-subtext" strokeWidth={1.5} />
            <p className="text-sm font-semibold text-muted-foreground mt-2">
              Haz clic o arrastra un archivo (PDF o imagen)
            </p>
            <p className="text-xs text-muted-foreground">
              JPG, PNG, WEBP, BMP, TIFF, PDF
            </p>
          </>
        )}
      </div>
    </>
  );
};
