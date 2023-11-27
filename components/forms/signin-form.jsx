"use client";

import Link from "next/link";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";

import { signInWithCredential } from "@/actions/auth-action";
import ActionButton from "./action-button";

export function SignInForm() {
  const [state, action] = useFormState(signInWithCredential, null);
  return (
    <form
      className=" w-full flex flex-col gap-y-4 "
      action={async (formaData) => {
        await action(formaData);
      }}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="johndoe@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            minLength={8}
            id="password"
            name="password"
            required
          />
        </div>
        {state?.code ===301 && (
          <span className="flex gap-2 pl-2 text-xs text-red-500">
            Email and password don&apos;t match{" "}
          </span>
        )}

        <Link
          className="p-2  space-y-2 text-sm text-muted-foreground"
          href={"/forgot-pass"}
        >
          {" "}
          Forgot password? Reset Now.
        </Link>
      </div>

      <ActionButton
        className="w-full text-foreground hover:text-white dark:text-black dark:bg-white"
      >
        Log in
      </ActionButton>
    </form>
  );
}
