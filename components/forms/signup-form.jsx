import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";

import AuthButton from "./auth-button";
import { signUp, varifyEmail } from "@/actions/authActions";

export function SignUpForm() {
  const [state, action] = useFormState(signUp, null);
  const [varifcation, varify] = useFormState(varifyEmail, null);
  const { pending } = useFormStatus();

  return (
    <>
      {" "}
      <form
        action={async (formaData) => {
          await action(formaData);
        }}
      >
        {" "}
        <Button
          type="submit"
          className="w-full"
          formAction={async (formData) => varify(formData)}
          aria-disabled={pending}
        >
          Varify
        </Button>{" "}
        <Button className="w-full" type="submit" aria-disabled={pending}>
          Sign Up
        </Button>
      </form>
    </>
  );
}
