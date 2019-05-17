import React, { Component } from 'react';
import { Button, Input, message } from 'antd';
import { hashHistory } from 'react-router';
import './assets/index.css';
import { MyAjax } from './../utils/index';
import { mobileVerify } from './../utils/vertify';
import store from './../Common/UIStore';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phoneNumSta: null,
            passwordSta: null,
            errSta: null,
        }
    }

  
    PayIncrease = () =>{
        store.dispatch({
            type:'add_adminInfo',
            value:"111"
        })
    }

    handleLogin = () => {

        if (mobileVerify(this.state.phoneNumSta)) {
            if (this.state.passwordSta !== null && this.state.passwordSta !== '') {
                this.setState({
                    errSta: null
                })
                MyAjax("POST","/login",{
                    phoneNum:this.state.phoneNumSta,
                    password:this.state.passwordSta
                },(data)=>{
                    if(data.result == 'login_error'){
                        message.error("用户名密码不匹配")
                        
                    }else{
                        window.localStorage.setItem("Authorization",data.result.token);
                        window.localStorage.setItem("admin",JSON.stringify(data.result));
                        
                        // store.dispatch({
                        //     type:'add_adminInfo',
                        //     value:data.result
                        // })

                        hashHistory.push({
                            //成功之后进入员工打卡详细页面
                            pathname: "/UnSettingStaff"
                            
                        });
                    }
                })
                return;

            }

        }
        this.setState({
            errSta: '用户名或密码输入有误！'
        })

    }
    render() {
        return (
            <div className="loginBg">

                <div className="loginForm">
                    <h1>登录 <span style={{ color: 'red', fontSize: 16 }}>{this.state.errSta}</span></h1>
                    
                    <Input
                        placeholder="请输入用户账号"
                        style={{ marginTop: 10 }}
                        value={this.state.phoneNumSta}
                        onChange={(e) => this.setState({ phoneNumSta: e.target.value })}
                    ></Input>

                    <Input.Password
                        placeholder="请输入密码"
                        style={{ marginTop: 20 }}
                        value={this.state.passwordSta}
                        onChange={(e) => { this.setState({ passwordSta: e.target.value }) }}
                    />

                    <div style={{ textAlign: 'right', marginTop: 30 }}>
                        <Button
                            type='primary'
                            onClick={this.handleLogin}
                        >登录</Button>
                    </div>


                </div>

            </div>
        )
    }
}


  export default Login