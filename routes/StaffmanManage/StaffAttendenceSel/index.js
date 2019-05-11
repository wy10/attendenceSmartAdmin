import React, { Component } from 'react';
import MyTable from '../../Components/MyTable';
import { dateFormat } from '../../utils';
import MyForm from '../../Components/MyForm';
import moment from 'moment';

export default class StaffAttendenceSel extends Component{
    constructor(props){
        super(props);
        this.state = {
            params:{},
            searchFields: [{    // 记录查询筛选
                label: '工号',
                field: 'staffId',
                notNeed: true //非必填
              }
              ,{
                type:'select',
                label: '出勤情况',
                options: [
                  {label:'非迟到非早退',value:'normal'},
                  {label:'迟到',value:'late'},
                  {label:'早退',value:'earlier'},
                ],
                field: 'attendenceType',
                notNeed: true //非必填
              },{
                type:'select',
                label: '迟到/早退分钟数',
                options: [
                  {label:'[0-30]分钟',value:'0-30'},
                  {label:'[30-60]分钟',value:'30-60'},
                  {label:'大于一小时',value:'60-1440'},
                ],
                field: 'unexpectedMinu',
                notNeed: true //非必填
              },{
                label: '日期区间',
                type:  'datePicker',
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
      },()=>{
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
            title: '日期',
            dataIndex: 'dateClock',
            key: 'dateClock',
            render:(text)=>dateFormat(text)
          },{
            title: '上班打卡时间',
            dataIndex: 'startPersonTime',
            key: 'startPersonTime',
            render:(text)=> text?text:''
        },{
            title: '下班打卡时间',
            dataIndex: 'endPersonTime',
            key: 'endPersonTime',
            render:(text)=>text?text:''
        },{
            title: '所在总时长',
            dataIndex: 'allTime',
            key: 'allTime',
            render:(text)=>(text/60).toFixed(2)
        }];

        return(
            <div>
                <MyForm 
                    fieldArr={this.state.searchFields} 
                    handleSubmit={this.searchSubmit} 
                    layout='inline'/>

                <MyTable 
                    url="/selStaffmanAll"
                    params={this.state.params}
                    keyName="result"
                    columns={columns}
                    ref="MyTable"
                />
            </div>
        )
    }
}