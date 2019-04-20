import React, { Component } from 'react';
import MyTable from './../../Components/MyTable';
import { timeFormat } from './../../utils';
import MyForm from './../../Components/MyForm';

export default class BasicAttendence extends Component{
    constructor(props){
        super(props);
        this.state = {
            params:{},
            searchFields: [{    // 记录查询筛选
                label: '工号',
                field: 'staffId',
                notNeed: true //非必填
              },{
                label: '日期区间',
                type:  'rangePicker',
                field: 'dateClock',
                notNeed: true //非必填
              }]
        }
        
    }

    // 查询筛选
    // 查询筛选
    searchSubmit = () => {

      return params => {
        params.startTime = params['dateClock'][0]
        params.endTime = params['dateClock'][1]
  
        params = { ...this.state.params, ...params }
  
        this.setState({
          params
        }, () => {
          this.refs.MyTable.handleChange(1);
        })
  
      }
  
    }

    render(){

        const columns = [{
            title: '工号',
            dataIndex: 'staffId',
            key: 'staffId',
          }, {
            title: '姓名',
            dataIndex: 'staffName',
            key: 'staffName',
          }, {
            title: '迟到',
            dataIndex: 'lateCount',
            key: 'lateCount',
        },{
            title: '早退',
            dataIndex: 'earlierCount',
            key: 'earlierCount',
        },{
            title: '请假',
            dataIndex: 'leaveCount',
            key: 'leaveCount',
        },{
            title: '缺勤',
            dataIndex: 'absenceCount',
            key: 'absenceCount',
        },{
            title: '公司加班时长',
            dataIndex: 'overTimeCompanyCount',
            key: 'overTimeCompanyCount',
          },{
            title: '个人加班时长',
            dataIndex: 'overTimePersonCount',
            key: 'overTimePersonCount',
            render:(text) => (text/60).toFixed(2)
          }];

        return(
            <div>
                <MyForm 
                    fieldArr={this.state.searchFields} 
                    handleSubmit={this.searchSubmit} 
                    layout='inline'/>

                <MyTable 
                    url="/selBasicAttendenceBystaffidDateclock"
                    params={this.state.params}
                    keyName="result"
                    columns={columns}
                    ref="MyTable"
                />
            </div>
        )
    }
}