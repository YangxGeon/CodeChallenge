import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

const Main = styled.main`
  padding: 0px 60px;
  height: 93vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Allquiz = styled.ul``;

const Quiz = styled.li`
  padding: 15px;
  border: 3px white solid;
  height: 70px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 20px;
  a {
    display: block;
  }
`;

const Element = styled.div`
  margin-right: 20px;
  border-right: 2px white solid;
  padding-right: 20px;
`;

const GotoChallenge = styled.div`
  color: black;
`;

interface QuizListInterface {
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
}

function All() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [quizList, setQuizList] = useState<QuizListInterface[]>();
  const fetchResult = async () => {
    setError(null);
    setLoading(true);
    axios.get('/quizDB').then(function (response) {
      setQuizList(response.data);
      console.log(response.data);
    });
  };
  useEffect(() => {
    fetchResult()
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <Main>
        <Allquiz>
          {quizList?.map((quiz) => (
            <Quiz key={quiz.questionnum}>
              <Element>문제 번호 : {quiz.questionnum}</Element>
              <Element>문제 이름 : {quiz.title}</Element>
              <Element>정답률 : {Number(quiz.correctnum) === 0 && Number(quiz.trynum) === 0 ? 0 : Number(quiz.correctnum) / Number(quiz.trynum)}%</Element>
              <Element>도전 횟수 : {quiz.trynum}</Element>
              <Link
                to={{
                  pathname: `/all/${quiz.questionnum}/quiz`,
                  state: { title: quiz.title, correctnum:quiz.correctnum, explanation:quiz.explanation, input:quiz.input, output:quiz.output, presenter:quiz.presenter, questionnum:quiz.questionnum, trynum: quiz.trynum, timelimit:quiz.timelimit, memlimit:quiz.timelimit }
                }}
              >
                <GotoChallenge>도전하러 가기 &rarr;</GotoChallenge>
              </Link>
            </Quiz>
          ))}
        </Allquiz>
      </Main>
    </>
  );
}

export default All;
