import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import SaveIcon from "@material-ui/icons/Save";
import MicIcon from "@material-ui/icons/Mic";
import HomeScreen from "./HomeScreen";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import MicOffIcon from "@material-ui/icons/MicOff";
import PanToolIcon from "@material-ui/icons/PanTool";

const InputSCreen = () => {
  const [text, setText] = useState("");

  const [note, setNote] = useState([]);

  const addNote = () => {
    const saveText = {
      id: note.length + 1,
      mgs: transcript,
    };

    setNote([...note, saveText]);
    console.log(note);
    handleReset();
  };

  const deleteNote = (id) => {
    const res = note.filter((el) => el.id !== id);
    setNote(res);
  };

  useEffect(() => {
    addNote();
  }, []);

  useEffect(() => {
    const saveNote = JSON.parse(localStorage.getItem("note"));
    setNote(saveNote);
  }, []);

  useEffect(() => {
    localStorage.setItem("note", JSON.stringify(note));
  }, [note]);

  const commands = [
    {
      command: "reset",
      callback: () => {
        handleReset();
      },
    },
    {
      command: "save notes",
      callback: () => {
        addNote();
      },
    },
    {
      command: "change background colour to *",
      callback: (bgr) => {
        document.body.style.background = bgr;
      },
    },
    {
      command: "change font colour to *",
      callback: (bgr) => {
        document.body.style.color = bgr;
      },
    },
    {
      command: "go to *",
      callback: (site) => {
        window.open(`http://${site}`);
      },
    },
  ];

  const { listening, transcript, resetTranscript } = useSpeechRecognition({
    commands,
  });
  const handleReset = () => {
    resetTranscript();
  };
  return (
    <Fragment>
      <InputContainer>
        <InputSpace>
          <Input
            placeholder="Enter your Text Here"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <p>{transcript}</p>
          <Icon>
            <SaveIcon
              onClick={() => {
                addNote();
                console.log(text);
              }}
              style={{ color: "green" }}
            />

            {listening ? (
              <MicOffIcon onClick={SpeechRecognition.stopListening} />
            ) : (
              <MicIcon
                style={{ color: "green" }}
                onClick={SpeechRecognition.startListening({ continuous: true })}
              />
            )}
            <PanToolIcon
              onClick={() => {
                resetTranscript();
              }}
            />
          </Icon>
        </InputSpace>
      </InputContainer>

      <HomeContainer>
        {note.map(({ id, title, mgs }) => (
          <HomeWrapper key={id}>
            <Title>{mgs.split(" ")[0] + " " + mgs.split(" ")[1]}...</Title>
            <span>{mgs}</span>
            <DeleteForeverIcon
              onClick={() => {
                deleteNote(id);
                console.log(id);
              }}
            />
          </HomeWrapper>
        ))}
      </HomeContainer>
    </Fragment>
  );
};

export default InputSCreen;

const Icon = styled.div`
  display: flex;
  justify-content: space-around;

  > .MuiSvgIcon-root {
    font-size: 30px;
    color: ${({ clr }) => (clr ? "green" : "red")};
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: 100%;
  background-color: transparent;
  border: 0;
  outline: none;
  /* flex: 1; */
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  /* min-height: 400px; */
  margin-top: 40px;
`;
const InputSpace = styled.div`
  flex: 0.7;
  background-color: #ecf2f7;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  height: 300px;
  box-shadow: rgb(0 0 0 / 29%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  padding: 20px;
  margin: 20px;
`;

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
