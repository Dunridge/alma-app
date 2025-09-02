"use client";

import { useState } from "react";

type Props = {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
};

export default function FormFileInput({ label, file, onChange }: Props) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onChange(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onChange(e.target.files[0]);
    } else {
      onChange(null);
    }
  };

  return (
    <div
      className={`immigration-form__group immigration-form__group--file-upload ${
        isDragging ? "drag-hover" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label className="immigration-form__group-title">{label}</label>
      {!file && (
        <div className="immigration-form__group--file-upload-placeholder">
          Drag&Drop your file
        </div>
      )}
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleChange}
        className="immigration-form__file-input"
      />
      {file && <p>Selected file: {file.name}</p>}
    </div>
  );
}
