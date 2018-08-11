import React, { Component } from "react";
import styled from "styled-components";
import WorkSquare from "../components/work-square";

const WORK_LINKS = ["1", "2", "3", "4", "5", "6"];

const Section = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  padding: 3em 0em;
  align-items: left;
  justify-content: space-around;
  background-color: black;
`;

const WorkSquareContainer = styled.div`
  width: 100%;
  max-width: 1450px;
  margin: auto;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  > * {
    margin: 2em;
  }
`;

class Work extends Component {
  render() {
    return (
      <Section>
        <WorkSquareContainer>
          {WORK_LINKS.map((item, index) => (
            <WorkSquare key={index} source={item} />
          ))}
        </WorkSquareContainer>
      </Section>
    );
  }
}

export default Work;
