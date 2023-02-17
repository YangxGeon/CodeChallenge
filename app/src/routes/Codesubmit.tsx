import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Textarea } from "../Textarea";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px;
  position: relative;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Codebox = styled.textarea``;
const Button = styled.button`
  cursor: pointer;
  width: 100px;
  height: 30px;
`;
const Button2 = styled.button`
  cursor: pointer;
  width: 100px;
  height: 30px;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Select = styled.select`
  width: 100px;
  height: 30px;
`;
const SelectButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
`;
interface QuizId {
  quizId: string;
  code: string;
}
function Codesubmit({ quizId, code }: QuizId) {
  const [value, setValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<String>("py");
  const [submit, setSubmit] = useState(false);
  const editorRef = useRef(null);
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // const value = event.currentTarget.value;
    const {
      currentTarget: { value }
    } = event;
    setValue(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var file = {
      value,
      selectedOption,
      quizId
    };
    axios
      .post("http://10.0.20.119:8080/code", file)
      .then(function (response) {})
      .catch((err) => console.log(err));
    setSubmit(!submit);
  };
  useEffect(() => {
    setValue(code);
  }, []);
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = event.target.value;
    setSelectedOption(index);
    if (index === "java") {
      setValue(
        `public class Main {\n public static void main(String[] args) {\n\n }\n}`
      );
    } else {
      setValue("");
    }
  };
  const clear = (event: React.MouseEvent<HTMLElement>) => {
    setValue("");
  };
  const load = (event: React.MouseEvent<HTMLElement>) => {
    setValue(code);
  };
  return (
    <>
      <Container>
        <Form method="POST" action="submit" onSubmit={onSubmit}>
          <SelectButton>
            <Select onChange={selectChange} required>
              <option selected value="py">
                Python
              </option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </Select>
            <ButtonBox>
              {!submit ? <Button>Send Code</Button> : null}
              {submit ? (
                <Link
                  to={{
                    pathname: `/all/${quizId}/result`,
                    state: { quizId }
                  }}
                >
                  <Button>결과 보러가기</Button>
                </Link>
              ) : null}
              <Button2 type="button" onClick={clear}>
                초기화
              </Button2>
              <Button2 type="button" onClick={load}>
                코드 가져오기
              </Button2>
            </ButtonBox>
          </SelectButton>
          {/* <Codebox rows={50} cols={100} onChange={onChange} required /> */}
          <Textarea
            name="test-textarea"
            value={value}
            onValueChange={(value: string) => setValue(value)}
            numOfLines={40}
          />
        </Form>
      </Container>
    </>
  );
}
export default Codesubmit;
