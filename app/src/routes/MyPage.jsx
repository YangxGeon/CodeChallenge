import axios from "axios";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadavg } from "os";
import { profile } from "console";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Head = styled.div`
  display: flex;
  flex:1;
  flex-direction: column;
`;
const Name = styled.div`
  font-size : 20px;
`;
const State = styled.div`
  font-size : 15px;
`;
const Middle = styled.div`
  display: flex;
  flex:3;
  flex-direction: row;
  justify-content: center;
`;

const SideBar = styled.div`
  display: flex;
  flex:1;
  flex-direction: column;
`;

const Main = styled.div`
  display:flex;
  flex:1;
  flex-direction: column;
`

function MyPage() {
  const [data,setData] = useState({})
  const [profile,setProfile] = useState({})
  const load = async () => {
    axios.get('/profile').then(function(response){
      setProfile(response.data[0])
    })
    axios.get(`/mySolve`).then(function (response) {
      setData(response.data[0])
    });
  }
  useEffect(() => {
    load()
  },[]);
  
  return (
    <>
      <Navbar></Navbar>
      <Container>
      <Head>
        <Name>{profile.name}</Name>
        <State>{profile.state}</State>
        </Head>
      <Middle>
        <Left>
          <table>
            <tbody>
              <tr>
                <td>profile.id</td>
                <td>profile.email</td>
                <td>소속 그룹 열거형으로</td>
              </tr>
            </tbody>
          </table>
        </Left>
        <Center>
          <div>해결한 문제 :
            {data?.map((v)=>{
              <Link to={`/all/${v.questinonum}/quiz`} >v.questionnum</Link>
            })}
          </div>
        </Center>
        <Right>
          <div>그래프 등등(nivo chart)</div>

        </Right>
      </Middle>
      



      
      </Container>
    </>
  );
}

export default MyPage;