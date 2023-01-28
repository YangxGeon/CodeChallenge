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
  height: 87vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Content1 = styled.div`
  padding: 40px 20px;
  width: 33%;
  height: 100%;
  display: flex;
  justify-content: center;
  font-size: 30px;
`;

const Content2 = styled.div`
  padding: 40px 20px;
  width: 33%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
`;

const Ranks = styled.ul`
  border: white 3px solid;
  border-radius: 20px;
  width: 400px;
  padding: 20px;
  background-color: #dcdde1;
  color: black;
  font-size: 30px;
`;

const Rank = styled.li`
  margin-top: 15px;
  font-size: 25px;
`;

const Box = styled.div`
  border: white 3px solid;
  border-radius: 20px;
  width: 400px;
  padding: 20px;
  background-color: #dcdde1;
  color: black;
  font-size: 30px;
  display: flex;
  justify-content: center;
`;

const Footer = styled.footer`
  width: 100%;
  bottom: 0px;
  height: 6vh;
  background-color: #8c7ae6;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img``;

function Home() {
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
        <Content1>
          <Box>SW중심대학산업단</Box>
        </Content1>
        <Content2>
          <Ranks>
            <div>인기 있는 문제</div>
            <Rank>1</Rank>
            <Rank>2</Rank>
            <Rank>3</Rank>
            <Rank>4</Rank>
            <Rank>5</Rank>
          </Ranks>
          <Ranks>
            <div>명예의 전당</div>
            <Rank>1</Rank>
            <Rank>2</Rank>
            <Rank>3</Rank>
            <Rank>4</Rank>
            <Rank>5</Rank>
          </Ranks>
        </Content2>
        <Content1>
          <Box>페이지 설명</Box>
        </Content1>
      </Main>
      <Footer>
        만든이 : 단국대학교 컴퓨터공학과 김용원, 김건우, 박민규, 양승건
      </Footer>
    </>
  );
}

export default Home;
