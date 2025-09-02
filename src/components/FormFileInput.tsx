"use client";

type Props = {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
};

export default function FormFileInput({ label, file, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onChange(e.target.files[0]);
    } else {
      onChange(null);
    }
  };

  return (
    <div className="immigration-form__group">
      <label className="immigration-form__group-title">{label}</label>
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
