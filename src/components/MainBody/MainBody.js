import styled from "styled-components";
import Countdown from "../Countdown";
import React, { useState, createContext } from "react";
import { QUERIES } from "../constants";

const Wrapper = styled.div`
  min-height: 100vh;
  position: relative;
  background-color: var(--color-very-dark-blue);
  background-image: url("./bg-stars.svg");
  background-position: 100% 100%;
  display: flex;
  flex-direction: column;
`;

const Footer = styled.div`
  align-self: end;
  display: grid;
  place-content: center;
  background-image: url("./pattern-hills.svg");
  background-position: 0% 100%;
  margin-top: auto;
  width: 100%;
  height: 180px;
  z-index: 4;

  @media ${QUERIES.phoneAndSmaller} {
    background-position: 80% 100%;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  gap: 32px;

  @media ${QUERIES.phoneAndSmaller} {
    margin-top: 64px;
  }
`;

const Link = styled.a`
  text-decoration: none;
  cursor: pointer;
`;

const Icon = styled.img`
  object-fit: cover;
  width: 30px;
  height: 30px;
`;

export const CountdownContext = createContext();

function MainBody() {
  const [myDate, setMyDate] = useState(new Date().getTime() + 864350);
  const [storage, setStorage] = useState({
    days: {
      from: "00",
      to: "00",
    },
    hours: {
      from: "00",
      to: "00",
    },
    minutes: {
      from: "00",
      to: "00",
    },
    seconds: {
      from: "00",
      to: "00",
    },
  });

  return (
    <Wrapper>
      <CountdownContext.Provider
        value={{
          myDate,
          setMyDate,
          storage,
          setStorage,
        }}
      >
        <Countdown />
      </CountdownContext.Provider>
      <Footer role={"contentinfo"}>
        <LinkWrapper>
          <Link href={"/"}>
            <Icon src={"./icon-facebook.svg"} alt={"facebook image"} />
          </Link>
          <Link href={"/"}>
            <Icon src={"./icon-pinterest.svg"} alt={"pinterest image"} />
          </Link>
          <Link href={"/"}>
            <Icon src={"./icon-instagram.svg"} alt={"instagram image"} />
          </Link>
        </LinkWrapper>
      </Footer>
    </Wrapper>
  );
}

export default React.memo(MainBody);
