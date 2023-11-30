import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/utils/auth";
const AdminPage = async () => {
  const session = await auth();
  return (
    <div className=" border p-4">
      <div className="flex flex-col items-center justify-center">
        <h1>Admin Dahsboard</h1>

        <div className="flex flex-col items-center justify-center">
          <Image
            src={session?.user?.image}
            alt="Picture of the User"
            width={200}
            height={200}
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold">{session?.user?.name}</h1>
          <h1 className="text-2xl font-bold">{session?.user?.email}</h1>
          <h2>Role:{session.role} </h2>
          {session.role === "ADMIN" ? (
            <h1>
              you have access to Admin Dashboard goto{" "}
              <Link href={"/admin"}>/admin</Link>
            </h1>
          ) : (
            <h1>
              you Don&apos;t have access to Admin Dashboard goto
              <Link className="underline decoration-slate-300" href={"/admin"}>
                /admin
              </Link>{" "}
              you will be redirected to /dashboard
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
