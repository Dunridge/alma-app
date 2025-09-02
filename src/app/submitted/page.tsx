"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function SubmittedPage() {
  return (
    <div className="submitted">
      <div className="submitted__card">
        <div className="submitted__icon">
          <Image
            src="" // TODO: replace with actual icon path
            alt="Thank You Icon"
            width={64}
            height={64}
          />
        </div>

        <h1 className="submitted__title">Thank You</h1>

        <p className="submitted__text">
          Your information was submitted to our team of immigration attorneys.
          Expect an email from{" "}
          <span className="submitted__highlight">hello@tryalma.ai</span>.
        </p>

        <Link href="/" className="submitted__link">
          <button className="submitted__button">Go Back to Homepage</button>
        </Link>
      </div>
    </div>
  );
}
