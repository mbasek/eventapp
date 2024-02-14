import React from "react";
import styles from "./Hero.module.css";
import { useState } from "react";
import Video from "../../videos/video.mp4";
import { MdKeyboardArrowRight, MdArrowForward } from "react-icons/md";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeroButton = styled(Link)`
  border-radius: 50px;
  background: ${({ primary }) => (primary ? "#3498db" : "#010606")};
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
    background: ${({ primary }) => (primary ? "#fff" : "#3498db")};
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
        <p className={styles["hero-p"]}>Do you want to create your event in a simple way? You are in the right place!</p>
        <div className={styles["hero-button__wrap"]}>
          <HeroButton
            to="/createevent"
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
