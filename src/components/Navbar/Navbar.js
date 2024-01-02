import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { NavbarItems } from "./navbar-items";

const Navbar = ({ toggle }) => {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles["navbar-container"]}>
          <div className={styles["navbar-logo"]} to="/">
            <Link className={styles["navbar-logo"]} to="/">
              <span style={{ color: "#01bf71" }}>event</span>App
            </Link>
          </div>
          <div className={styles["mobile-icon"]} onClick={toggle}>
            <FontAwesomeIcon icon={faBars} onClick={toggle} />
          </div>
          <ul className={styles["navbar-menu"]}>
            {NavbarItems.map((item) => (
              <li key={item.id} className={styles["navbar-item"]}>
                <Link className={styles["navbar-links"]} to={item.to}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <button className={styles["navbar-button"]}>
            <Link className={styles["navbar-button__link"]} to="/login">
              Log In
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
