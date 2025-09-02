"use client";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  options: Option[];
  selectedValues: string[];
  onChange: (value: string) => void;
};

export default function FormCheckboxGroup({
  label,
  options,
  selectedValues,
  onChange,
}: Props) {
  return (
    <div className="immigration-form__group">
      <div className="immigration-form__group-container">
        <p className="immigration-form__group-title">{label}</p>
        {options.map((option) => (
          <label
            key={option.value}
            className="immigration-form__checkbox-label"
          >
            <input
              type="checkbox"
              checked={selectedValues.includes(option.value)}
              onChange={() => onChange(option.value)}
              className="immigration-form__checkbox"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}
