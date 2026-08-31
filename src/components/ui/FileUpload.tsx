"use client";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function FileUpload({
  value,
  accept,
  showValueText = true,
  previewClassName = "h-12 w-12",
  onChange,
}: {
  value?: File | string;
  accept?: Record<string, string[]>;
  showValueText?: boolean;
  previewClassName?: string;
  onChange: (file?: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>();

  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    if (typeof value === "string" && value) {
      setPreview(value);
      return;
    }
    setPreview(undefined);
  }, [value]);

  const { getRootProps, isDragActive } = useDropzone({
    accept,
    multiple: false,
    noClick: true,
    noDragEventsBubbling: true,
    onDrop: (files) => {
      if (files[0]) onChange(files[0]);
    },
  });

  // Accept string like "image/*" for the native input
  const acceptString = accept ? Object.keys(accept).join(",") : undefined;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onChange(file);
    // Reset so selecting the same file again still triggers onChange
    e.target.value = "";
  };

  return (
    <div>
      {/* Hidden native input — completely independent from dropzone */}
      <input
        ref={inputRef}
        type="file"
        accept={acceptString}
        className="hidden"
        onChange={handleInputChange}
      />

      {!value && (
        <div
          {...getRootProps()}
          onClick={() => inputRef.current?.click()}
          className={`cursor-pointer rounded-[2px] border border-dashed p-6 text-center transition ${
            isDragActive ? "border-primary bg-blue-50" : "border-app-border bg-white"
          }`}
        >
          <UploadCloud className="mx-auto mb-3 text-primary" size={28} />
          <p className="text-sm font-semibold">
            Glisser-déposer un fichier ou cliquer pour parcourir
          </p>
          <p className="mt-1 text-xs text-text-muted">Images, PDF ou documents selon le champ</p>
        </div>
      )}

      {value && (
        <div className="mt-3 flex items-center justify-between rounded-[2px] bg-app-bg p-3 text-sm">
          <div className="flex items-center gap-3">
            {preview && (
              <img
                src={preview}
                alt=""
                className={`${previewClassName} rounded-[2px] object-cover`}
              />
            )}
            {showValueText && <span>{value instanceof File ? value.name : value}</span>}
          </div>
          <button
            className="rounded-[2px] p-2 text-danger hover:bg-red-50"
            onClick={(e) => {
              e.stopPropagation();
              onChange(undefined);
            }}
            type="button"
            aria-label="Retirer"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
