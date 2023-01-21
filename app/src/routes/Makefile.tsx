import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  padding: 0px 20px;
`;

const Codebox = styled.textarea``;

const Button = styled.button``;

function Makefile() {
  const [value, setValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<String>();
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
  };
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = event.target.value;
    setSelectedOption(index);
  };
  return (
    <Container>
      <select onChange={selectChange}>
        <option selected disabled>
          Choose one
        </option>
        <option value="py">Python</option>
        <option value="c">C</option>
        <option value="java">Java</option>
      </select>
      <form method="POST" action="submit" onSubmit={onSubmit}>
        <Codebox rows={50} cols={100} onChange={onChange} required />
        <Button>Send Code</Button>
      </form>
    </Container>
  );
}

export default Makefile;
