import Navbar from "../Navbar";
import React, { useState } from "react";
import styled from "styled-components";
import { Switch, Route, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";



const Head = styled.div`
  display: flex;
	justify-content: center;
  align-items: center;
	font-size:40px;
	margin-top: 10vh;
  margin-bottom: 50px;
`;

const Problem = styled.table`
  // display: flex;
	margin: auto;
	width : 80%
`;
const Modi = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius : 10px;
  border : none;
`;
const Del = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color : red;
  border-radius : 10px;
  border : none;
`;
const Append = styled.button`
display: flex;
justify-content: center;
align-items: center;
border-radius : 10px;
border : none;
`
const Td = styled.td`
	text-align : center;
`;

const Button = styled.button`
  width: 80px;
  height: 50px;
  cursor: pointer;
  margin-left: 30px;
`

const Header = styled.thead`
  margin-bottom: 30px;
`

function Manager() {
  const [data, setdata] = useState([])
  const Delete = async (questionnum) => {
    const yesOrNo = window.confirm(`'${questionnum} 문제를 삭제하시겠습니까?`);
    if (yesOrNo == true) {
      axios.get(`/manager/del`, { params: { questionnum } }).then(function (response) {
        load()
      });
    }
  };
  const load = async () => {
    axios.get(`/manager/sel`, { params: { presenter: "hello" } }).then(function (response) {
      setdata(response.data)
    });
  };

  useEffect(() => {
    load()
  }, []);

  return (
    <>
      <Navbar />
      <Head>관리자 페이지</Head>
      <Link to={{ pathname: '/managerN' }}><Button>문제추가</Button></Link>
      <Problem>
        <thead>
          <tr>
            <th>문제 번호</th>
            <th>문제 이름</th>
            <th>시도횟수</th>
            <th>정답률</th>
            <th>관리</th>
          </tr>
        </thead>
        {/* <tbody>
            <tr>
            <Td>12345</Td>
            <Td>입,출력</Td>
            <Td>300</Td>
            <Td>50%</Td>
						<Td>
						<Link
              to={{
                pathname: `/managerM`,
								state:{questionnum : "1"}
              }}
            ><Modi>수정</Modi></Link>
						<Del onClick={()=>Delete("1")}>삭제</Del>
            </Td>
            </tr>
        </tbody> */}


        <tbody>
          {data?.map((v) => (
            <tr>
              <Td>{v.questionnum}</Td>
              <Td>{v.title}</Td>
              <Td>{v.trynum}</Td>
              <Td>{Number(v.correctnum) === 0 && Number(v.trynum) === 0 ? 0 : Math.ceil(v.correctnum / v.trynum * 100)}</Td>
              <Td><Link
                to={{
                  pathname: `/managerM/`,
                  state: { questionnum: v.questionnum }
                }}
              ><Modi>수정</Modi></Link>
                <Del onClick={() => Delete(v.questionnum)}>삭제</Del>
                <Link to={{
                  pathname: `/testcase`,
                  state: { questionnum: v.questionnum }
                }}><Append>테스트케이스 수정</Append></Link>
              </Td>
            </tr>
          ))}
        </tbody>
      </Problem>
    </>
  )
}

export default Manager;