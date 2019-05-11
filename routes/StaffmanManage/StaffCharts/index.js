import React, { Component } from 'react';
import { Tabs } from 'antd';
import Absence from './Absence';
import Good from './Good';
import Overtime from './Overtime';

const TabPane = Tabs.TabPane;

export default class StaffCharts extends Component{

    render(){     

        return(
          <Tabs defaultActiveKey="1" >
            <TabPane tab="考勤情况较好" key="1"><Good></Good></TabPane>
            <TabPane tab="考勤情况较差" key="2"><Absence></Absence></TabPane>
            <TabPane tab="加班情况分析" key="3"><Overtime></Overtime></TabPane>
        </Tabs>
        )
    }
}