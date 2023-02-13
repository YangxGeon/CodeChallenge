import styled from "styled-components";
import Navbar from "../Navbar";
import { Switch, Route, useParams, Link, useLocation } from "react-router-dom";
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
  margin-top: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Leftside = styled.div`
  overflow-y: scroll;
  height: 90vh;
  width: 50%;
  padding: 0px 80px;
`

const Rightside = styled.div`
  height: 90vh;
  width: 50%;
  padding: 0px 80px;
`

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
  justify-content: space-between;
  align-items: center;
  font-size: 25px;
  padding: 20px 0px;
  border-bottom: 1px solid white;
  margin-bottom: 100px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Box = styled.div`
  width: 40%;
  border: 1px solid white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Content = styled.div`
  font-size: 20px;
  margin-bottom: 100px;
`;

const ExBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 100px 0px;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

interface Quizprops {
  correctnum: string;
  creationtime: string;
  explanation: string;
  image: Blob;
  input: string;
  output: string;
  presenter: string;
  questionnum: number;
  timelimit: string;
  title: string;
  trynum: string;
  memlimit: string;
}

function Quiz() {
  const { quizId } = useParams<RouteParams>();
  const { state } = useLocation<Quizprops>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [probId, setprobId] = useState(0);
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
      setprobId(state.questionnum)
      setprobName(state.title)
      if (Number(state.correctnum) === 0 && Number(state.trynum) === 0) {
        setprobRate(0);
      } else {
        setprobRate(Math.ceil(Number(state.correctnum) / Number(state.trynum) * 100))
      }
      setprobNum(state.trynum);
      setExplain(state.explanation);
      setTimelimt(state.timelimit);
      setMemlimit(state.memlimit);
      setInput(state.input);
      setOutput(state.output);
      setExaminer(state.presenter);
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
        <Leftside>
          <Header><div>{probName}</div> <div>정답률 : {probRate}%</div></Header>
          <Content>{explain}</Content>
          <ExBox><Box>예제 입력 : {exinput}</Box><Box>예제 출력 : {exoutput}</Box></ExBox>
          <Footer><div>시간 제한 : {timelimit}ms 메모리 제한 : {memlimit}MB</div> <div>출제자 : {examiner}</div></Footer>
        </Leftside>
        <Rightside><Codesubmit quizId={quizId}></Codesubmit></Rightside>
        {/* <Tabs>
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
        </Main> */}
      </Body>

      {/* <Switch>
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
      </Switch> */}
    </>
  );
}

export default Quiz;
