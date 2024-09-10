import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Navbar from "../ui/dashboard/navbar/navbar";
import styles from "../ui/dashboard/dashboard.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task detail"
}; 
function get_auth_session() {
    const cookiesStore = cookies();
    const session = cookiesStore.get('auth');
    return session;
  }
const Layout = ({ children }:any) => {
  const session = get_auth_session();
  if (!session) {
    // If no session cookie is found, redirect to login
    redirect('/login');
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
