import React, { Component } from 'react';
import { message, Row, Col, Collapse } from 'antd';
import { dateFormat, MyAjax, showConfirm } from './../../../utils';
import Chart from './../data';

const Panel = Collapse.Panel;
const Line = Chart.Line;

export default class Absence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      absenceResultOneMonth: [],
      earliaResultOneMonth: [],
      lateResultOneMonth: [],
      absenceResultThreeMonth: [],
      earliaResultThreeMonth: [],
      lateResultThreeMonth: [],
      absenceResultSixMonth: [],
      earliaResultSixMonth: [],
      lateResultSixMonth: [],
      plotCfg: {
        margin: [10, 120, 50, 100],
      },
    }
  }



  componentDidMount() {
    this.absenceCount();
  }

  //统计数据初始化
  initData = (type,count, data) => {

    let result = [];
    for (let i = 0; i < data[type].length; i++) {
      let obj = {};
      obj.name = data[type][i].staffId;
      obj.vote = parseInt(data[type][i][count]);
      result.push(obj);
    }
    this.setState({
      [type]: result
    })

  }

  //统计缺勤次数最少的
  absenceCount = () => {
    MyAjax("POST", "/selchart", {'sort':'asc'}, (data) => {
      if (data.absenceResultOneMonth) {
        this.initData("absenceResultOneMonth","absenceCount", data);
      }
      if (data.earliaResultOneMonth) {
        this.initData("earliaResultOneMonth", "earliaCount", data);
      }
      if (data.lateResultOneMonth) {
        this.initData("lateResultOneMonth","lateCount", data);
      }
      if (data.absenceResultThreeMonth) {
        this.initData("absenceResultThreeMonth","absenceCount", data);
      }
      if (data.earliaResultThreeMonth) {
        this.initData("earliaResultThreeMonth", "earliaCount",data);
      }
      if (data.lateResultThreeMonth) {
        this.initData("lateResultThreeMonth","lateCount", data);
      }
      if (data.absenceResultSixMonth) {
        this.initData("absenceResultSixMonth","absenceCount", data);
      }
      if (data.earliaResultSixMonth) {
        this.initData("earliaResultSixMonth","earliaCount", data);
      }
      if (data.lateResultSixMonth) {
        this.initData("lateResultSixMonth","lateCount", data);
      }

    })


  }


  render() {
    return (
      <Row>
        <Col xs={23}>
          <Collapse defaultActiveKey={['1']}>
            <Panel header="当前一月" key="1">
              <Row>

                <Col xs={7} style={{ textAlign: 'center' }}>
                  <span>缺勤次数统计</span>
                  <Line
                    data={this.state.absenceResultOneMonth}
                    width={450}
                    height={250}
                    plotCfg={this.state.plotCfg}
                    ref="absenceoneChart"
                  />
                </Col>
                <Col xs={7} style={{ textAlign: 'center' }}>
                  <span>迟到次数统计</span>
                  <Line
                    data={this.state.lateResultOneMonth}
                    width={450}
                    height={250}
                    plotCfg={this.state.plotCfg}
                    ref="lateoneChart"
                  />
                </Col>
                <Col xs={7} style={{ textAlign: 'center' }}>
                  <span>早退次数统计</span>
                  <Line
                    data={this.state.earliaResultOneMonth}
                    width={450}
                    height={250}
                    plotCfg={this.state.plotCfg}
                    ref="earliaoneChart"
                  />
                </Col>

              </Row>
            </Panel>
            <Panel header="当前一季度" key="2">
              <Row>

                <Col xs={7} style={{ textAlign: 'center' }}>
                  <span>缺勤次数统计</span>
                  <Line
                    data={this.state.absenceResultThreeMonth}
                    width={450}
                    height={280}
                    plotCfg={this.state.plotCfg}
                    ref="absencethreeChart"
                  />
                </Col>
                <Col xs={7} style={{ textAlign: 'center' }}>
                  <span>迟到次数统计</span>
                  <Line
                    data={this.state.lateResultThreeMonth}
                    width={450}
                    height={250}
                    plotCfg={this.state.plotCfg}
                    ref="latethreeChart"
                  />
                </Col>
                <Col xs={7} style={{ textAlign: 'center' }}>
                  <span>早退次数统计</span>
                  <Line
                    data={this.state.earliaResultThreeMonth}
                    width={450}
                    height={250}
                    plotCfg={this.state.plotCfg}
                    ref="earliathreeChart"
                  />
                </Col>

              </Row>
            </Panel>
            <Panel header="近半年" key="3">
              <Col xs={7} style={{ textAlign: 'center' }}>
                <span>缺勤次数统计</span>
                <Line
                  data={this.state.absenceResultSixMonth}
                  width={450}
                  height={250}
                  plotCfg={this.state.plotCfg}
                  ref="absencethreeChart"
                />
              </Col>
              <Col xs={7} style={{ textAlign: 'center' }}>
                <span>迟到次数统计</span>
                <Line
                  data={this.state.lateResultSixMonth}
                  width={450}
                  height={250}
                  plotCfg={this.state.plotCfg}
                  ref="latethreeChart"
                />
              </Col>
              <Col xs={7} style={{ textAlign: 'center' }}>
                <span>早退次数统计</span>
                <Line
                  data={this.state.earliaResultSixMonth}
                  width={450}
                  height={250}
                  plotCfg={this.state.plotCfg}
                  ref="earliathreeChart"
                />
              </Col>
            </Panel>
          </Collapse>
        </Col>
      </Row>

    );
  }
}