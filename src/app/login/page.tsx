"use client";

import styles from "@/app/ui/login/login.module.css";
import { Button } from "react-bootstrap";
import { useRouter } from 'next/navigation';
import { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
   const router = useRouter();
    const handleSubmit = (event:any) => {
        event.preventDefault();
        router.push('/dashboard');
      };
  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <form onSubmit={handleSubmit} className={styles.login_form}>
          <div className={styles.login_logo}></div>
          <table>
            <tr>
              <td>
                <label itemType="name" title="Login:">
                  User name:
                </label>
              </td>
              <td>
                <input
                  className={`form-control ${styles.form_control}`}
                  id="username" 
                  name="login" 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                />
              </td>
            </tr>
            <tr>
              <td>
                <label itemType="name" title="Login:">
                  Password:
                </label>
              </td>
              <td>
                <input
                  className={`form-control ${styles.form_control}`}
                  id="password" 
                  name="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </td>
            </tr>
          </table>
          <button
            className={`btn btn-primary  ${styles.btn_primary} ${styles.btn_login}`}
            type="submit"
            value="enter"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
