import Navbar from "../Navbar";
import { useState } from 'react';
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";

const Main = styled.div`
  margin-top: 10vh;
`

const titleInput = styled.input`
  display: flex;
	margin: 50px;
	justify-content: center;
  align-items: center;
  flex-direction: column
	font-size:40px;
`;

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
        <input name="title" value={title} onChange={e => setTitle(e.target.value)} />
        <input name="timelimit" value={timelimit} onChange={e => setTimelimit(e.target.value)} />
        <input name="memlimit" value={memlimit} onChange={e => setMemlimit(e.target.value)} />
        <input name="input" value={input} onChange={e => setInput(e.target.value)} />
        <input name="output" value={output} onChange={e => setOutput(e.target.value)} />
        <input name="explanation" value={explanation} onChange={e => setExplanation(e.target.value)} />
      </Main>
      <button onClick={() => insert()}></button>
      <button onClick={() => test()} />
    </div>

  );

}
export default ManagerN