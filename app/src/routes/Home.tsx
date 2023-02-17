import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
// const session = require("express-session");
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

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
`;
const Content1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  padding: 100px 0px;
`;
const Content2 = styled.div`
  width: 80%;
  height: 44%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Ranks = styled.ul`
  border: white 3px solid;
  border-radius: 25px;
  padding: 20px;
  background-color: white;
  color: black;
  font-size: 30px;
  width: 600px;
  height: 300px;
`;
const Rank = styled.table`
  margin-top: 18px;
  font-size: 25px;
`;
const Td = styled.td`
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
interface QuizListInterface {
  correctnum: string;
  creationtime: string;
  explanation: string;
  image: Blob;
  input: string;
  output: string;
  presenter: string;
  questionnum: number;
  timelimit: string;
  title: string;
  trynum: string;
}

const Button = styled.li`
  border: none;
  background-color: none;
  color: black;

  &:hover {
    font-weight: bolder;
    cursor: pointer;
  }
`;

function Home() {
  const history = useHistory();
  const [author_id, setAuthor_id] = useState("");
  const [id, setId] = useState("");
  const [quizList, setQuizList] = useState<QuizListInterface[]>();
  axios.get("/popularquizDB").then(function (response) {
    console.log(response.data);
    setQuizList(response.data);
  });
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
  const onClickEvent = (quiz: QuizListInterface) => {
    axios.post("/session_check").then(function (response) {
      setAuthor_id(response.data.author_id);
      setId(response.data.uid);

      if (response.data.uid === undefined) {
        alert("로그인 후 이용해주세요");
        history.push("/");
      } else {
        history.push({
          pathname: `/all/${quiz.questionnum}/quiz`,
          state: {
            title: quiz.title,
            correctnum: quiz.correctnum,
            explanation: quiz.explanation,
            input: quiz.input,
            output: quiz.output,
            presenter: quiz.presenter,
            questionnum: quiz.questionnum,
            trynum: quiz.trynum,
            timelimit: quiz.timelimit,
            memlimit: quiz.timelimit
          }
        });
      }
    });
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
            <table>
              <tbody>
                {quizList?.slice(0, 4).map((quiz, index) => (
                  <tr>
                    <Td>{index + 1}위 : </Td>
                    <Td>{quiz.title}</Td>
                    <Td>
                      <Button onClick={() => onClickEvent(quiz)}>
                        도전하러가기
                      </Button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Ranks>
          <Ranks>
            <div>명예의 전당</div>
            <Rank>1위 : 박민규</Rank>
            <Rank>2위 : 양승건</Rank>
            <Rank>3위 : 김건우</Rank>
            <Rank>4위 : 김용원</Rank>
            <Rank></Rank>
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
