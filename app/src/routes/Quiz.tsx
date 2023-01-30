import styled from "styled-components";
import Navbar from "../Navbar";
import { Switch, Route, useParams, Link } from "react-router-dom";
import Codesubmit from "./Codesubmit";
import QuizContent from "./Quizcontent";

interface RouteParams {
  quizId: string;
}

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
`;

const Tab = styled.span`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 20px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  a {
    display: block;
  }
`;

const Body = styled.body`
  padding: 0px 100px;
`;

interface Quizinfo {
  quizId: number;
  quizName: string;
  quizContent: string;
  corretRate: number;
  timeLimit: number;
  memLimit: number;
  exInput: string;
  exOutput: string;
  examiner: string;
  source: string;
}

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

const quizName = "테스트케이스";
const corretRate = 100;
const timeLimit = 10;
const memLimit = 10;
const exInput = "1 0";
const exOutput = "0 1";
const examiner = "박민규";
const source = "단국대학교";
const quizContent = "이 문제는 테스트 문제로 잘 동작하는 지 확인합니다.";

function Quiz() {
  const { quizId } = useParams<RouteParams>();

  return (
    <>
      <Navbar></Navbar>

      <Body>
        <Tabs>
          <Tab>
            <Link to={`/all/${quizId}/quiz`}>quiz</Link>
          </Tab>
          <Tab>
            <Link to={`/all/${quizId}/submit`}>submit</Link>
          </Tab>
        </Tabs>
        <Main>
          <Header>
            문제 번호 : {quizId} 문제 이름 : {quizName} 시간 제한 : {timeLimit}s{" "}
            메모리 제한 : {memLimit}MB 정답률 : {corretRate}% <br />
            <br />
            출제자 : {examiner} 출처 : {source}
          </Header>
        </Main>
      </Body>

      <Switch>
        <Route path={`/all/${quizId}/quiz`}>
          <QuizContent></QuizContent>
        </Route>
        <Route path={`/all/${quizId}/submit`}>
          <Codesubmit></Codesubmit>
        </Route>
      </Switch>
    </>
  );
}

export default Quiz;
