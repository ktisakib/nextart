import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { signInwithOAuth } from "@/actions/auth-action";


const AuthButton = async ({ provider,Icon }) => {
  return (
    <form action={async () => {signInwithOAuth(provider)}} 
    className="w-full">
      <Button
        className={cn(
          "mt-2 flex w-full items-center justify-center gap-2 bg-foreground text-background  ",
        )}
      >
        <Icon className={cn("fill-background text-foreground")} />{" "}
        <p>Log in with {provider}</p>
      </Button>
    </form>
  );
};

export default AuthButton;