import Navbar from "../Navbar";
import { useState } from 'react';
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";

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
  width: 70px;
  height: 40px;
  margin-top: 30px;
  cursor: pointer;
`

function ManagerN() {
  const [title, setTitle] = useState("")
  const [timelimit, setTimelimit] = useState("")
  const [memlimit, setMemlimit] = useState("")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [explanation, setExplanation] = useState("")
  const history = useHistory();

  const testapp = async () => {
    axios.get('/manager/tc', {
      params: {
        title
      }
    })
  }
  const insert = async () => {
    axios.get('/manager/insert'
      , {
        params: {
          title, timelimit, memlimit, input, output, explanation, presenter: "hello", input, output
        }
      }
    ).then(function (response) {
      testapp()
      alert("문제 추가에 성공했습니다.")
      history.push('/manager')


    })
      .catch(function (error) {
        alert("문제 추가에 실패했습니다.");
      });
  }
  const test = async () => {
    axios.get('/testcase', {
      params: {
        questionnum: "9"
      }
    })
  }

  return (
    <div>
      <Navbar />
      <Main>
        <Title>
          문제 추가
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
        <Button onClick={() => insert()}>추가</Button>
      </Main>
    </div>

  );

}
export default ManagerN