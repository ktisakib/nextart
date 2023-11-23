import React from "react";

const SignOutButton = async () => {
  return (
    <form
      action={() => {
        "use server";
        signOut();
      }}
      className="border-r p-10 md:px-10  h-full flex hover:bg-yellow-100 dark:hover:bg-stone-900 place-content-start items-start justify-start border-l "
    >
      <button type="submit">Sign Out</button>{" "}
    </form>
  );
};

export default SignOutButton;
