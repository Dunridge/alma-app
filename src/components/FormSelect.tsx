"use client";

import React from "react";

interface Option {
  label: string;
  value: string;
}

interface Props {
  name: string;
  value: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export default function FormSelect({
  name,
  value,
  options,
  onChange,
  className = "",
}: Props) {
  return (
    <select name={name} value={value} onChange={onChange} className={className}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
