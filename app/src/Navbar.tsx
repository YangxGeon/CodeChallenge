import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = styled.header`
  width: 100%;
  height: 7vh;
  background-color: #8c7ae6;
  display: flex;
  align-items: center;
  position: relative;
  position: fixed;
  top: 0;
`;

const Logo = styled.div`
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
`;

const Nav = styled.nav`
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

const SignUpBtn = styled.button`
  width: 55px;
  height: 35px;
  border-radius: 10px;
  border: none;
  position: absolute;
  right: 70px;
  cursor: pointer;
`;

function Navbar() {
  return (
    <>
      <Header>
        <Logo>
          <Link to="/">CodeChallenge</Link>
        </Logo>
        <Nav>
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
        </Nav>
      </Header>
    </>
  );
}

export default Navbar;
