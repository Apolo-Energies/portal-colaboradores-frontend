import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { userLogin } from "./app/services/ApiAuth/auth.service";
import jwt from "jsonwebtoken";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/",
    newUser: "/dashboard",
  },
  providers: [
    Credentials({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials): Promise<any | null> {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        console.log("credenciales: ", parsedCredentials);
        console.log("credenciales: ", parsedCredentials.data);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        try {
          const response = await userLogin(email, password);

          if (!response || response.status !== 200) {
            return null;
          }
          const data = response.data as { token: string };
          const token = data.token;
          const decoded = jwt.decode(token) as jwt.JwtPayload;

          if (!decoded || !decoded.nameid) return null;
          console.log("Usuario autenticado: ", decoded);
          return {
            id: decoded.nameid,
            email: decoded.unique_name || decoded.email,
            name: decoded.given_name,
            role: decoded.role,
            token,
          };
        } catch (error) {
          console.error("Error al autenticar:", error);
          return null; // Asegurarse de que no se cree una sesión si hay error
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {

      console.log("next-auth config loaded: ", process.env.NEXTAUTH_SECRET);
      if (!process.env.NEXTAUTH_SECRET) {
        throw new Error(
          "❌ NEXTAUTH_SECRET is not defined. Set it in your environment variables."
        );
      }
      
      if (user !== null) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: token,
      };
    },
  },
  trustHost: true,
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
