// import 'server-only'

import { login_user } from "@/types/user_types";
export const endpoint = process.env.REACT_APP_SERVICE_URI ? process.env.REACT_APP_SERVICE_URI : 'http://localhost/api/EGNSS4ALLSERVICES/';

export const login = async (data:login_user) => {
  const login_user = {
    login:data.user_name,
    pswd:data.password
  };

  console.log("Login user...",login_user);
  try {
      const response = await fetch(`${endpoint}comm_login.php`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(login_user),
      });
     let result= response
      console.log("response",result)
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return await result;
  } catch (error) {
      console.error("Failed to login user:", error);
      return []; 
  }
};
