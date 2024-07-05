"use client";

import { CardWrapper } from "@/components/auth/CardWrapper";
import { ScaleLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { useCallback, useEffect, useState } from "react";
import { FormError } from "@/components/FormError";
import { FormSucess } from "@/components/FormSuccess";
export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    {
      if (!token) {
        setError("Missing token");
        return;
      }
      newVerification(token)
        .then((d) => {
          setSuccess(d.success);
          setError(d.error);
        })
        .catch(() => setError("Something went wrong"));
      console.log(token);
    }
  }, [token]);
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <ScaleLoader />}
        <FormSucess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};
