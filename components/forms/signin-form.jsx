"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { signInWithCredential } from "@/actions/auth-action";
import Link from "next/link";
export function SignInForm() {
  const [state, action] = useFormState(signInWithCredential, undefined);
  const { pending } = useFormStatus();
  return (
    <>
      <form
        className=" w-full flex flex-col gap-4 "
        action={async (formaData) => {
          await action(formaData);
        }}
      >
        <div className="space-y-2 w-full">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="email"
            id="email"
            placeholder="johndoe@example.com"
            required
          />
        </div>
        <div className="space-y-2 w-full">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" required />
          <Link
            className="pl-2 text-sm text-muted-foreground"
            href={"/forgot-pass"}
          >
            {" "}
            Forgot password?  <span className="text-sky-400">Reset Now.</span>
          </Link>
        </div>
        {state === "CredentialsSignin" && (
          <span className="flex gap-2 pl-2 text-xs text-red-500">
            {/* <ErrorIcon className="h-4 w-4 fill-red-500" /> */}
            Email and password don&apos;t match{" "}
          </span>
        )}
        <button className="p-2 w-full dark:bg-stone-900 shadow-md bg-yellow-200  rounded-md  " type="submit">Sign In</button>
      </form>
    </>
  );
}
