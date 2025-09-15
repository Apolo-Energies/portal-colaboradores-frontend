import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(req: NextRequest): Promise<NextResponse> {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: '__Secure-authjs.session-token',
  });

  // console.log("Cookies:", req.cookies.getAll());

  // console.log("🔐 secret: ", process.env.NEXTAUTH_SECRET);
  const url = req.nextUrl;

  // console.log("⏩ URL:", url.pathname);
  // console.log("🧠 SESSION:", session);

  if (!session) {
    // console.log("❌ NO SESSION. Redirigiendo a /");
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  const expires = typeof session.accessTokenExpires === "number" ? session.accessTokenExpires : 0;
  if (Date.now() > expires) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // session.role is of type unknown, so we need to safely extract it
  const userRole =
    typeof session.role === "string" ? session.role.toLowerCase() : undefined;

  // console.log("rol usuario: ", userRole)

  if (!userRole) {
    // si no tiene rol valido, también lo enviamos al login
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  // console.log("✅ SESSION DETECTADA. Pasando...");

  if (userRole === "colaborador") {
    if (!url.pathname.startsWith("/dashboard/Comparador")) {
      url.pathname = "/dashboard/Comparador";
      return NextResponse.redirect(url);
    }
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
  matcher: ["/dashboard", "/dashboard/:path*"],
};
