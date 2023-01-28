import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = styled.header`
  width: 100%;
  height: 7vh;
  background-color: #8c7ae6;
  display: flex;
  align-items: center;
  position: relative;
`;

const Logo = styled.div`
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 200px;
`;

const Menu = styled.div`
  margin-right: 40px;
`;

const LoginBtn = styled.button`
  width: 55px;
  height: 35px;
  border-radius: 10px;
  border: none;
  position: absolute;
  right: 10px;
  cursor: pointer;
`;

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
      <Header>
        <Logo>
          <Link to="/">CodeChallenge</Link>
        </Logo>
        <Navbar>
          <Menu>
            <Link to="/all">전체 문제</Link>
          </Menu>
          <Menu>
            <Link to="/popular">인기 문제</Link>
          </Menu>
          <Menu>
            <Link to="/hard">오답률 높은 문제</Link>
          </Menu>
          <Menu>
            <Link to="/unique">푼 사람이 없는 문제</Link>
          </Menu>
        </Navbar>
        <LoginBtn>Log In</LoginBtn>
      </Header>
      <Main>
        <Allquiz>
          <Quiz>
            <Element>문제 번호 : {probId}</Element>
            <Element>문제 이름 : {probName}</Element>
            <Element>정답률 : {probRate}%</Element>
            <Element>도전 횟수 : {probNumOfChallenge}</Element>
            <Link
              to={{
                pathname: `/all/${probId}`,
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
