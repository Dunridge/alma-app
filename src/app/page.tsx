"use client";

import ImmigrationAssessmentForm from "@/components/ImmigrationAssessmentForm";
import logo from "@/assets/svg/logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // login page
  return (
    <div className="home">
      <div className="home__header">
        {/* <div className="home__header-login">Log In</div> */}

        <Link href="/login" className="home__header-login">
          Log In
        </Link>

        <div className="home__header-container">
          <Image src={logo} alt="Logo" width={50} height={50} />
          <div className="home__header-title">
            <span>Get An Assessment</span>
            <span>Of Your Immigration Claim</span>
          </div>
        </div>
      </div>
      <ImmigrationAssessmentForm />
    </div>
  );
}
