

import React, { Component } from 'react';
import { message, Row, Col, Collapse } from 'antd';
import { dateFormat, MyAjax, showConfirm } from './../../../utils';
import Chart from './../data';

const Pie = Chart.Pie;

export default class Overtime extends Component {

  constructor(props) {
    super(props);
    this.state = {
      overtimeOne: [],
      overtimeThree: [],
      overtimeSix: [],
      width: 500,
      height: 250,
      plotCfg: {
        margin: [10, 100, 50, 120],
      },
    }

  }

  state = {
    data: [
      { name: 'Microsoft Internet Explorer', value: 56.33 },
      { name: 'Chrome', value: 50.03 }
    ],

  }

  initData = (type, data) => {

    let result = [],company={},staff={};
    company.name="公司",
    company.value = parseFloat((data[type].overtimeCompanyCount/data[type].overtimeCompanyCount+data[type].overtimePersonCount/60).toFixed(2));
    staff.name = "员工"
    staff.value = parseFloat((data[type].overtimePersonCount/60/data[type].overtimeCompanyCount+data[type].overtimePersonCount/60).toFixed(2));
    result.push(company);
    result.push(staff);
    console.log(company,staff);
    this.setState({
      [type]: result
    })

  }

  componentDidMount() {
    MyAjax("POST", "/selovertimechart",{}, (data) => {
      if (data.overtimeOne) {
        this.initData("overtimeOne", data);
      }
      if (data.overtimeThree) {
        this.initData("overtimeThree",  data);
      }
      if (data.overtimeSix) {
        this.initData("overtimeSix",  data);
      }
    })
  }

render() {
  return (
    <Row style={{marginTop:20}}>
      <Col xs={7} style={{textAlign:'center'}}>
      <span>近期一个月</span>
      <Pie
        data={this.state.overtimeOne}
        width={this.state.width}
        height={this.state.height}
        plotCfg={this.state.plotCfg}
        ref="myChart"
      />
      </Col>
      <Col xs={7} style={{textAlign:'center'}}>
      <span>近期三个月</span>
      <Pie
        data={this.state.overtimeThree}
        width={this.state.width}
        height={this.state.height}
        plotCfg={this.state.plotCfg}
        ref="myChart"
      />
      </Col>
      <Col xs={7} style={{textAlign:'center'}}>
      <span>近期半年</span>
      <Pie
        data={this.state.overtimeSix}
        width={this.state.width}
        height={this.state.height}
        plotCfg={this.state.plotCfg}
        ref="myChart"
      />
      </Col>  
    </Row>
  );
}
}