import React, { Component } from 'react';
import { Dropdown, Menu, Icon, message } from 'antd';
import MyTable from './../../Components/MyTable';
import { dateFormat, MyAjax, showConfirm } from './../../utils';
import MyForm from './../../Components/MyForm';
import MyModal from './../../Components/MyModal';

export default class UnSettingStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {},
      dateClock: dateFormat(new Date().getTime() - 24*60*60*1000),
      searchFields: [{
        label: '日期区间',
        type: 'datePicker',
        field: 'dateClock',
        notNeed: true //非必填
      }]
    }

  }

  // 查询筛选
  searchSubmit = () => {

    return params => {

      params = { ...this.state.params, ...params }

      this.setState({
        params,
        dateClock: params.dateClock //设置员工转为缺勤或者请假需要设置当天日期
      }, () => {
        this.refs.MyTable.handleChange(1);
      })

    }

  }

  //转缺勤
  turnToAbsence = (record) => {
    showConfirm({
      title: '转为缺勤',
      content: `是否将该员工转为缺勤？`,
      url: '/updateStaffAttCardSetting',
      params: {
        staffId: record.staffId,
        workId: record.workId,
        dateClock: this.state.dateClock,
        workState: '1'
      },
      type: 'POST',
      success: () => {
        message.success("操作成功");
        this.refs.MyTable.handleChange();
      }
    });

  };
  //转请假
  turnToLeave = (record) => {
    showConfirm({
      title: '转为请假',
      content: `是否将该员工转为请假？`,
      url: '/updateStaffAttCardSetting',
      params: {
        staffId: record.staffId,
        workId: record.workId,
        dateClock: this.state.dateClock,
        workState: '0'
      },
      type: 'POST',
      success: () => {
        message.success("操作成功");
        this.refs.MyTable.handleChange();
      }
    });
  }

  openModal = (type, record) => {
    this.refs[type].showModal();
    if (type == "cardModal") {
      this.setState({
        addFieldArr: [
          {
            label: '员工工号',
            field: 'staffId',
            defaultValue: record.staffId,
            isDisable: true
          }, {
            label: '部门编号',
            field: 'workId',
            defaultValue: record.workId,
            isDisable: true
          }, {
            label: '打卡日期',
            field: 'dateClock',
            defaultValue: this.state.dateClock,
            isDisable: true
          }, {
            label: '上班打卡时间',
            type: 'timePicker',
            field: 'starttime',
          }, {
            label: '下班打卡时间',
            type: 'timePicker',
            field: 'endtime',
          }, {
            label: '是否加班',
            field: 'isOvertime',
            type: 'radio',
            options: [{ label: '否', value: '0' }, { label: '是', value: '1' }],
            defaultValue: '0'
          }, {
            label: '加班时长',
            field: 'overtimeCompanyCount',
            defaultValue: '0'
          }]
      })
    }
  }

  //补卡设置
  handleCard = (finishCB) => {
    return params => {
      params.startPersonTime = params.starttime._i;
      params.endPersonTime = params.endtime._i;
      params.workState = '2';
      delete params.starttime;
      delete params.endtime;
      MyAjax("POST", "/updateStaffAttCardSetting", params, (data) => {
        if (data.result == 'success') {
          this.refs.cardModal.hideModal();
          message.success("补卡设置成功");

        } else {
          message.error("服务器繁忙");

        }
        this.refs.MyTable.handleChange(1);
        finishCB();
      })
    }
  }

  render() {

    const createMenu = (record) => {

      return (

        <Menu>

          <Menu.Item>
            <a onClick={() => { this.turnToAbsence(record) }}>转缺勤</a>
          </Menu.Item>

          <Menu.Item>
            <a onClick={() => { this.turnToLeave(record) }}>转请假</a>
          </Menu.Item>

          <Menu.Item>
            <a onClick={() => { this.openModal("cardModal", record) }}>补卡</a>
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
          url="/selectNotSettingStaff"
          params={this.state.params}
          keyName="result"
          columns={columns}
          ref="MyTable"
        />
        <MyModal
          ref="cardModal"
          title="补卡设置"
          hiddenCB={this.resetStateField}
        >
          <MyForm
            fieldArr={this.state.addFieldArr}
            handleSubmit={this.handleCard}
            type="submit"
            ref='cardForm'>
          </MyForm>
        </MyModal>
      </div>
    )
  }
}