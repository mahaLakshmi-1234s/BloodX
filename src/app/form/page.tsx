"use client";

import BloodRequirementForm from "@/app/Form";
import Navbar from "@/app/Navbar";

export default function FormPage() {
  return (
    <>
      <Navbar />
      <main className="flex h-screen justify-center items-center bg-gray-100">
        <BloodRequirementForm />
      </main>
    </>
  );
}
