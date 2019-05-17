import React, { Component } from 'react';
import { Layout, Menu, Icon,message } from 'antd';
import { showConfirm,MyAjax } from './../../utils';
import MyForm from './../../Components/MyForm';
import MyModal from './../../Components/MyModal';

const SubMenu = Menu.SubMenu;
const { Content } = Layout;

export default class Right extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: "",
      addFieldArr: [],
    }
  }

  componentDidMount() {
    this.setState({
      admin: JSON.parse(window.localStorage.getItem("admin")).username
    })

  }

  handleClick = ({ key }) => {
    switch (key) {
      case "logOut":
        this.logOut();
        break;
      case "resetPwd":
        this.openModal("resetPwd");
        break;
    }
  };

  logOut = () => {

    showConfirm({
      title: '退出',
      content: `确认退出该系统？`,
      url: '/validToken',
      type: 'POST',

    });

  }

  openModal = (type) => {
    this.refs[type].showModal();
    if (type == "resetPwd") {
      this.setState({
        addFieldArr: [
          {
            label: '手机号',
            field: 'phoneNum',
            defaultValue:JSON.parse(window.localStorage.getItem("admin")).phoneNum,
            isDisable:true
          }, {
            label: '密码',
            field: 'password',
            type: 'password'
          }]
      })
    }
  }

  handelPwd = (finishCB) => {
    return params => {
      MyAjax("POST", "/updateAdminPassword", params, (data) => {
        if (data.result == 'success') {
          this.refs.resetPwd.hideModal();
          message.success("密码修改成功");

        } else {
          message.error("服务器繁忙");

        }
        finishCB();
      })
    }
  }

  resetStateField = () => {
    this.setState({
      addFieldArr: []
    })
  }





  render() {
    return (
      <Content>
        <div style={{ marginBottom: 8, textAlign: 'right' }} >
          <Menu
            theme={'light'}
            mode="horizontal"
            onClick={this.handleClick}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>{this.state.admin}, 您好！</span>
                </span>
              }
            >
              {/* {
              UIStore.accUrl && <Menu.Item key="qr_url"><Icon type="qrcode"/>打借款链接</Menu.Item>
            } */}
              <Menu.Item key="resetPwd"><Icon type="lock" />修改密码</Menu.Item>
              <Menu.Item key="logOut"><Icon type="logout" />退出</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        <div style={{ paddingLeft: 10 }}>
          {this.props.children}
        </div>

        <MyModal
          ref="resetPwd"
          title="新增"
          hiddenCB={this.resetStateField}
        >
          <MyForm
            fieldArr={this.state.addFieldArr}
            handleSubmit={this.handelPwd}
            type="submit"
            ref='resetPwdForm'>
          </MyForm>
        </MyModal>


      </Content>
    )
  }
}
