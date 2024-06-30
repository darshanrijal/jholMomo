import { CardWrapper } from "@/components/auth/CardWrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
export const ErrorCard = () => {
  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      headerLabel="Oops ! something went wrong"
    >
      <div className="w-full items-center flex justify-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
