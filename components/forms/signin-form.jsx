import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { signInWithCredential } from "@/actions/auth-action";

export function LogInForm() {
  const [code, action] = useFormState(signInWithCredential, undefined);
  const { pending } = useFormStatus();
  return (
    <>
      <form
        className=" flex-grow "
        action={async (formaData) => {
          await action(formaData);
        }}
      ></form>
    </>
  );
}