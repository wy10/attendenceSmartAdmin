import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Menu, Icon, Switch, Layout } from 'antd';

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;
const MENU_ARR = [
  {
    title:'员工考勤管理',
    icon:'mail',
    child:[
      {
        link:'/BasicAttendence',
        title:'考勤统计',
        goRoute:()=>{
          hashHistory.push({
            pathname: "/BasicAttendence"   
          });
        }
      },
      {
        link:'/StaffAttendenceSel',
        title:'员工考勤查询',
        goRoute:()=>{
          hashHistory.push({
            pathname: "/StaffAttendenceSel"   
          });
        }
      }
    ]
  }
];

export default class Left extends Component {
  state = {
    theme: 'dark',
    current: '1',
  }

  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <Sider>
        <Switch
          checked={this.state.theme === 'dark'}
          onChange={this.changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
        <br />
        <br />
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          style={{ width: 200 }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
         
          {
            MENU_ARR.map((item,index)=>{
              return(
                <SubMenu key={index} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                  {
                    item.child.map((itemChild,childIndex)=>{
                      return(
                        <Menu.Item key={index+childIndex}>
                          <a onClick = {itemChild.goRoute}>{itemChild.title}</a>
                        </Menu.Item>
                      
                      )
                    })
                  }
                </SubMenu> 
              )
            })
          }

        
        </Menu>
      </Sider>
    );
  }
}