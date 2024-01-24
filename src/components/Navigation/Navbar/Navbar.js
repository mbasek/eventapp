import React from "react";
import styles from "./Navbar.module.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ toggle, user, logOut }) => {
  const location = useLocation();
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles["navbar-container"]}>
          <div className={styles["navbar-logo"]} to="/">
            <Link className={styles["navbar-logo"]} to="/">
              <span style={{ color: "#3498db" }}>event</span>App
            </Link>
          </div>
          <div className={styles["mobile-icon"]} onClick={toggle}>
            <FontAwesomeIcon icon={faBars} onClick={toggle} />
          </div>
          <ul className={styles["navbar-menu"]}>
          <li className={styles["navbar-item"]}>
          <NavLink
            className={styles["navbar-links"]}
            to="/"
            style={{ color: location.pathname === "/" ? "#3498db" : "#fff" }}
          >
            Home
          </NavLink>
        </li>
        <li className={styles["navbar-item"]}>
          <NavLink
            className={styles["navbar-links"]}
            to="/events"
            style={{ color: location.pathname === "/events" ? "#3498db" : "#fff" }}
          >
            Events
          </NavLink>
        </li>
            <li className={styles["navbar-item"]}>
              {!user && (
                <NavLink
                  className={styles["navbar-links"]}
                  activeStyle={{ color: "#3498db" }}
                  to="/register"
                  style={{ color: location.pathname === "/register" ? "#3498db" : "#fff" }}
                >
                  Register
                </NavLink>
              )}
            </li>
            <li className={styles["navbar-item"]}>
              {user && (
                <NavLink
                  className={styles["navbar-links"]}
                  activeStyle={{ color: "#3498db" }}
                  to="/createevent"
                  style={{ color: location.pathname === "/createevent" ? "#3498db" : "#fff" }}
                >
                  Create event
                </NavLink>
              )}
            </li>
          </ul>
          <button className={styles["navbar-button"]}>
            {user ? (
              <Link
                onClick={logOut}
                className={styles["navbar-button__link"]}
                to="/"
              >
                Sign out
              </Link>
            ) : (
              <Link className={styles["navbar-button__link"]} to="/login">
                Login
              </Link>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
