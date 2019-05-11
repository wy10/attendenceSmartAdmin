import React, { Component } from 'react';
import { Dropdown, Menu, Icon, message } from 'antd';
import MyTable from './../../Components/MyTable';
import { dateFormat, MyAjax, showConfirm } from './../../utils';
import MyForm from './../../Components/MyForm';
import MyModal from './../../Components/MyModal';
import moment from 'moment';

export default class AbsenceOrLeaceSel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {},
      addFieldArr: [],
      searchFields: [{    // 记录查询筛选
        label: '工号',
        field: 'staffId',
        notNeed: true //非必填
      }, {
        label: '日期区间',
        type: 'datePicker',
        field: 'dateClock',
        defaultValue:moment().subtract(1, 'd'),
        notNeed: true //非必填
      }]
    }

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
    if(type == "leaveModal"){
        this.setState({
            addFieldArr:[
              {
                label: '员工工号',
                field: 'staffId',
                defaultValue:record.staffId,
                isDisable:true
            }, {
                label: '部门编号',
                field: 'workId',
                defaultValue:record.workId,
                isDisable:true
            }, {
                label: '打卡日期',
                field: 'dateClock',
                defaultValue:record.dateClock,
                isDisable:true
            },{
              label:'请假',
              field:'workState',
              type:'radio',
              options:[{label:'是',value:'0'}],
              defaultValue:'0'
            },{
              label:'请假时长',
              field:'leaveTimeCount',
              defaultValue:record.leaveTimeCount
            }]
        })
    }
}

handleLeave = (finishCB) =>{
    return params => {
        MyAjax("POST","/updateAttndenceCountCardSetting",params,(data)=>{
            if(data.result =='success'){
                this.refs.leaveModal.hideModal();
                message.success("请假设置成功");
                
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
  render() {

    const createMenu = (record) => {

      return (

        <Menu>
          <Menu.Item>
            <a onClick={() => { this.openModal('leaveModal', record) }}>转请假</a>
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
      title: '日期',
      dataIndex: 'dateClock',
      key: 'dateClock',
      render: (text) => dateFormat(text)
    }, {
      title: '缺勤/请假',
      dataIndex: 'workState',
      key: 'workState',
      render: (text) => text=='1' ? '缺勤' : '请假'
    }, {
      title: '操作',
      key: 'operator',
      render: (text, record, index) =>
        <Dropdown overlay={createMenu(record)}>
          <a style={{ width: 50, display: "inline-block" }}>
            <Icon type="menu-unfold" />
          </a>
        </Dropdown>
    }];

    return (
      <div>
        <MyForm
          fieldArr={this.state.searchFields}
          handleSubmit={this.searchSubmit}
          layout='inline' />

        <MyTable
          url="/selStaffAbsenceOrLeave"
          params={this.state.params}
          keyName="result"
          columns={columns}
          ref="MyTable"
        />

        <MyModal
          ref="leaveModal"
          title="请假设置"
          hiddenCB={this.resetStateField}
        >
          <MyForm
            fieldArr={this.state.addFieldArr}
            handleSubmit={this.handleLeave}
            type="submit"
            ref='leaveForm'>
          </MyForm>
        </MyModal>
      </div>
    )
  }
}