import React from "react";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #0d0d0d;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => ({ isOpen } ? "100%" : "0")};
  top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
`;

const Sidebar = ({ isOpen, toggle, user, logOut }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <FontAwesomeIcon
        icon={faTimes}
        color="#ffff"
        className={styles["sidebar-icon"]}
        onClick={toggle}
      />
      <div className={styles["sidebar-wrapper"]}>
        <ul className={styles["sidebar-menu"]}>
          <li>
            <Link className={styles["sidebar-link"]} to="/" onClick={toggle}>
              Home
            </Link>
          </li>
          <li>
            <Link
              className={styles["sidebar-link"]}
              to="/events"
              onClick={toggle}
            >
              Events
            </Link>
          </li>

          <li>
            {user && (
              <Link
                className={styles["sidebar-link"]}
                to="/stats"
                onClick={toggle}
              >
                Create event
              </Link>
            )}
          </li>
        </ul>

        {isOpen && (
          <div className={styles["sidebar-button__wrap"]}>
            {user ? (
              <Link
                className={styles["sidebar-route"]}
                to="/"
                onClick={() => {
                  toggle();
                  logOut();
                }}
              >
                Sign out
              </Link>
            ) : (
              <Link
                className={styles["sidebar-route"]}
                to="/login"
                onClick={toggle}
              >
                Log In
              </Link>
            )}
          </div>
        )}
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
