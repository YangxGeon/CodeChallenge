import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
`;

const Codebox = styled.input`
  width: 500px;
  height: 500px;
`;

const Button = styled.button``;

function Makefile() {
  const [value, setValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<String>();
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    // const value = event.currentTarget.value;
    const {
      currentTarget: { value }
    } = event;
    setValue(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(value);
    console.log(selectedOption);
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
        <option value="Python">Python</option>
        <option value="C">C</option>
        <option value="Java">Java</option>
      </select>
      <form action="submit" onSubmit={onSubmit}>
        <Codebox type="text" onChange={onChange} />
        <Button>Send Code</Button>
      </form>
    </Container>
  );
}

export default Makefile;
