import React, { Component } from 'react';
import { Menu, Icon, Layout,Switch } from 'antd';
import { MENU_ARR } from './Menu';
import { hashHistory } from 'react-router';

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;


export default class Left extends Component {
 
  state = {
    current:'/UnSettingStaff'
  }

  //解决浏览器前进后退菜单高亮显示
  componentDidMount() {
    this.handlePop()
    window.addEventListener("popstate", this.handlePop)
  }
  componentWillUnmount() {
    window.removeEventListener("popstate", this.handlePop)
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

  handlePop =() =>{
    let str = window.location.hash.slice(1);
    if(str == '/Login'){
      // alert("")
      // hashHistory.push({
      //   //阻止退到login
      //   pathname: "/UnSettingStaff"
        
      // });
    }else{
      this.setState({
        current: window.location.hash.slice(1),
      })
    }
  
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
                        <Menu.Item key={itemChild.link}>
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