"use client";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import { FaSignOutAlt } from "react-icons/fa";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import Link from "next/link";
import { logout } from "@/utils/auth_operations";
import { authenticated_user } from "@/types/user_types";
import { get_auth_session } from '@/utils/auth_operations';
import { useEffect, useState } from "react";
const handle_logout = ()=>{
    logout()
}   
const Navbar_ = () => {
    const [name,set_name]=useState<string>("")
  useEffect(()=>{
    (async()=>{
        const session :any= await get_auth_session();
        let user:authenticated_user = await JSON.parse(session?.value)
        set_name(`${user.name} ${user.surname}`)
    })()
  
    // set_name(JSON.parse(session?.value))
  },[])
  return (
    <div className={styles.container}>
      <Navbar
        bg="transparent"
        expand="lg"
        className={styles.nav}
        variant="dark"
      >
        <Container aria-expanded="true" className={styles.nav_container} fluid>
          <Link href="/dashboard" passHref>
            <Navbar.Brand><img src="/logo_egnss4all_white.png"  
                            height="30"
            className="d-inline-block align-top"
            alt="PIC2BIM"
            /></Navbar.Brand>
          </Link>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            type="button"
            aria-expanded="false"
            aria-label="Toggle Navigation"
            className={styles.toggler_custom}
          ></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={`me-auto ${styles.custom_me_auto}`} >
              <Link href="/dashboard" passHref>
                <Nav.Link  className={styles.link}>Home</Nav.Link>
              </Link>
              <Link href="/about" passHref>
                <Nav.Link  className={styles.link}>Release Notes</Nav.Link>
              </Link>
            </Nav>
            <Nav className={`ms-auto ${styles.custom_me_auto}`} >
              <Link href="/" passHref>
                <Nav.Link  className={styles.link}>Change Password</Nav.Link>
              </Link>
              <span className={styles.separator}>|</span>
              <Link href="/about" passHref>
                <Nav.Link>CZ</Nav.Link>
              </Link>
              <Link href="/about" passHref>
                <Nav.Link>EN</Nav.Link>
              </Link>
              <Link href="/about" passHref>
                <Nav.Link>IT</Nav.Link>
              </Link>
              <span className={styles.separator}>|</span>
            <Nav.Item className={`d-flex align-items-center  ${styles.user_text}`}  >
              <span className={styles.link} >{name}</span>
            </Nav.Item>
              <span className={styles.separator}>|</span>
              <Link href="/about" passHref>
                <Nav.Link onClick={handle_logout} className={styles.link} >
                  {" "}
                  <FaSignOutAlt size={18} className={styles.logout} /> Logout
                </Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navbar_;