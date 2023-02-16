import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
// const session = require("express-session");
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
const Wrapper = styled.div`
  height: 300px;
`;
// const Image = styled.img`
//   height: 300px;
//   width: 500px;
//   object-fit: fill;
// `;
const Main = styled.main`
  height: 87vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7vh;
`;
const Content1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;
const Content2 = styled.div`
  width: 33%;
  height: 44%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Ranks = styled.ul`
  border: white 3px solid;
  border-radius: 25px;
  width: 650px;
  padding: 20px;
  background-color: #eeeee;
  color: white;
  font-size: 30px;
  margin-left: 33px;
  margin-middle: 10px;
  margin-top: -30px;
`;
const Rank = styled.li`
  margin-top: 18px;
  font-size: 25px;
`;
const Box = styled.div`
  padding: 20px;
  font-size: 50px;
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
const ImgBox = styled.div`
  margin-top: 6%;
`;
function Home() {
  // console.log(session.uid)
  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 0,
    cssEase: "linear"
  };
  return (
    <>
      <Navbar></Navbar>
      <ImgBox>
        <Wrapper>
          {/* ...settings: 위의 객체 내용이 들어옴 */}
          <Slider {...settings}>
            <div>
              <a href="https://swcu.dankook.ac.kr/web/swcup" target="_blank">
                <img
                  src="assets/img/hm.png"
                  height="300px"
                  width="500px"
                  alt="img"
                ></img>
              </a>
            </div>
            <div>
              <a
                href="https://swcu.dankook.ac.kr/web/swcup/-12?p_p_id=Bbs_WAR_bbsportlet&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-2&p_p_col_count=1&_Bbs_WAR_bbsportlet_curPage=1&_Bbs_WAR_bbsportlet_action=view_message&_Bbs_WAR_bbsportlet_messageId=765493"
                target="_blank"
              >
                <img
                  src="assets/img/img0.png"
                  height="300px"
                  width="500px"
                  alt="img"
                ></img>
              </a>
            </div>
            <div>
              <a
                href="https://swcu.dankook.ac.kr/web/swcup/-12?p_p_id=Bbs_WAR_bbsportlet&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-2&p_p_col_count=1&_Bbs_WAR_bbsportlet_curPage=1&_Bbs_WAR_bbsportlet_action=view_message&_Bbs_WAR_bbsportlet_messageId=767741"
                target="_blank"
              >
                <img
                  src="assets/img/img1.png"
                  height="300px"
                  width="500px"
                  alt="img"
                ></img>
              </a>
            </div>
            <div>
              <a href="https://swcu.dankook.ac.kr/web/swcup" target="_blank">
                <img
                  src="assets/img/hm.png"
                  height="300px"
                  width="500px"
                  alt="img"
                ></img>
              </a>
            </div>
            <div>
              <a
                href="https://swcu.dankook.ac.kr/web/swcup/-12?p_p_id=Bbs_WAR_bbsportlet&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-2&p_p_col_count=1&_Bbs_WAR_bbsportlet_curPage=1&_Bbs_WAR_bbsportlet_action=view_message&_Bbs_WAR_bbsportlet_messageId=765493"
                target="_blank"
              >
                <img
                  src="assets/img/img0.png"
                  height="300px"
                  width="500px"
                  alt="img"
                ></img>
              </a>
            </div>
            <div>
              <a
                href="https://swcu.dankook.ac.kr/web/swcup/-12?p_p_id=Bbs_WAR_bbsportlet&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-2&p_p_col_count=1&_Bbs_WAR_bbsportlet_curPage=1&_Bbs_WAR_bbsportlet_action=view_message&_Bbs_WAR_bbsportlet_messageId=767741"
                target="_blank"
              >
                <img
                  src="assets/img/img1.png"
                  height="300px"
                  width="500px"
                  alt="img"
                ></img>
              </a>
            </div>
          </Slider>
        </Wrapper>
      </ImgBox>
      <Main>
        <Content1>
          <Box>『여러 문제를 풀며 코딩 실력을 키워보세요』</Box>
        </Content1>
        <Content2>
          <Ranks>
            <div>인기 문제</div>
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
      </Main>
      <Footer>
        만든이 : 단국대학교 컴퓨터공학과 김용원, 김건우, 박민규, 양승건
      </Footer>
    </>
  );
}
export default Home;
