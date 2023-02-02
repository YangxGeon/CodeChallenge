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


function Result() {
  // const { quizId } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  // const { isLoading, quizresult } = useQuery(["result", searchApi]);
  const fetchResult = async () => {

    setError(null);
    setLoading(true);
    const response = await axios.get(
      'http://10.0.20.119:8080/db'
    );
    setData(response.data);
    console.log(data);
    
    setLoading(false);
  };

  useEffect(() => {
    fetchResult();
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
          <div>
            {data}
          </div>
        )}
      </Main>
    </>
  );
}

export default Result;
