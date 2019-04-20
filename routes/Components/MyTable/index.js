import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, message } from 'antd';
import { MyAjax } from './../../utils';


export default class MyTable extends Component{

    constructor(props){
        super(props);
        this.state = {
            dataSource:[],
            pageIndex:1,
            pageSize:8,
            total:0,
            loading:false
        }
    }

    componentDidMount(){
        this.handleChange(1);
    }
    handleChange = (pageIndex = this.state.pageIndex) =>{

        //避免连续点击搜索按钮重复请求
        if(this.state.loading) return;
        let { url,params,keyName } = this.props;
        params = Object.assign({},params,{
            pageIndex:pageIndex,
            pageSize:this.state.pageSize
        })
        this.setState({
            loading:true
        })

        MyAjax("POST",url,params,(data)=>{          
            if(data.result.length !== 0 ){
               this.setState({
                   loading:false,
                   pageIndex:pageIndex,
                   dataSource:data[keyName].list,
                   total:data.result.total
               })
            }else{
                this.setState({
                    loading:false
                })
            }
        })

    }

    render(){

        const { columns, keyName } = this.props;
    
        const { pageIndex, pageSize, total, loading, dataSource } = this.state;
    
        const pagination = {
          total: total,
          showSizeChanger: false,
          pageSize: pageSize,
          current: pageIndex,
          showTotal:((total, range)=>{
            return `当前：${range[0]}-${range[1]} 共 ${total} 条数据`
          })
        }
    
        return(
    
          <Table
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            onChange={(e)=>this.handleChange(e.current)}
            pagination={pagination}
            rowKey={keyName}
          />
    
        )
    
    }
    
}

    
MyTable.propTypes = {
    url:PropTypes.string.isRequired,
    params:PropTypes.object.isRequired,
    keyName:PropTypes.string.isRequired,
    columns:PropTypes.array.isRequired
}
    