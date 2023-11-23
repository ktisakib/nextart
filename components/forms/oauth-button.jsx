import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { signIn } from "@/utils/auth";

const OAuthButton = async ({ provider, Icon }) => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", {
          redirect: true,
          redirectTo: process.env.NEXT_PUBLIC_AUTH_URL,
        });
      }}
      className="w-full "
    >
      <Button
        type="submit"
        className={cn(
          "mt-2 flex w-full items-center justify-center gap-2 bg-foreground text-background  "
        )}
      >
        {Icon}
        <p>Log in with {provider}</p>
      </Button>
    </form>
  );
};

export default OAuthButton;
