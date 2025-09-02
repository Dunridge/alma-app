"use client";

type Props = {
  type?: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function FormInput({
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  className = "",
}: Props) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={className}
    />
  );
}
