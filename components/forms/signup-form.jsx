"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useFormState } from "react-dom";

import { sendMail, signUp, varifyEmail } from "@/actions/auth-action";
import { ArrowIcon } from "@/components/icons/arrow-icon";
import { toast } from "sonner";
import ActionButton from "./action-button";
import { Button } from "../ui/button";
export function SignUpForm() {
  const [status, send] = useFormState(sendMail, null);
  const [verifcation, verify] = useFormState(varifyEmail, {
    email: status?.email,
  });
  const [state, action] = useFormState(signUp, null);
  return (
    <>
      <form
        action={async (formaData) => {
          await action({
            username: formaData.get("username"),
            lastName: formaData.get("last-name"),
            firstName: formaData.get("first-name"),
            password: formaData.get("password"),
            email: verifcation?.email,
          });
        }}
        className="w-full"
      >
        <div className="gap-2 w-full  flex flex-col  justify-center ">
          {verifcation?.code !== 200 ? (
            <div className="w-full flex-col flex gap-1">
              <Label htmlFor="email" className="p-1">
                Enter Email first
              </Label>
              <div className="flex gap-2  items-end justify-center">
                <Input
                  name="email"
                  id="email"
                  placeholder="johndoe@example.com"
                  required
                />
                {status?.code !== 200 && (
                  <ActionButton
                    className="bg-transparent border p-1 hover:bg-stone-900"
                    formAction={async (formData) => {
                      await send(formData);
                    }}
                  >
                    <ArrowIcon className="h-6 rotate-180 text-white" />
                  </ActionButton>
                )}
              </div>
              <div className="text-base">
                {status?.code === 301 && (
                  <p className="text-red-500 text-sm p-1">{status?.message} </p>
                )}
                {status?.code === 200 && verifcation?.code !== 200 && (
                  <div className="flex flex-col gap-2">
                    <Input
                      name="code"
                      className="w-full"
                      id="code"
                      placeholder="Enter Verification code"
                      required
                    />
                    {verifcation?.code === 302 && <p>{verifcation?.message}</p>}
                    <ActionButton
                      className="bg-transparent w-full text-white border p-1 hover:bg-stone-900"
                      formAction={async (formData) => verify(formData)}
                    >
                      Verify
                    </ActionButton>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex w-full gap-4 flex-col">
              <div className="flex w-full gap-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    name="first-name"
                    type="text"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    type="text"
                    name="last-name"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  name="username"
                  type="text"
                  minLength={3}
                  maxLength={32}
                  id="username"
                  required
                  placeholder="username"
                />
                {state?.code === 302 && (
                  <p className="text-sm text-red-500 p-1">{state?.error}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  required
                  name="password"
                  type="password"
                  id="password"
                  placeholder="password"
                />
              </div>
              <Button className="w-full" type="submit">
                Sign Up
              </Button>
            </div>
          )}
        </div>

        {/*  */}
      </form>
    </>
  );
}
