import OAuthButton from "@/components/forms/oauth-button"
import { SignUpForm } from "@/components/forms/signup-form"

const SignUpPage = () => {
    return (
      <div className="w-full flex mx-2 flex-col max-w-md items-center justify-center sm:p-10 px-5 hadow-md dark:bg-stone-900/50 md:p-10 p-5 gap-4 rounded-md border bg-yellow-200/20 ">
      <SignUpForm  />
      <span className="w-full text-center">or</span>
      <OAuthButton provider="github" />
    </div>
    )
  }
  
  export default SignUpPage