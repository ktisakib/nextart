"use client";
import { useTheme } from "next-themes";
import { SunIcon } from "../icons/sun-icon";
import { MoonIcon } from "../icons/moon-icon";

const ThemeSwitcher = (props) => {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <button
        {...props}
        onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
      >
        {theme == "dark" ? (
          <SunIcon className="sm:h-8 h-5 text-stone-800 dark:text-stone-300 " />
        ) : (
          <MoonIcon className="sm:h-8 h-5 text-stone-800 dark:text-stone-300" />
        )}
      </button>
    </>
  );
};

export default ThemeSwitcher;
