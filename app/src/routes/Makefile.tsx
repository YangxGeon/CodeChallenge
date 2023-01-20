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
  return (
    <Container>
      <Codebox></Codebox>
      <Button>Send Code</Button>
    </Container>
  );
}

export default Makefile;
