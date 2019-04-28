import React, { Component } from 'react';
import { Button, Input } from 'antd';
import { hashHistory } from 'react-router';
import './assets/index.css';
import { MyAjax } from './../utils/index';
import { mobileVerify } from './../utils/vertify';


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phoneNumSta: null,
            passwordSta: null,
            errSta: null
        }
    }

    handleLogin = () => {

        if (mobileVerify(this.state.phoneNumSta)) {
            if (this.state.passwordSta !== null && this.state.passwordSta !== '') {
                this.setState({
                    errSta: null
                })
                MyAjax("POST","/selectAdminByUsername",{
                    phoneNum:this.state.phoneNumSta,
                    password:this.state.passwordSta
                },(data)=>{
                    if(data.result != '{}' || data.result.length !== 0 ){
                        hashHistory.push({
                            pathname: "/BasicAttendence"
                            
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