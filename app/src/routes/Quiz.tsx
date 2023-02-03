import styled from "styled-components";
import Navbar from "../Navbar";
import { Switch, Route, useParams, Link } from "react-router-dom";
import Codesubmit from "./Codesubmit";
import QuizContent from "./Quizcontent";
import { useState, useEffect } from "react";
import axios from "axios";

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

function Quiz() {
  const { quizId } = useParams<RouteParams>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [probId, setprobId] = useState("");
  const [probName, setprobName] = useState("");
  const [probRate, setprobRate] = useState(0);
  const [probNum, setprobNum] = useState("");
  const [explain, setExplain] = useState("");
  const [timelimit, setTimelimt] = useState("");
  const [memlimit, setMemlimit] = useState("");
  const [exinput, setInput] = useState("");
  const [exoutput, setOutput] = useState("");
  const [examiner, setExaminer] = useState("");
  const fetchResult = async () => {
    setError(null);
    setLoading(true);
    axios.get('/quizDB').then(function (response) {
      setData(response.data[0])
      setprobId(response.data[0].questionnum)
      setprobName(response.data[0].title)
      if (Number(response.data[0].correctnum) === 0 && Number(response.data[0].trynum) === 0) {
        setprobRate(0);
      } else {
        setprobRate(Number(response.data[0].correctnum) / Number(response.data[0].trynum))
      }
      setprobNum(response.data[0].trynum);
      setExplain(response.data[0].explanation);
      setTimelimt(response.data[0].timelimit);
      setMemlimit(response.data[0].memlimit);
      setInput(response.data[0].input);
      setOutput(response.data[0].output);
      setExaminer(response.data[0].presenter);
      console.log(response.data[0])
      if (response.data[0].result === null) {
        setLoading(true)  
      } else {
        setLoading(false)
      }
    });
  };
  useEffect(() => {
    fetchResult()
  }, []);
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
            문제 번호 : {quizId} 문제 이름 : {probName} 시간 제한 : {timelimit}s{" "}
            메모리 제한 : {memlimit}MB 정답률 : {probRate}% <br />
            <br />
            출제자 : {examiner}
          </Header>
        </Main>
      </Body>

      <Switch>
        <Route path={`/all/${quizId}/quiz`}>
          <QuizContent
            content={explain}
            input={exinput}
            output={exoutput}
          ></QuizContent>
        </Route>
        <Route path={`/all/${quizId}/submit`}>
          <Codesubmit quizId={quizId}></Codesubmit>
        </Route>
      </Switch>
    </>
  );
}

export default Quiz;
