import { NewVerificationForm } from "@/components/auth/NewVerificationForm";
import React, { Suspense } from "react";

const NewVerification = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewVerificationForm />
    </Suspense>
  );
};

export default NewVerification;
