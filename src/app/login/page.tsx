import styles from "@/app/ui/login/login.module.css";
import { Button } from "react-bootstrap";

const LoginPage = () => {
  return (
    <div className={styles.container}>
       <div className={styles.login}>
      <form action="" className={styles.login_form} >
      <div className={styles.login_logo}></div>
      {/* <label  title="Login:">User name:</label>
        <input type="text" placeholder="username" />
        <label  title="Login:">User name:</label>
        <input type="password" placeholder="password" />
        <button>Login</button> */}
        <table >
            <tr>
            <td>
            <label itemType="name" title="Login:">User name:</label>
            </td>
            <td><input className={styles.form_control} id="name" name="login" type="text" value="" /></td>
            </tr>
            <tr>
            <td>
                <label itemType="name" title="Login:">User name:</label>
            </td>
            <td><input className={styles.form_control} id="name" name="login" type="text" value="" /></td>
            </tr>
        </table>
        <button className={`btn btn-primary  ${styles.btn_primary} ${styles.btn_login}`} type="submit" value="enter">Enter</button>
      </form>
    </div>
    </div>
  );
};

export default LoginPage;
