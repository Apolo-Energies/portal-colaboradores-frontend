"use server";

import { ApiResponse, userRegister } from "@/app/service/AuthApi/auth.service";

export const registerUser = async (
  userData: any,
): Promise<ApiResponse<any>> => {
  try {
    const response = await userRegister(userData);
    return response;
  } catch (error: any) {
    console.log("Error: ", error);
    return {
      data: "Unexpected error",
      status: 500,
    };
  }
};
