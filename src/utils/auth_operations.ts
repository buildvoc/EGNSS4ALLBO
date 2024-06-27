"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = () => {
    "use server";
    cookies().delete("auth");
    redirect("/login");
  };

  export const get_auth_session = () =>  {
    const cookiesStore = cookies();
    const session = cookiesStore.get('auth');
    if(session?.name=="auth")
    {
        console.log(session)
        return session
    }
    return null;
  }
  