"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const visaOptions = ["O-1", "EB-1A", "EB-2 NIW", "I don't know"];

export default function ImmigrationAssessmentForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    linkedin: "",
    visaCategories: [] as string[],
    helpText: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (option: string) => {
    setFormData((prev) => {
      const visaCategories = prev.visaCategories.includes(option)
        ? prev.visaCategories.filter((v) => v !== option)
        : [...prev.visaCategories, option];
      return { ...prev, visaCategories };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // route to the submitted page
    router.push("/submitted");
  };

  // TODO: add components for the inputs
  return (
    <div className="immigration-form">
      <div className="immigration-form__header">
        <h1 className="immigration-form__title">
          Get An Assessment Of Your Immigration Case
        </h1>
      </div>

      <form className="immigration-form__body" onSubmit={handleSubmit}>
        <div className="immigration-form__intro">
          <p className="immigration-form__intro-title">
            Want to understand your visa options?
          </p>
          <p className="immigration-form__intro-text">
            Submit the form below and our team of experienced attorneys will
            review your information and send a preliminary assessment of your
            case based on your goals.
          </p>
        </div>

        <div className="immigration-form__group">
          {/* TODO: make input component */}
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="immigration-form__input"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="immigration-form__input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="immigration-form__input"
          />
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="immigration-form__select"
          >
            <option value="">Country of Citizenship</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="IN">India</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn / Personal Website URL"
            value={formData.linkedin}
            onChange={handleChange}
            className="immigration-form__input"
          />
        </div>

        <div className="immigration-form__group">
          <p className="immigration-form__group-title">
            Visa categories of interest?
          </p>
          {visaOptions.map((option) => (
            <label key={option} className="immigration-form__checkbox-label">
              <input
                type="checkbox"
                checked={formData.visaCategories.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="immigration-form__checkbox"
              />
              {option}
            </label>
          ))}
        </div>

        <div className="immigration-form__group">
          <p className="immigration-form__group-title">How can we help you?</p>
          <textarea
            name="helpText"
            value={formData.helpText}
            onChange={handleChange}
            placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
            className="immigration-form__textarea"
          />
        </div>

        <button type="submit" className="immigration-form__submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
