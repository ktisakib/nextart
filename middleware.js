import { auth } from "@/utils/auth";

export default auth((req) => {
  const session = req.auth.session || 
  "hdf";
  console.log(session);
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
