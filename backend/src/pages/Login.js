import React from "react";
import { Card, Input, Button, Spin, message } from "antd";
import {UserOutlined, LockOutlined } from "@ant-design/icons"
import "../static/style/Login.css"
import axios from 'axios'
import servicePath from '../config/apiUrl'
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const checkLogin = ()=>{
    setIsLoading(true)
    if(!username){
      message.error('You must enter a username.')
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return false
    } else if (!password){
      message.error('You must enter a password.')
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return false
    }

    let dataProps = {
      'username': username,
      'password': password
    }

    axios({
      method: 'post',
      url: servicePath.checkLogin,
      data: dataProps,
      withCredentials: true
    }).then(
      res => {
        setIsLoading(false)
        if(res.data.data == 'Successful login'){
          localStorage.setItem('openId', res.data.openId)
          navigate('index')

        } else {
          message.error('Your username or password is incorrect.')
        }
      }
    )

  }
  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="An Blog System" bordered={true} style={{ width: 400 }}>
          <Input
            id="username"
            size="large"
            placeholder="Enter your username"
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={(e) => {setUsername(e.target.value)}}
          />
          <br/><br/>
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={(e) => {setPassword(e.target.value)}}
          />
          <br/><br/>
          <Button type="primary" size="large" block onClick={checkLogin}>Log In</Button>
        </Card>
      </Spin>
    </div>
  );
}
