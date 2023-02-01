import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px;
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

interface QuizId {
  quizId: string;
}

function Codesubmit({ quizId }: QuizId) {
  const [value, setValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<String>();
  const [submit, setSubmit] = useState(false);
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
      selectedOption
    };
    axios
      .post("http://localhost:8080/code", file)
      .then(() => console.log("File created"))
      .catch((err) => console.log(err));
    setSubmit(!submit);
  };
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = event.target.value;
    setSelectedOption(index);
  };

  return (
    <>
      <Container>
        <select onChange={selectChange} required>
          <option selected disabled>
            Choose one
          </option>
          <option value="py">Python</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
        <Form method="POST" action="submit" onSubmit={onSubmit}>
          <Codebox rows={50} cols={100} onChange={onChange} required />
          <ButtonBox>
            {!submit ? <Button>Send Code</Button> : null}
            {submit ? (
              <Link to={`/all/${quizId}/result`}>
                <Button2>결과 보러가기</Button2>
              </Link>
            ) : null}
          </ButtonBox>
        </Form>
      </Container>
    </>
  );
}

export default Codesubmit;
