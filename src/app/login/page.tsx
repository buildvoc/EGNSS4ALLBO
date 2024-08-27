'use client'
import styles from "@/app/ui/login/login.module.css";
import {useState } from "react";
import { login } from "@/api/api_client";

const LoginPage = () => {
    const [err,set_err] = useState('')
  const handleSubmit = async (event:any) => {
    const data = await login(event)
    data.error && set_err(data.error)
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <form  action={handleSubmit} className={styles.login_form}>
          <div className={styles.login_logo}></div>
          <table>
            <tbody>
            <tr>
              <td>
                <label itemType="name" title="Login:" className={styles.label}>
                  User name:
                </label>
              </td>
              <td>
                <input
                  className={`form-control ${styles.form_control}`}
                  id="username"
                  name="username"
                  type="text"

                  />
              </td>
            </tr>
            <tr>
              <td>
                <label itemType="name" title="Login:" className={styles.label}>
                  Password:
                </label>
              </td>
              <td>
                <input
                  className={`form-control ${styles.form_control}`}
                  id="password"
                  name="password"
                  type="password"
                />
              </td>
            </tr>
            </tbody>
          </table>
          <button
            className={`btn btn-primary my-4 ${styles.btn} ${styles.btn_primary} ${styles.btn_login}`}
            type="submit"
            value="enter"
          >
            ENTER
          </button>
          { err && <p className="danger">{err}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
