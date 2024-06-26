"use client";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";

import { FaSignOutAlt } from "react-icons/fa";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import Link from "next/link";

const Navbar_ = () => {
  const pathname = usePathname();
  return (
    <div className={styles.container}>
      <Navbar
        bg="transparent"
        expand="lg"
        className={styles.nav}
        variant="dark"
      >
        <Container aria-expanded="true" className={styles.nav_container} fluid>
          <Link href="/" passHref>
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
              <Link href="/" passHref>
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link href="/about" passHref>
                <Nav.Link>Release Notes</Nav.Link>
              </Link>
            </Nav>
            <Nav className={`ms-auto ${styles.custom_me_auto}`} >
              <Link href="/" passHref>
                <Nav.Link>Change Password</Nav.Link>
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
            <Nav.Item className={`d-flex align-items-center ${styles.user_text}`} >
              <span className={styles.text}>demo</span>
              <span className={styles.text}>demo</span>
            </Nav.Item>
              <span className={styles.separator}>|</span>
              <Link href="/about" passHref>
                <Nav.Link>
                  {" "}
                  <FaSignOutAlt size={15} /> Logout
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
