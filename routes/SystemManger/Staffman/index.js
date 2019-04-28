import React, { Component } from 'react';
import { Button,message,Dropdown,Menu,Icon } from 'antd';
import MyForm from './../../Components/MyForm';
import MyModal from './../../Components/MyModal';
import MyTable from './../../Components/MyTable';
import { MyAjax,showConfirm } from './../../utils';

export default class Staffman extends Component{
    constructor(props){
        super(props);
        this.state = {
            params:{},
            addFieldArr: [],
            record:{},
            workDeptOptions:[],
            searchFields: [{    // 记录查询筛选
                label: '工号',
                field: 'staffId',
                notNeed: true //非必填
              }]
        }
        
    }

    componentDidMount(){
        //获取研发部门的数据
        MyAjax("POST","/selWorkdept",{},(data)=>{
            if(data.result != '{}' || data.result.length !== 0 ){
                let wholeData = data.result;
                for(let i in wholeData){
                  wholeData[i].value = wholeData[i].workId + '';
                  wholeData[i].label = wholeData[i].workDept;
                }
                this.setState({
                    workDeptOptions:wholeData
                },()=>{
                    this.setState({
                        searchFields:[...this.state.searchFields,{    // 记录查询筛选
                            label: '部门',
                            field: 'workId',
                            type:'select',
                            options:this.state.workDeptOptions,
                            notNeed: true //非必填
                          }]
                    })
                })
            }
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
        if(type == "addStaffman"){
            this.setState({
                addFieldArr:[
                    {
                        label: '姓名',
                        field: 'staffName',
                    }, {
                        label: '部门',
                        field: 'workId',
                        type: 'select',
                        imode: 'multiple',
                        options:this.state.workDeptOptions
                    }, {
                        label: '联系方式',
                        field: 'phone',
                    }]
            })
        }else if(type == 'updateStaffman'){
            
            this.setState({
                addFieldArr:[
                    {
                        label: '工号',
                        field: 'staffId',
                        defaultValue:record.staffId,
                        isDisable:true
                    },{
                        label: '姓名',
                        field: 'staffName',
                        defaultValue:record.staffName,
                        isDisable:true
                    },{
                        label: '部门',
                        field: 'workId',
                        type: 'select',
                        imode: 'multiple',
                        options:this.state.workDeptOptions,
                        defaultValue:record.workDept
                    }, {
                        label: '联系方式',
                        field: 'phone',
                        defaultValue:record.phone
                }],
                record:record
            })

        }
    }

    handelAddStaffman = (finishCB) =>{
        return params => {
            MyAjax("POST","/insertSaffman",params,(data)=>{
                if(data.result =='success'){
                    this.refs.addStaffman.hideModal();
                    message.success("加班设置成功");
                    
                }else{
                    message.error("服务器繁忙");

                }
                this.refs.MyTable.handleChange(1);
                finishCB();
            })
        }
    }

    handleUpdateStaffman = (finishCB) =>{
        return params => {
            //如果用户没有修改点击提交的话select会默认成为文字而不是id
            if(params.workId == this.state.record.workDept){
                params.workId = this.state.record.workId
            }
            MyAjax("POST","/updateStaffmanByStaffId",params,(data)=>{
                if(data.result =='success'){
                    this.refs.updateStaffman.hideModal();
                    message.success("加班设置成功");
                    
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

    deleteStaffman = (record) => {
        showConfirm({
          title: '删除员工',
          content:`是否确认删除该员工？`,
          url:'/deleteStaffmanBystaffId',
          params: {staffId:record.staffId},
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
                  <a onClick={() => { this.openModal("updateStaffman",record) }}>修改</a>
                </Menu.Item>
        
                <Menu.Item>
                  <a onClick={() => this.deleteStaffman(record)}>删除</a>
                </Menu.Item>
        
              </Menu>
            )
          };

        const columns = [{
            title: '工号',
            dataIndex: 'staffId',
            key: 'staffId',
          }, {
            title: '姓名',
            dataIndex: 'staffName',
            key: 'staffName',
          }, {
            title: '部门',
            dataIndex: 'workDept',
            key: 'workDept',
        },{
            title: '联系方式',
            dataIndex: 'phone',
            key: 'phone',
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

                <Button type="primary" onClick={()=>{this.openModal("addStaffman")}}>新增员工</Button>

                <MyTable 
                    url="/selAllStaffman"
                    params={this.state.params}
                    keyName="result"
                    columns={columns}
                    ref="MyTable"
                />

                {/* 新增修改员工 */}
                <MyModal 
                    ref="addStaffman"
                    title="新增员工"
                    hiddenCB={this.resetStateField}
                >
                    <MyForm 
                        fieldArr={this.state.addFieldArr} 
                        handleSubmit={this.handelAddStaffman} 
                        type="submit" 
                        ref='addStaffmanForm'>
                    </MyForm>
                </MyModal>

                <MyModal 
                    ref="updateStaffman"
                    title="员工信息修改"
                    hiddenCB={this.resetStateField}
                >
                    <MyForm 
                        fieldArr={this.state.addFieldArr} 
                        handleSubmit={this.handleUpdateStaffman} 
                        type="submit" 
                        ref='updateStaffmanForm'>
                    </MyForm>
                </MyModal>
            </div>
        )
    }
}