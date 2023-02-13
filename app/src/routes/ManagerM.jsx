import Navbar from "../Navbar";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios, { AxiosHeaders } from "axios";
import styled from 'styled-components';


const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;
`

const Title = styled.div`
  font-size: 30px;
  margin-bottom: 50px;
`

const Inputdiv = styled.div`
  margin-bottom: 30px;
`

const Button = styled.button`
  width: 120px;
  height: 40px;
  margin-top: 30px;
  cursor: pointer;
`

function ManagerM() {
  const [title, setTitle] = useState("")
  const [timelimit, setTimelimit] = useState("")
  const [memlimit, setMemlimit] = useState("")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [explanation, setExplanation] = useState("")
  const location = useLocation().state;
  const history = useHistory()

  // ${location.questionnum}
  const fetchResult = async () => {
    axios.get(`/manager/modi`, { params: { questionnum: location.questionnum } }).then(function (response) {
      console.log(response.data)
      setTitle(response.data[0].title)
      setTimelimit(response.data[0].timelimit)
      setMemlimit(response.data[0].memlimit)
      setInput(response.data[0].input)
      setOutput(response.data[0].output)
      setExplanation(response.data[0].explanation)
      // setState({title : response.data[0].title,
      //   timelimit : response.data[0].timelimit,
      //   memlimit : response.data[0].memlimit,
      //   input : response.data[0].input,
      //   output : response.data[0].output,
      //   explanation : response.data[0].explanation
      // })
    });
  };
  const modiDB = async () => {
    axios.get('/manager/modi/run', {
      params: {
        title, timelimit, memlimit, input, output, explanation, questionnum: location.questionnum
      }
    }).then(function (response) {
      alert("문제 수정에 성공했습니다.");
      history.push('/manager')
      //manager 페이지로 리다이렉트
    })
      .catch(function (error) {
        alert("문제 수정에 실패했습니다.");
      });
  }

  useEffect(() => {
    fetchResult()
    console.log(location.questionnum, title, timelimit, memlimit, input, output, explanation)
  }, []);

  return (
    <div>
      <Navbar />
      <Main>
        <Title>
          문제 수정 : {location.questionnum}
        </Title>
        <Inputdiv>
          <input placeholder='문제 이름' name="title" value={title} onChange={e => setTitle(e.target.value)} />
          <input placeholder='시간 제한' name="timelimit" value={timelimit} onChange={e => setTimelimit(e.target.value)} />
          <input placeholder='메모리 제한' name="memlimit" value={memlimit} onChange={e => setMemlimit(e.target.value)} />
        </Inputdiv>
        <div>
          <textarea cols={30} rows={5} placeholder='문제 설명' name="explanation" value={explanation} onChange={e => setExplanation(e.target.value)} />
          <textarea rows={5} placeholder='예제 입력' name="input" value={input} onChange={e => setInput(e.target.value)} />
          <textarea rows={5} placeholder='예제 출력' name="output" value={output} onChange={e => setOutput(e.target.value)} />
        </div>
        <Button onClick={() => modiDB()}>문제 수정하기</Button>
      </Main>
    </div>
  );
}

export default ManagerM