import styled, { keyframes, css } from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import { CountdownContext } from "../MainBody";
import { QUERIES } from "../constants";
import VisuallyHidden from "../VisuallyHidden";

const InnerCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  gap: 0px;
  width: 100%;
  font-size: ${64 / 16}rem;

  @media ${QUERIES.phoneAndSmaller} {
    font-size: ${34 / 16}rem;
  }
`;

const flipAnimation = keyframes`
  0% {
    transform: translateY(0%);
  }
  20% {
    transform: translateY(100%) scale(1.1) rotateX(360deg);
  }
`;

const animInjection = css`
  animation: 0.95s ${flipAnimation} ease-in-out forwards;
`;

const TopCard = styled.div`
  border-radius: 12px;
  background-color: var(--color-dark-blue);
  color: var(--color-soft-red);
  height: 72px;
  width: 100%;
  position: relative;
  overflow: hidden;
  opacity: 0.5;
  box-shadow: 2px 10px 14px var(--color-very-dark-black-blue);
  ${(p) => (p.flip ? animInjection : "")}
  z-index: 30;

  @media ${QUERIES.phoneAndSmaller} {
    height: 35px;
  }
`;

const InnerTop = styled.div`
  position: absolute;
  top: 39px;
  left: ${(p) => (p.timeValue[0] === "1" ? "36" : "28")}px;
  color: inherit;

  @media ${QUERIES.phoneAndSmaller} {
    top: 18px;
    left: ${(p) => (p.timeValue[0] === "1" ? "20" : "12")}px;
  }
`;

const InnerBottom = styled.div`
  position: absolute;
  top: -32px;
  left: ${(p) => (p.timeValue[0] === "1" ? "36" : "28")}px;
  color: inherit;

  @media ${QUERIES.phoneAndSmaller} {
    top: -18px;
    left: ${(p) => (p.timeValue[0] === "1" ? "20" : "12")}px;
  }
`;

const BottomCard = styled(TopCard)`
  opacity: 1;
`;

const TextWrapper = styled.div`
  letter-spacing: 4px;
  text-transform: uppercase;
  font-size: ${12 / 16}rem;
  color: var(--color-gray-blue);
  user-select: none;

  @media ${QUERIES.phoneAndSmaller} {
    font-size: ${8 / 16}rem;
    letter-spacing: 2px;
  }
`;

function CardComponent({ timeValue, flip, ...props }) {
  return (
    <InnerCard {...props}>
      <TopCard flip={flip}>
        <InnerTop timeValue={timeValue}>{timeValue}</InnerTop>
      </TopCard>
      <BottomCard>
        <InnerBottom timeValue={timeValue}>{timeValue}</InnerBottom>
      </BottomCard>
    </InnerCard>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 140px;
  height: 144px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;

  @media ${QUERIES.phoneAndSmaller} {
    width: 70px;
    height: 50px;
    gap: 40px;
  }
`;

function Card({ key, text }) {
  const { storage, setStorage } = useContext(CountdownContext);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (storage[text].changed) {
      const tmp = { ...storage };
      tmp[text].changed = false;
      setStorage(tmp);

      setTrigger(true);
      /*const timer =*/ setTimeout(() => {
        setTrigger(false);
      }, 1250);

      // return () => clearTimeout(timer);
    }
  }, [storage, setStorage, text]);

  return (
    <Wrapper
      key={key}
      aria-describedby={key + "-card"}
      style={{ height: "auto" }}
    >
      <Wrapper>
        {trigger ? (
          <CardComponent
            timeValue={storage[text].from}
            text={text}
            flip={true}
          />
        ) : (
          ""
        )}
        <CardComponent timeValue={storage[text].to} text={text} />
      </Wrapper>
      <TextWrapper
        id={key + "-card"}
        aria-label={key + " information"}
        aria-live={"polite"}
      >
        {text}
      </TextWrapper>
    </Wrapper>
  );
}

export default Card;
