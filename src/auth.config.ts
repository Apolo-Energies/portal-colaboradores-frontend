import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { userLogin } from "./app/services/ApiAuth/auth.service";

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
        console.log("auth: ", email, password);
        try {
          const response = await userLogin(email, password);

          console.log("response: ", response);

          if (!response || response.status !== 200) {
            console.error("Credenciales incorrectas: ", response);
            return null;
          }

          return response.data;
        } catch (error) {
          console.error("Error al autenticar:", error);
          return null; // Asegurarse de que no se cree una sesión si hay error
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user !== null) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session = token as any;
      return session;
    },
  },
  trustHost: true,
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
