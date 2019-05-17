import React, { Component } from 'react';
import Chart from './../data';
import { dateFormat, MyAjax, showConfirm } from './../../../utils';

const BrokenLine = Chart.BrokenLine;

export default class Smart extends Component {

    constructor(props) {
        super(props);
        this.state = {
             data: [],
            forceFit: true,
            width: 500,
            height: 450
        };
    }

    componentDidMount() {
        this.absenceCount();
      }
    
      //统计数据初始化
      initData = (data) => {
    
        let result = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {};
          obj.staffId = data[i].staffId;
          if(data[i].allTime == null){
            obj.allTime =0;
          }else{
            obj.allTime = parseInt(data[i].allTime);
          }
          obj.dateClock = data[i].dateClock.slice(5);
          result.push(obj);
        }
        this.setState({
           data:result
        },()=>{console.log(result)})
    
      }
    
      //统计缺勤次数最少的
      absenceCount = () => {
        MyAjax("POST", "/selchartcountallTime", {},(data) => {
          if (data.result) {
            this.initData(data.result);
          }
        })
    
    
      }

    render() {
        return (
            <div>
                <BrokenLine
                    data={this.state.data}
                    width={this.state.width}
                    height={this.state.height}
                    forceFit={this.state.forceFit} />
            </div>
        );

    }

}