import React, { Component } from 'react';
import MyTable from '../../Components/MyTable';
import { dateFormat } from '../../utils';
import MyForm from '../../Components/MyForm';

export default class StaffCardDetailSel extends Component{
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
                type:  'datePicker',
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
            title: '进入时间记录',
            dataIndex: 'startPersonTime',
            key: 'startPersonTime',
            render:(text)=> text?text:''
        },{
            title: '离开时记录',
            dataIndex: 'endPersonTime',
            key: 'endPersonTime',
            render:(text)=>text?text:''
        }];

        return(
            <div>
                <MyForm 
                    fieldArr={this.state.searchFields} 
                    handleSubmit={this.searchSubmit} 
                    layout='inline'/>

                <MyTable 
                    url="/selStaffmanByStaffidDateclock"
                    params={this.state.params}
                    keyName="result"
                    columns={columns}
                    ref="MyTable"
                />
            </div>
        )
    }
}