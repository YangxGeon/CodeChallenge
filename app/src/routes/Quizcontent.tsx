import styled from "styled-components";

const Quizcontent = styled.div`
  margin: 50px 0px;
`;

const ExInOutput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  padding: 20px;
  border: 1px solid white;
  border-radius: 10px;
  margin: 0px 10px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const quizContent = "이 문제는 테스트 문제로 잘 동작하는 지 확인합니다.";
const exInput = "1 0";
const exOutput = "0 1";

function QuizContent() {
  return (
    <>
      <Main>
        <Quizcontent>{quizContent}</Quizcontent>
        <ExInOutput>
          <Box>예제 입력 : {exInput}</Box>
          <Box>예제 출력 : {exOutput}</Box>
        </ExInOutput>
      </Main>
    </>
  );
}

export default QuizContent;
