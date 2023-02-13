import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Table, TableBody, TableRow, TableCell } from "@mui/material";
import axios from "axios";

const JoinForm = () => {
  const navigate = useHistory();
  const [formData, setFormData] = useState({
    userid: "",
    userpass: "",
    userpassck: "",
    username: "",
    userstate: "",
    usermanager: "No"
  });

  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [idMessage, setIdMessage] = React.useState("");
  const [nameMessage, setNameMessage] = React.useState("");
  const [passwordMessage, setPasswordMessage] = React.useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =  React.useState("");
  const [emailMessage, setEmailMessage] = React.useState("");

  const [isId, setIsId] = React.useState(false);
  const [isname, setIsName] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = React.useState(false);
  const [isEmail, setIsEmail] = React.useState(false);
  const [state,setState] = React.useState(false);
  const onChangeId = (e) => {
    const currentId = e.target.value;
    setId(currentId);
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
 
    if (!idRegExp.test(currentId)) {
      setIdMessage("4-12사이 대소문자 또는 숫자만 입력해 주세요!");
      setIsId(false);
    } else {
      setIdMessage("사용가능한 아이디 입니다.");
      setIsId(true);
      setState(true);
    }
  };
 
  const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
 
    if (currentName.length < 2 || currentName.length > 5) {
      setNameMessage("닉네임은 2글자 이상 5글자 이하로 입력해주세요!");
      setIsName(false);
    } else {
      setNameMessage("사용가능한 닉네임 입니다.");
      setIsName(true);
    }
  };
 
  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호 입니다.");
      setIsPassword(true);
    }
  };
  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("떼잉~ 비밀번호가 똑같지 않아요!");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("똑같은 비밀번호를 입력했습니다.");
      setIsPasswordConfirm(true);
    }
  };
  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
    
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage("이메일의 형식이 올바르지 않습니다!");
      setIsEmail(false);
    } else {
      setEmailMessage("사용 가능한 이메일 입니다.");
      setIsEmail(true);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSumbit = (e) => {
    // form에 원래 연결된 이벤트를 제거
    e.preventDefault();
    console.log(formData);

    // input에 값이 있는지 체크하고
    // 입력이 다되어있으면 post전송
    addMember();
  };
  const [isDuplicate, SetDuplicate] = React.useState(false);

  const duplicate = async ()=>{
    axios.post("/duplicate",{params:{
      id:formData.userid
    }}).then(function(response){
      console.log(response.data)
      if(response.data.length===0){
        SetDuplicate(true)
        alert("사용한 가능한 id입니다");
      }
      else{
        alert("이미 존재하는 id입니다.");
      }

    })
  }
  function addMember() {
    axios
      .post(`/join`, formData)
      .then((response) => {
        alert("등록되었습니다.");
        navigate.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      <h2>신규 고객 등록하기</h2>
      <form onSubmit={onSumbit}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>ID</TableCell>
              <button onClick={()=>duplicate()}>중복검사</button>
              <TableCell>
                <input
                  name="userid"
                  type="text"
                  value={formData.userid}
                  onChange={onChangeId}
                />
                <p>{idMessage}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>비밀번호</TableCell>
              <TableCell>
                <input
                  name="userpass"
                  type="password"
                  value={formData.userpass}
                  onChange={onChangePassword}
                />
                <p>{passwordMessage}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>비밀번호체크</TableCell>
              <TableCell>
                <input
                  name="userpassck"
                  type="password"
                  value={formData.userpassck}
                  onChange={onChangePasswordConfirm}
                />
                <p>{passwordConfirmMessage}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>이름</TableCell>
              <TableCell>
                <input
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={onChangeName}
                />
                <p>{nameMessage}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>이메일</TableCell>
              <TableCell>
                <input
                  name="usermail"
                  type="text"
                  value={formData.usermail}
                  onChange={onChangeEmail}
                />
                <p>{emailMessage}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>상태</TableCell>
              <TableCell>
                <input
                  name="userstate"
                  type="text"
                  value={formData.userstate}
                  onChange={onChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <button type="submit" disabled={!(isId&&isEmail&&isname&&isPassword&&isPasswordConfirm)}>등록</button>
                <button type="reset">취소</button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </form>
    </div>
  );
};

export default JoinForm;
