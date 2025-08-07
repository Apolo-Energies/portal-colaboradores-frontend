import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(req: NextRequest): Promise<NextResponse> {
  const session: unknown = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  console.log("Middleware session:", session);

  const isAuth = !!session;
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard"); 

  // Si no hay sesión, redirige al login
  if (!isAuth && isDashboard) {
    const url = req.nextUrl.clone();
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
