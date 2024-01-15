import React from "react";
import styles from "./Hero.module.css";
import { useState } from "react";
import Video from "../../videos/video.mp4";
import { MdKeyboardArrowRight, MdArrowForward } from "react-icons/md";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const HeroButton = styled(Link)`
  border-radius: 50px;
  background: ${({ primary }) => (primary ? "#01BF71" : "#010606")};
  white-space: nowrap;
  padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
  color: ${({ dark }) => (dark ? "#010606" : "#fff")};
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-conten: center;
  align-items: center;
  transiton: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transiton: all 0.2s ease-in-out;
    background: ${({ primary }) => (primary ? "#fff" : "#01BF71")};
  }
`;

const ArrowForward = styled(MdArrowForward)`
  margin-left: 8px;
  font-size: 20px;
`;

const ArrowRight = styled(MdKeyboardArrowRight)`
  margin-left: 8px;
  font-size: 20px;
`;

const Hero = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };

  return (
    <div className={styles["hero-container"]}>
      <div className={styles["hero-background"]}>
        <video
          className={styles["video-background"]}
          autoPlay
          loop
          muted
          src={Video}
          type="video/mp4"
        />
      </div>
      <div className={styles["hero-content"]}>
        <h1 className={styles["hero-h1"]}>Create your Event</h1>
        <p className={styles["hero-p"]}>
          dsaaaaaaaaaaaaaaaaaaaaaaaaadsadsahdsaddddddd
        </p>
        <div className={styles["hero-button__wrap"]}>
          <HeroButton
            to="/stats"
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            primary="true"
            dark="true"
          >
            Create event
            {hover ? <ArrowForward /> : <ArrowRight />}
          </HeroButton>
        </div>
      </div>
    </div>
  );
};

export default Hero;
