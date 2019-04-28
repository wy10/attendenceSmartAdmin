import React, { Component } from 'react';
import { Button,message,Dropdown,Menu,Icon } from 'antd';
import MyForm from './../../Components/MyForm';
import MyModal from './../../Components/MyModal';
import MyTable from './../../Components/MyTable';
import { MyAjax,showConfirm } from './../../utils';

export default class workDept extends Component{
    constructor(props){
        super(props);
        this.state = {
            params:{},
            addFieldArr: [],
            workDeptOptions:[],
        }
        
    }

    openModal = (type,record={}) => {
        this.refs[type].showModal();
        if(type == "addWorkDept"){
            this.setState({
                addFieldArr:[
                    {
                        label: '部门',
                        field: 'workDept',
                    }]
            })
        }else if(type == 'updateWorkDept'){
            
            this.setState({
                addFieldArr:[
                    {
                        label: '部门编号',
                        field: 'workId',
                        defaultValue:record.workId+"",
                        isDisable:true
                    },{
                        label: '部门',
                        field: 'workDept',
                        defaultValue:record.workDept,
                    }],
            })

        }
    }

    handelAddWorkDept = (finishCB) =>{
        return params => {
            MyAjax("POST","/insertWorkDept",params,(data)=>{
                if(data.result =='success'){
                    this.refs.addWorkDept.hideModal();
                    message.success("添加成功");
                    
                }else{
                    message.error("服务器繁忙");

                }
                this.refs.MyTable.handleChange(1);
                finishCB();
            })
        }
    }

    handleUpdateWorkDept = (finishCB) =>{
        return params => {
           
            MyAjax("POST","/updateWorkDeptByWorkid",params,(data)=>{
                if(data.result =='success'){
                    this.refs.updateWorkDept.hideModal();
                    
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

    deleteWorkDept = (record) => {
        showConfirm({
          title: '删除部门',
          content:`是否确认删除该部门？`,
          url:'/deleteWorkDeptByWorkId',
          params: {workId:record.workId},
          type:'POST',
          success:()=>{
            message.success("删除成功");
            this.refs.MyTable.handleChange();
          }
        });
    
      };

    render(){

        const createMenu = (record) => {
        
            return (
        
              <Menu>
        
                <Menu.Item>
                  <a onClick={() => { this.openModal("updateWorkDept",record)}}>修改</a>
                </Menu.Item>
        
                <Menu.Item>
                  <a onClick={() => this.deleteWorkDept(record)}>删除</a>
                </Menu.Item>
        
              </Menu>
            )
          };

        const columns = [{
            title: '部门编号',
            dataIndex: 'workId',
            key: 'workId',
          }, {
            title: '部门名称',
            dataIndex: 'workDept',
            key: 'workDept',
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

                <Button type="primary" onClick={()=>{this.openModal("addWorkDept",null)}}>新增部门</Button>

                <MyTable 
                    url="/selWorkdept"
                    params={this.state.params}
                    keyName="result"
                    columns={columns}
                    ref="MyTable"
                />

                {/* 新增修改员工 */}
                <MyModal 
                    ref="addWorkDept"
                    title="新增部门"
                    hiddenCB={this.resetStateField}
                >
                    <MyForm 
                        fieldArr={this.state.addFieldArr} 
                        handleSubmit={this.handelAddWorkDept} 
                        type="submit" 
                        ref='addWorkDeptForm'>
                    </MyForm>
                </MyModal>

                <MyModal 
                    ref="updateWorkDept"
                    title="部门信息修改"
                    hiddenCB={this.resetStateField}
                >
                    <MyForm 
                        fieldArr={this.state.addFieldArr} 
                        handleSubmit={this.handleUpdateWorkDept} 
                        type="submit" 
                        ref='updateWorkDeptForm'>
                    </MyForm>
                </MyModal>
            </div>
        )
    }
}