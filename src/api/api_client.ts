"use server";
import { authentication_response } from "@/types/user_types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const endpoint = process.env.REACT_APP_SERVICE_URI
  ? process.env.REACT_APP_SERVICE_URI
  : "http://localhost/api/EGNSS4ALLSERVICES/";

export const login = async (event: any) => {
  "use server";
  const { username, password } = Object.fromEntries(event);
  const response = await fetch(
    `${endpoint}comm_login.php?login=${username}&pswd=${password}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let res: authentication_response = await response.json();
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  if (res.user) {
    cookies().set("auth", JSON.stringify(res.user), { secure: true });
    redirect("/dashboard");
  } else {
    return { error: "Login credentials don't match!" };
  }
};
