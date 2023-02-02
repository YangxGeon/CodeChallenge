import Navbar from "../Navbar";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Audio } from "react-loader-spinner";
import axios from "axios";
import { useQuery } from 'react-query';
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

const ResultInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

function Result() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [language, setLanguage] = useState("");
  const [quesnum, setQuesnum] = useState("");
  const [submitter, setSubmitter] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState("");
  const [length, setLength] = useState("");
  const fetchResult = async () => {
    setError(null);
    setLoading(true);
    axios.get('/solveDB').then(function (response) {
      setData(response.data[0])
      setLanguage(response.data[0].language)
      setQuesnum(response.data[0].questionnum)
      setSubmitter(response.data[0].submitter)
      setTime(response.data[0].executiontime)
      setResult(response.data[0].result)
      setLength(response.data[0].length)
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
  if (error) return <div>에러가 발생했습니다</div>;
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
          <ResultInfo>
            <div>언어 : {language}</div><br/>
            <div>문제 번호 : {quesnum}</div><br/>
            <div>제출자 : {submitter}</div><br/>
            <div>코드 길이 : {length}</div><br/>
            <div>결과 : {result}</div><br/>
            <div>런타임 : {time}ms</div>
          </ResultInfo>
        )}
      </Main>
    </>
  );
}
export default Result;