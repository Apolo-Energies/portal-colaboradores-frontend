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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const login = async (email: string, password: string): Promise<any> => {
  try {
    await signIn("credentials", { email, password });
    return { ok: true };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("Error: ", error);
    return {
      ok: false,
      message: "No se pudo iniciar sesion.",
    };
  }
};
