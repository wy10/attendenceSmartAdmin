import React, { Component } from 'react';
import { Button,message,Dropdown,Menu,Icon } from 'antd';
import MyForm from './../../Components/MyForm';
import MyModal from './../../Components/MyModal';
import MyTable from './../../Components/MyTable';
import { MyAjax,showConfirm } from './../../utils';

export default class Admin extends Component{

    constructor(props){
        super(props);
        this.state = {
            params:{},
            addFieldArr: [],
            record:{},
            workDeptOptions:[],
            searchFields: [{    // 记录查询筛选
                label: '姓名',
                field: 'username',
                notNeed: true //非必填
              }]
        }
        
    }

    //禁用
    updateDisable = (params) => {
    
        MyAjax("POST","/updateAdminDisable",params,(data)=>{
        if(data.result =='success'){
            this.refs.addAdmin.hideModal();
            
        }else{
            message.error("服务器繁忙");

        }
        this.refs.MyTable.handleChange(1);
      })
    }

    // 查询筛选
    searchSubmit = () => {

      return params => {
    
        params = { ...this.state.params, ...params }
  
        this.setState({
          params
        }, () => {
          this.refs.MyTable.handleChange(1);
        })
  
      }
  
    }

    openModal = (type,record = {}) => {
        this.refs[type].showModal();
        if(type == "addAdmin"){
            this.setState({
                addFieldArr:[
                    {
                        label: '姓名',
                        field: 'username',
                    }, {
                        label: '手机号',
                        field: 'phoneNum',
                    }, {
                        label: '密码',
                        field: 'password',
                        type:'password'
                    }]
            })
        }
    }

    handelAddAdmin = (finishCB) =>{
        return params => {
            MyAjax("POST","/insertAdmin",params,(data)=>{
                if(data.result =='success'){
                    this.refs.addAdmin.hideModal();
                    message.success("添加成功");
                    
                }else{
                    message.error("服务器繁忙");

                }
                this.refs.MyTable.handleChange(1);
                finishCB();
            })
        }
    }

    resetStateField = () =>{
        this.setState({
            addFieldArr:[]
        })
    }

    render(){

        const createMenu = (record) => {

            const { params, word } = record.isDisable === '0' ?
      
              { params: { isDisable: '1',phoneNum: record.phoneNum }, word: '禁用' } :
      
              { params: { isDisable: '0', phoneNum: record.phoneNum }, word: '启用' };
      
            return (
      
              <Menu> 
                
                <Menu.Item>
                    <a onClick={() => this.updateDisable(params)}>{word}</a>
                </Menu.Item>
      
              </Menu>
      
            )
          };
      

        const columns = [{
            title: '姓名',
            dataIndex: 'username',
            key: 'username',
          },{
            title: '手机号',
            dataIndex: 'phoneNum',
            key: 'phoneNum',
        },{
            title: '是否禁用',
            dataIndex: 'isDisable',
            key: 'isDisable',
            render:(text)=> text=='0'?'否':<span style={{color:'red'}}>是</span>
        },{
            title: '操作',
            key: 'operator',
            render: (text, record, index) =>
              <Dropdown overlay={createMenu(record)}>
                <a style={{ width: 50, display: "inline-block" }}>
                  <Icon type="menu-unfold" />
                </a>
              </Dropdown>
          }];

        return(
            <div>
            
                <MyForm 
                    fieldArr={this.state.searchFields} 
                    handleSubmit={this.searchSubmit} 
                    layout='inline'/>

                <Button 
                    type="primary" 
                    onClick={()=>{this.openModal("addAdmin")}}
                    style={{marginBottom:5}}
                >新增员工</Button>

                <MyTable 
                    url="/selAlladmin"
                    params={this.state.params}
                    keyName="result"
                    columns={columns}
                    ref="MyTable"
                />

                {/* 新增 */}
                <MyModal 
                    ref="addAdmin"
                    title="新增"
                    hiddenCB={this.resetStateField}
                >
                    <MyForm 
                        fieldArr={this.state.addFieldArr} 
                        handleSubmit={this.handelAddAdmin} 
                        type="submit" 
                        ref='addStaffmanForm'>
                    </MyForm>
                </MyModal>           
               </div>
        )
    }
}