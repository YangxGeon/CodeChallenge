import Navbar from "../Navbar";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios, { AxiosHeaders } from "axios";
import styled from 'styled-components';

const Main = styled.div`
  margin-top: 10vh;
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
        <div>questionnum:{location.questionnum}</div>
        <input name="title" value={title} onChange={e => setTitle(e.target.value)} />
        <input name="timelimit" value={timelimit} onChange={e => setTimelimit(e.target.value)} />
        <input name="memlimit" value={memlimit} onChange={e => setMemlimit(e.target.value)} />
        <input name="input" value={input} onChange={e => setInput(e.target.value)} />
        <input name="output" value={output} onChange={e => setOutput(e.target.value)} />
        <input name="explanation" value={explanation} onChange={e => setExplanation(e.target.value)} />
      </Main>
      <button onClick={() => modiDB()}></button>
    </div>
  );
}

export default ManagerM