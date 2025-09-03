"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import FormInput from "@/components/FormInput";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      localStorage.setItem("isLoggedIn", "true");

      router.push("/menu/leads");
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-form">
      <form className="login-form__body" onSubmit={handleSubmit}>
        <div className="login-form__intro">
          <h2 className="login-form__title">Log In</h2>
          <p className="login-form__subtitle">
            Enter your credentials to access your account.
          </p>
        </div>

        <div className="login-form__group">
          <FormInput
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="login-form__input"
          />

          <FormInput
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="login-form__input"
          />
        </div>

        <button type="submit" className="login-form__submit-btn">
          Log In
        </button>
      </form>
    </div>
  );
}
