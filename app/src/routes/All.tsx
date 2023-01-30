import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

const Main = styled.main`
  padding: 0px 60px;
  height: 93vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Allquiz = styled.ul``;

const Quiz = styled.li`
  padding: 0px 10px;
  border: 3px white solid;
  width: 800px;
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
  const probId = 1;
  const probName = "테스트케이스";
  const probRate = 100;
  const probNumOfChallenge = 5;
  return (
    <>
      <Navbar></Navbar>
      <Main>
        <Allquiz>
          <Quiz>
            <Element>문제 번호 : {probId}</Element>
            <Element>문제 이름 : {probName}</Element>
            <Element>정답률 : {probRate}%</Element>
            <Element>도전 횟수 : {probNumOfChallenge}</Element>
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
