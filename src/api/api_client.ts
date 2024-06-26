// import 'server-only'

import {login_user,authentication_response } from "@/types/user_types";
export const endpoint = process.env.REACT_APP_SERVICE_URI ? process.env.REACT_APP_SERVICE_URI : 'http://localhost/api/EGNSS4ALLSERVICES/';

export const login = async (data:login_user) => {
  try {
      const response = await fetch(`${endpoint}comm_login.php?login=${data.login}&pswd=${data.pswd}`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        }      });
     let res : authentication_response= await response.json()
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return res.user;
  } catch (error) {
      console.error("Failed to login user:", error);
      return null; 
  }
};
