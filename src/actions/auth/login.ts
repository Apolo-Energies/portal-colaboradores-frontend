"use server";

import { signIn } from "@/auth.config";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log("data: ", formData);

    const res = await signIn("credentials", formData);
    console.log("res: ", res);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export const login = async (email: string, password: string): Promise<unknown> => {
  try {
    await signIn("credentials", { email, password });
    return { ok: true };
  } catch (error: unknown) {
    console.log("Error: ", error);
    return {
      ok: false,
      message: "No se pudo iniciar sesion.",
    };
  }
};
