import ThemeSwitcher from "@/components/layouts/theme-switcher";
import NavLink from "./nav-link";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { array, jetBrains_Mono } from "@/lib/fonts";
import MobileNav from "./mobile-nav";
import { auth, signOut } from "@/utils/auth";

const Header = async () => {
  const session = await auth();
  return (
    <header
      className={cn(
        "md:h-24  h-12 border-b dark:bg-stone-950 bg-yellow-50 dark:border-stone-800 border-stone-300 flex items-center  justify-between lg:h-36 max-w-[1920px] ",
        jetBrains_Mono.className
      )}
    >
      <Link
        href={"/"}
        className={cn(
          array.className,
          "lg:text-7xl text-3xl sm:text-5xl bg-gradient-to-r sm:px-10 px-2 from-yellow-400/90 animate-pulse  dark:from-yellow-200 dark:to-indigo-700  to-indigo-600 text-transparent bg-clip-text"
        )}
      >
        Nextart
      </Link>

      <div className="h-full place-content-center flex">
        {" "}
        <nav className="h-full hidden  lg:flex flex-col  ">
          {session ? (
            <>
              <NavLink
                className="border-r md:px-10 flex border-b hover:bg-yellow-100 dark:hover:bg-stone-900 place-content-center items-center justify-center border-l h-full "
                href={"/dashboard"}
                title={"Dashboard"}
              />
              <form
                action={async () => {
                  "use server";
                  signOut();
                }}
                className="border-r md:px-10  h-full flex hover:bg-yellow-100 dark:hover:bg-stone-900 place-content-center items-center justify-center border-l "
              >
                <button type="submit">Sign Out</button>{" "}
              </form>
            </>
          ) : (
            <>
              <NavLink
                className="border-r md:px-10 flex border-b hover:bg-yellow-100 dark:hover:bg-stone-900 place-content-center items-center justify-center border-l h-full "
                href={"/signup"}
                title={"Sign Up"}
              />
              <NavLink
                className="border-r md:px-10  h-full flex hover:bg-yellow-100 dark:hover:bg-stone-900 place-content-center items-center justify-center border-l "
                href={"/signin"}
                title={"Signin"}
              />
            </>
          )}
        </nav>
        <MobileNav>
          <ul className="w-full flex flex-col">
            {session ? (
              <>
                <NavLink
                  className="border-r p-10 md:px-10 flex border-b hover:bg-yellow-100 dark:hover:bg-stone-900 place-content-center items-start justify-start border-l h-full "
                  href={"/dashboard"}
                  title={"Dashboard"}
                />
                <form
                  action={async () => {
                    "use server";
                    signOut();
                  }}
                  className="border-r p-10 md:px-10  h-full flex hover:bg-yellow-100 dark:hover:bg-stone-900 place-content-start items-start justify-start border-l "
                >
                  <button type="submit">Sign Out</button>{" "}
                </form>
              </>
            ) : (
              <>
                <NavLink
                  className="border-r p-10 md:px-10 flex border-b hover:bg-yellow-100 dark:hover:bg-stone-900 place-content-start items-start justify-start border-l h-full "
                  href={"/signup"}
                  title={"Sign Up"}
                />
                <NavLink
                  className="border-r p-10 md:px-10  h-full flex hover:bg-yellow-100 dark:hover:bg-stone-900 place-content-start items-start justify-start border-l "
                  href={"/signin"}
                  title={"Signin"}
                />
              </>
            )}
          </ul>
        </MobileNav>
        <ThemeSwitcher className=" border-r hover:bg-yellow-100 dark:hover:bg-stone-900 lg:border-none border-l lg:px-16 sm:px-8 px-4" />
      </div>
    </header>
  );
};

export default Header;
