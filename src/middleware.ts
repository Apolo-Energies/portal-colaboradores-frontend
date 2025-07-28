import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(req: NextRequest): Promise<NextResponse> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session: any = await getToken({
    req,
    secret: process.env.AUTH_SECRET ?? "",
  });

  const url = req.nextUrl;

  console.log("Middleware session:", session);
  // Si no hay sesión, redirige al login
  if (!session) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // const userRole = session.user?.role;

  // Verifica si el rol es válido
  // const validRoles = ["master", "colaborador"];
  // if (!validRoles.includes(userRole)) {
  //   url.pathname = "/";
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
}

// ✅ Solo aplica middleware a rutas dentro de /dashboard
export const config = {
  matcher: ["/dashboard/:path*"],
};
