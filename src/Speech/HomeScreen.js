import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const HomeScreen = () => {
  const [note, setNote] = useState([
    {
      id: 1,
      title: "This is it",
      mgs: "Dear developer, our mission is to serve all the best programming news you’ll ever need. Ready?",
    },
    {
      id: 2,
      title: "This is it",
      mgs: "Dear developer, our mission is to serve all the best programming news you’ll ever need. Ready?",
    },
  ]);

  const addNote = async () => {};

  return (
    <HomeContainer>
      {note.map(({ id, title, mgs }) => (
        <HomeWrapper key={id}>
          <Title>{mgs.split(" ")[0] + " " + mgs.split(" ")[1]}...</Title>
          <span>{mgs}</span>
          <DeleteForeverIcon />
        </HomeWrapper>
      ))}
    </HomeContainer>
  );
};

export default HomeScreen;

const MyIcon = styled(DeleteForeverIcon)``;

const Title = styled.div`
  width: 100%;
  height: 100px;
  background-color: pink;
  border-radius: 10px 10px 0 0;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const HomeContainer = styled.div`
  margin-top: 40px;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
const HomeWrapper = styled.div`
  margin: 10px;
  width: 300px;
  background-color: lavender;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  min-height: 400px;
  border-radius: 10px 10px 0 0;
  display: flex;
  flex-direction: column;

  > span {
    flex: 1;
    padding: 10px;
  }

  > .MuiSvgIcon-root {
    color: red;
    display: flex;
    padding-bottom: 10px;
    padding-left: 10px;
    flex-direction: row-reverse;
    cursor: pointer;
    font-size: 35px;
    transform: scale(1);

    :hover {
      opacity: 0.8;
      transform: scale(1.05);
    }
  }
`;
