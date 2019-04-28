import React, { Component } from 'react';
import { Menu, Icon, Layout,Switch } from 'antd';
import { MENU_ARR } from './Menu';

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;


export default class Left extends Component {
  state = {
    current: '员工考勤管理0',
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <Sider style={{ height: '100vh'}}>
        <h2 style={{color:'white',textAlign:'center',marginTop:15}}><span>智能考勤管理</span></h2>
        <Menu
          style={{ width: 200}}
          theme="dark"
          onClick={this.handleClick}
          defaultOpenKeys={['0']}
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
                        <Menu.Item key={item.title+childIndex}>
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