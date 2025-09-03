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

/*
// Submit lead (POST)
await fetch("/api/leads", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ firstName, lastName, email, linkedin, visas, message }),
});

// Get all leads (GET)
const res = await fetch("/api/leads");
const leads = await res.json();

// Update
await fetch(`/api/leads/${leadId}`, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ status: "REACHED_OUT" }),
});

*/

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
      const visas = prev.visas.includes(option)
        ? prev.visas.filter((v) => v !== option)
        : [...prev.visas, option];
      return { ...prev, visas };
    });
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, resume: file }));
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Form submitted:", formData);
  //   router.push("/submitted");
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      linkedin: formData.linkedin,
      visas: formData.visas,
      message: formData.message,
    };

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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
          <Image src={info} alt="Like" width={64} height={64} />

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
          <FormInput
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="immigration-form__input"
          />

          <FormInput
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="immigration-form__input"
          />

          <FormInput
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="immigration-form__input"
          />

          <FormInput
            name="linkedin"
            placeholder="LinkedIn / Personal Website URL"
            value={formData.linkedin}
            onChange={handleChange}
            className="immigration-form__input"
          />
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
          </div>
        </div>

        <FormFileInput
          label="Resume / CV (file upload)"
          file={formData.resume}
          onChange={handleFileChange}
        />

        <div className="immigration-form__group">
          <Image src={like} alt="Like" width={64} height={64} />

          <div className="immigration-form__group-container">
            <p className="immigration-form__group-title">
              How can we help you?
            </p>

            <FormTextarea
              name="message"
              placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
              value={formData.message}
              onChange={handleChange}
              className="immigration-form__textarea"
            />
          </div>
        </div>

        <button type="submit" className="immigration-form__submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
