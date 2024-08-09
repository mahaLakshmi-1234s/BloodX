"use client";

import BloodRequirementForm from "@/app/Form";
import RegistrationForm from "../Registrationform";
import Loginpage from "@/app/Login";
import Navbar from "@/app/Navbar";

export default function FormPage() {
  return (
    <>
      {/* <Navbar />
      <main className="flex h-screen justify-center items-center bg-gray-100">
        <BloodRequirementForm />
     


      </main> */}

      <main className="flex h-screen justify-center items-center bg-gray-100">
      <RegistrationForm /> 
      </main>

      {/* <main className="flex h-screen justify-center items-center bg-gray-100">
      <Loginpage /> 
      </main> */}
    </>
  );
}
