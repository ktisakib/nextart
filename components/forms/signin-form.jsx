"use client";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { useFormState, useFormStatus } from "react-dom";
// import { signInWithCredential } from "@/actions/auth-action";
// import Link from "next/link";
// export function SignInForm() {
//   const [state, action] = useFormState(signInWithCredential, undefined);
//   const { pending } = useFormStatus();
//   return (
//     <>
//       <form
//         className=" w-full flex flex-col gap-4 "
//         action={async (formaData) => {
//           await action(formaData);
//         }}
//       >
//         <div className="space-y-2 w-full">
//           <Label htmlFor="email">Email</Label>
//           <Input
//             name="email"
//             type="email"
//             id="email"
//             placeholder="johndoe@example.com"
//             required
//           />
//         </div>
//         <div className="space-y-2 w-full">
//           <Label htmlFor="password">Password</Label>
//           <Input type="password" id="password" name="password" required />
//           <Link
//             className="pl-2 text-sm text-muted-foreground"
//             href={"/forgot-pass"}
//           >
//             {" "}
//             Forgot password?  <span className="text-sky-400">Reset Now.</span>
//           </Link>
//         </div>
//         {state === "CredentialsSignin" && (
//           <span className="flex gap-2 pl-2 text-xs text-red-500">
//             {/* <ErrorIcon className="h-4 w-4 fill-red-500" /> */}
//             Email and password don&apos;t match{" "}
//           </span>
//         )}
//         <button className="p-2 w-full dark:bg-stone-900 shadow-md bg-yellow-200  rounded-md  " type="submit">Sign In</button>
//       </form>
//     </>
//   );
// }


import Link from "next/link";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";



import OAuthButton from "./oauth-button";
import { signInWithCredential } from "@/actions/auth-action";
// import { ErrorIcon } from "../icons/error-icon";

export function SignInForm() {
  const [code, action] = useFormState(signInWithCredential, undefined);
  const { pending } = useFormStatus();
  return (
    <Card className="mx-auto max-w-2xl  ">
      <CardHeader className="text-center ">
        <CardTitle className="text-sm sm:text-xl">
          Welcome back <span className="text-red-500">Redlnk</span> user{" "}
        </CardTitle>
        <CardDescription>Enter user details to Login</CardDescription>
      </CardHeader>
      <form
        className=" flex-grow "
        action={async (formaData) => {
          await action(formaData);
        }}
      >
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                placeholder="johndoe@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" required />
            </div>
            {code === "CredentialsSignin" && (
              <span className="flex gap-2 pl-4 text-xs text-red-500">
                {/* <ErrorIcon className="h-4 w-4 fill-red-500" /> */}
                Email and password don&apos;t match{" "}
              </span>
            )}
            
              <Link
                className="pl-2 text-sm text-muted-foreground"
                href={"/forgot-pass"}
              >
                {" "}
                Forgot password? Reset Now.
              </Link>
       
          </div>
        </CardContent>
        <CardFooter>
          <Button aria-disabled={pending} className="w-full" type="submit">
            Log in
          </Button>
        </CardFooter>
      </form>
      {/* {errorMessage && <p>{errorMessage} </p>} */}
      <h1 className="text-center"> Or</h1>
      <CardFooter>
        <OAuthButton provider="github" />
      </CardFooter>
    </Card>
  );
}
