"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { SpinnerIcon } from "../icons/spinner-icon";

const ActionButton = ({ children, props, className, formAction }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      formAction={formAction}
      className={cn("bg-transparent border p-1 hover:bg-stone-900", className)}
      aria-disabled={pending}
      {...props}
    >
      {pending ? (
        <SpinnerIcon className="h-6 rotate-180 text-white" />
      ) : (
        children
      )}
    </Button>
  );
};

export default ActionButton;
