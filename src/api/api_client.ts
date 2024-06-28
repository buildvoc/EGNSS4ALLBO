"use server";
import { authentication_response } from "@/types/user_types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const endpoint = process.env.APP_SERVICE_URI

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

export const get_tasks = async (user_id: number) => {
  "use server";

try{
  const response = await fetch(
    `${endpoint}comm_tasks.php?user_id=${user_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let res: any = await response.json();

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  if (res.tasks) {
    return res?.tasks;
  } else {
    return [];
  }

}catch (error) {
  console.error("Failed to fetch the catalogue:", error);
  return []; 
}

};
