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

        const columns = [ {
            title: '姓名',
            dataIndex: 'staffName',
            key: 'staffName',
          }, {
            title: '工号',
            dataIndex: 'staffId',
            key: 'staffId',
          },{
            title: '迟到次数',
            dataIndex: 'lateCount',
            key: 'lateCount',
            render:(text) => text?text:'0'
        },{
          title: '迟到时长',
          dataIndex: 'lateTimeCount',
          key: 'lateTimeCount',
          render:(text)=>text?(text/60).toFixed(2):'0'
         },{
            title: '早退次数',
            dataIndex: 'earliaCount',
            key: 'earliaCount',
            render:(text) => text?text:'0'
        },{
          title: '早退时长',
          dataIndex: 'earliaTimeCount',
          key: 'earliaTimeCount',
          render:(text) => text?(text/60).toFixed(2):'0'
        },{
            title: '请假时长',
            dataIndex: 'leaveTimeCount',
            key: 'leaveTimeCount',
            render:(text) => text?text:'0'
        },{
            title: '公司加班时长',
            dataIndex: 'overtimeCompanyCount',
            key: 'overtimeCompanyCount',
            render:(text) => text?text:'0'
          },{
            title: '个人加班时长',
            dataIndex: 'overtimePersonCount',
            key: 'overtimePersonCount',
            render:(text) => text?(text/60).toFixed(2):'0'
          },{
            title:'缺勤次数',
            dataIndex:'absenceCount',
            key:'absenceCount',
            render:(text) => text?text:'0'
          }];

        return(
            <div>
                <MyForm 
                    fieldArr={this.state.searchFields} 
                    handleSubmit={this.searchSubmit} 
                    layout='inline'/>

                <MyTable 
                    url="/selectAllchart"
                    params={this.state.params}
                    keyName="result"
                    columns={columns}
                    ref="MyTable"
                />
            </div>
        )
    }
}