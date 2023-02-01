import Navbar from "../Navbar";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Audio } from "react-loader-spinner";

const Main = styled.div`
  height: 93vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface RouteParams {
  quizId: string;
}

function Result() {
  const { quizId } = useParams<RouteParams>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
  });
  const lang = "python";
  const time = "10";
  const result = true;
  return (
    <>
      <Navbar></Navbar>
      <Main>
        {loading ? (
          <LoadingBar>
            <Audio height="80" width="80" color="white" ariaLabel="loading" />
            <br />
            열심히 계산하는 중이에요
          </LoadingBar>
        ) : (
          <div>
            푼 문제 : {quizId} 사용 언어 : {lang} 런타임 시간 : {time}ms
            <br />
            <br />
            결과 : {result ? "정답" : "오답"}
          </div>
        )}
      </Main>
    </>
  );
}

export default Result;
