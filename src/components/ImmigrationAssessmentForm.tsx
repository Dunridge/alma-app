"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import like from "@/assets/svg/like.svg";
import category from "@/assets/svg/category.svg";
import info from "@/assets/svg/info.svg";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import FormCheckboxGroup from "./FormCheckboxGroup";
import FormFileInput from "./FormFileInput";
import { Lead } from "@/types";

const visaOptions = ["O-1", "EB-1A", "EB-2 NIW", "I don't know"];

export default function ImmigrationAssessmentForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<Lead>({
    firstName: "",
    lastName: "",
    email: "",
    linkedin: "",
    visas: [] as string[],
    resume: null as File | null,
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (option: string) => {
    setFormData((prev) => {
      const visas = prev.visas.includes(option)
        ? prev.visas.filter((v) => v !== option)
        : [...prev.visas, option];
      return { ...prev, visas };
    });
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, resume: file }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.linkedin.trim())
      newErrors.linkedin = "LinkedIn/website is required";
    if (formData.visas.length === 0)
      newErrors.visas = "Select at least one visa category";

    if (!formData.message.trim()) {
      newErrors.message = "Please describe your case";
    } else if (formData.message.length < 20) {
      newErrors.message = "Message must be at least 20 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("linkedin", formData.linkedin);
    formData.visas.forEach((visa) => formDataToSend.append("visas", visa));
    formDataToSend.append("message", formData.message);

    if (formData.resume) {
      formDataToSend.append("resume", formData.resume);
    }

    const res = await fetch("/api/leads", {
      method: "POST",
      body: formDataToSend,
    });

    if (!res.ok) {
      const err = await res.json();
      console.error(err);
      alert(err.error || "Something went wrong");
      return;
    }

    const newLead = await res.json();
    console.log("Form submitted:", newLead);
    router.push("/submitted");
  };

  return (
    <div className="immigration-form">
      <form className="immigration-form__body" onSubmit={handleSubmit}>
        <div className="immigration-form__intro">
          <Image src={info} alt="Info" width={64} height={64} />
          <p className="immigration-form__intro-title">
            Want to understand your visa options?
          </p>
          <p className="immigration-form__intro-text">
            Submit the form below and our team of experienced attorneys will
            review your information.
          </p>
        </div>

        <div className="immigration-form__group">
          <FormInput
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="immigration-form__input"
          />
          {errors.firstName && (
            <p className="immigration-form__input-error-text">
              {errors.firstName}
            </p>
          )}

          <FormInput
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="immigration-form__input"
          />
          {errors.lastName && (
            <p className="immigration-form__input-error-text">
              {errors.lastName}
            </p>
          )}

          <FormInput
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="immigration-form__input"
          />
          {errors.email && (
            <p className="immigration-form__input-error-text">{errors.email}</p>
          )}

          <FormInput
            name="linkedin"
            placeholder="LinkedIn / Personal Website URL"
            value={formData.linkedin}
            onChange={handleChange}
            className="immigration-form__input"
          />
          {errors.linkedin && (
            <p className="immigration-form__input-error-text">
              {errors.linkedin}
            </p>
          )}
        </div>

        <div className="immigration-form__group">
          <Image src={category} alt="Category" width={64} height={64} />
          <div className="immigration-form__group-container">
            <FormCheckboxGroup
              label="Visa categories of interest?"
              options={visaOptions.map((v) => ({ label: v, value: v }))}
              selectedValues={formData.visas}
              onChange={handleCheckboxChange}
            />
            {errors.visas && (
              <p className="immigration-form__input-error-text">
                {errors.visas}
              </p>
            )}
          </div>
        </div>

        <FormFileInput
          label="Resume / CV (file upload)"
          file={formData.resume}
          onChange={handleFileChange}
        />
        {/* {errors.resume && <p className="error-text">{errors.resume}</p>} */}

        <div className="immigration-form__group">
          <Image src={like} alt="Like" width={64} height={64} />
          <div className="immigration-form__group-container">
            <p className="immigration-form__group-title">
              How can we help you?
            </p>
            <FormTextarea
              name="message"
              placeholder="Describe your case..."
              value={formData.message}
              onChange={handleChange}
              className="immigration-form__textarea"
            />
          </div>

          {errors.message && (
            <p className="immigration-form__input-error-text">
              {errors.message}
            </p>
          )}
        </div>

        <button type="submit" className="immigration-form__submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
