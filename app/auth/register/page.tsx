import { RegisterForm } from "@/components/auth/RegisterForm";
import React, { Suspense } from "react";

const RegisterPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
};

export default RegisterPage;
