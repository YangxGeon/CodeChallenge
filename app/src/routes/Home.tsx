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
  height: 63vh;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = styled.footer`
  width: 100%;
  bottom: 0px;
  height: 30vh;
  background-color: #8c7ae6;
`;

function Home() {
  return (
    <>
      <Header>
        <Logo>
          <Link to="/">CodeChallenge</Link>
        </Logo>
        <Navbar>
          <Menu>
            <Link to="/allquiz">전체 문제</Link>
          </Menu>
          <Menu>
            <Link to="/stepquiz">단계별 문제</Link>
          </Menu>
          <Menu>
            <Link to="/typequiz">유형별 문제</Link>
          </Menu>
          <Menu>
            <Link to="/memberinfo">회원 정보</Link>
          </Menu>
        </Navbar>
        <LoginBtn>Log In</LoginBtn>
      </Header>
      <Main>여러 문제를 해결 하며 프로그래밍 실력을 키워 보세요</Main>
      <Footer></Footer>
    </>
  );
}

export default Home;
