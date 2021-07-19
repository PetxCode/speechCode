import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import storage from "local-storage-fallback";

const GlobalStyled = createGlobalStyle`
  body{
    background-color: ${({ theme }) =>
      theme.myTheme === "d" ? "#22272E" : "white"};

    color: ${({ theme }) => (theme.myTheme === "d" ? "#CDD9E5" : "black")};

    font-family: Poppins;

    border-color: ${({ theme }) => (theme.myTheme === "d" ? "red" : "green")};
  }
`;

// back: ${(props) => props.theme.myTheme};

const App = () => {
  const storeThemeChoice = () => {
    const saveTheme = storage.getItem("toggle");
    return saveTheme ? JSON.parse(saveTheme) : { myTheme: "y" };
  };

  const [toggle, setToggle] = useState(storeThemeChoice);

  useEffect(() => {
    storage.setItem("toggle", JSON.stringify(toggle));
  }, [toggle]);

  return (
    <ThemeProvider theme={toggle}>
      <GlobalStyled />
      <Container>
        <Wrap>This is my Home</Wrap>
        <Button
          onClick={() => {
            setToggle(
              toggle.myTheme === "d" ? { myTheme: "y" } : { myTheme: "d" }
            );
          }}
        >
          Toggled Mode
        </Button>
      </Container>
    </ThemeProvider>
  );
};

export default App;

const Button = styled.div`
  width: 160px;
  height: 50px;
  margin-top: 60px;
  border: 3px solid red;
  /* border-color:  */
  border-radius: 5px;
  justify-content: center;
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transform: scale(1);
  transition: all 350ms;

  &:hover {
    transform: scale(1.04);
  }
`;

const Wrap = styled.div`
  font-size: 4rem;
  font-weight: bold;
`;

const Container = styled.div`
  width: 100%;
  height: 40rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

//#22272E #CDD9E5
