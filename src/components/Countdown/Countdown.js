import styled from "styled-components";
import Card from "../Card";
import { CountdownContext } from "../MainBody";
import React, { useEffect, useContext, useRef } from "react";
import { QUERIES } from "../constants";

const Wrapper = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 64px;
`;

const Title = styled.h1`
  letter-spacing: 6px;
  color: var(--color-white);

  @media ${QUERIES.phoneAndSmaller} {
    text-align: center;
    width: 100%;
    max-width: 288px;
    font-size: ${20 / 16}rem;
    line-height: ${24 / 16}rem;
  }
`;

const Cards = styled.div`
  display: flex;
  gap: 24px;

  @media ${QUERIES.phoneAndSmaller} {
    width: 100%;
    padding: 0px 24px;
    justify-content: center;
    gap: 16px;
  }
`;

const useInterval = (callback, delay) => {
  const intervalRef = useRef(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === "number") {
      intervalRef.current = window.setInterval(tick, delay);
      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);
  return intervalRef;
};

function Countdown() {
  const { myDate, storage, setStorage } = useContext(CountdownContext);

  const countdown = () => {
    const inDate = new Date(new Date(myDate).getTime() - new Date().getTime());

    const tmp = { ...storage };

    let day = inDate.getUTCDay();
    day = day < 10 ? "0" + day : String(day);
    if (day !== storage.days.to) {
      const days = {
        from: storage.days.to,
        to: day,
        changed: true,
      };
      tmp.days = days;
    }

    let hour = inDate.getUTCHours();
    hour = hour < 10 ? "0" + hour : String(hour);
    if (hour !== storage.hours.to) {
      const hours = {
        from: storage.hours.to,
        to: hour,
        changed: true,
      };
      tmp.hours = hours;
    }

    let minute = inDate.getUTCMinutes();
    minute = minute < 10 ? "0" + minute : String(minute);
    if (minute !== storage.minutes.to) {
      const minutes = {
        from: storage.minutes.to,
        to: minute,
        changed: true,
      };
      tmp.minutes = minutes;
    }

    let second = inDate.getUTCSeconds();
    second = second < 10 ? "0" + second : String(second);
    if (second !== storage.seconds.to) {
      tmp.seconds = {
        from: storage.seconds.to,
        to: second,
        changed: true,
      };
    }

    setStorage(tmp);
  };

  useInterval(countdown, 1000);

  return (
    <Wrapper>
      <Title>WE'RE LAUNCHING SOON</Title>
      <Cards>
        <Card key={"days"} text={"days"} />
        <Card key={"hours"} text={"hours"} />
        <Card key={"minutes"} text={"minutes"} />
        <Card key={"seconds"} text={"seconds"} />
      </Cards>
    </Wrapper>
  );
}

export default React.memo(Countdown);
