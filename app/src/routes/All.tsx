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

function All() {
  const [probId, setprobId] = useState("");
  const [probName, setprobName] = useState("");
  const [probRate, setprobRate] = useState(0);
  const [probNum, setprobNum] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
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
      setprobNum(response.data[0].trynum)
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
      <Main>
        <Allquiz>
          <Quiz>
            <Element>문제 번호 : {probId}</Element>
            <Element>문제 이름 : {probName}</Element>
            <Element>정답률 : {probRate}%</Element>
            <Element>도전 횟수 : {probNum}</Element>
            <Link
              to={{
                pathname: `/all/${probId}/quiz`,
                state: { name: probName }
              }}
            >
              <GotoChallenge>도전하러 가기 &rarr;</GotoChallenge>
            </Link>
          </Quiz>
        </Allquiz>
      </Main>
    </>
  );
}

export default All;
