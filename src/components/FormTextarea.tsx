"use client";

type Props = {
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
};

export default function FormTextarea({
  name,
  value,
  placeholder,
  onChange,
  className = "",
}: Props) {
  return (
    <textarea
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={className}
    />
  );
}
