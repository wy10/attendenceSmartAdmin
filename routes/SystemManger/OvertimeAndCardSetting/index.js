import React, { Component } from 'react';
import { Row, Col, message } from 'antd';
import MyModal from './../../Components/MyModal';
import MyForm from './../../Components/MyForm';
import { MyAjax } from './../../utils';

export default class OvertimeAndCardSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addFieldArr: [],
            workDeptOptions: [],
            company: {}
        }
    }

    componentDidMount() {
        //获取研发部门的数据
        MyAjax("POST", "/selWorkdept", {}, (data) => {
            if (data.result != '{}' || data.result.length !== 0) {
                let wholeData = data.result;
                for (let i in wholeData) {
                    wholeData[i].value = wholeData[i].workId + '';
                    wholeData[i].label = wholeData[i].workDept;
                }
                this.setState({
                    workDeptOptions: wholeData
                })
            }
        })

        MyAjax("POST", "/selCompanyTime", {}, (data) => {
            if (data) {
                this.setState({
                    company: data
                })
            }
        })
    }

    openModal = (type) => {
        this.refs[type].showModal();
        if (type == "overtimeSetting") {
            this.setState({
                addFieldArr: [
                    {
                        label: '加班日期',
                        field: 'dateClock',
                        type: 'datePicker',
                    }, {
                        label: '部门',
                        field: 'workId',
                        type: 'select',
                        imode: 'multiple',
                        options: this.state.workDeptOptions
                    }, {
                        label: '加班时长',
                        field: 'overtimeCompanyCount',
                    }, {
                        label: '是否加班',
                        field: 'isOvertime',
                        type: 'radio',
                        options: [{ label: '确认加班', value: '1' }, { label: '取消加班', value: '0' }],
                        defaultValue: "1"
                    }
                ]
            })
        } else if (type == 'cardSetting') {
            this.setState({
                addFieldArr: [
                    {
                        label: '员工工号',
                        field: 'staffId',
                    }, {
                        label: '部门',
                        field: 'workId',
                        type: 'select',
                        imode: 'multiple',
                        options: this.state.workDeptOptions
                    }, {
                        label: '打卡日期',
                        field: 'dateClock',
                        type: 'datePicker'
                    }, {
                        label: '上班打卡时间',
                        type: 'timePicker',
                        field: 'startPersonTime',
                    }, {
                        label: '下班打卡时间',
                        type: 'timePicker',
                        field: 'endPersonTime',
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
        } else {
            this.setState({
                addFieldArr: [
                    {
                        label: '上班时间',
                        field: 'startCompanyTime',
                        type: 'timePicker',
                    }, {
                        label: '下班时间',
                        field: 'endCompanyTime',
                        type: 'timePicker',
                    }, {
                        label: '午休时长',
                        field: 'lunchTime',
                    }
                ]
            })
        }
    }

    //提交加班设置
    handleOvertime = (finishCB) => {
        return params => {
            MyAjax("POST", "/updateStaffAttOvertimeSetting", params, (data) => {
                if (data.result == 'success') {
                    this.refs.overtimeSetting.hideModal();
                    message.success("加班设置成功");

                } else {
                    message.error("服务器繁忙");

                }
                finishCB();
            })

        }

    }
    //提交补卡设置
    handleCard = (finishCB) => {
        return params => {
            params.workState = '2';
            MyAjax("POST", "/updateStaffAttCardSetting", params, (data) => {
                if (data.result == 'success') {
                    this.refs.cardSetting.hideModal();
                    message.success("设置成功");

                } else {
                    message.error("服务器繁忙");

                }
                finishCB();
            })
        }

    }

    //提交公司设置
    handleCompany = (finishCB) => {
        return params => {
            MyAjax("POST", "/updateCompanyByid", params, (data) => {
                if (data.result == 'success') {
                    this.refs.companySetting.hideModal();
                    message.success("时间设置成功");

                } else {
                    message.error("服务器繁忙");

                }
                finishCB();
            })

        }
    }

    //清空表单数据
    resetStateField = () => {
        this.setState({
            addFieldArr: []
        })
    }

    render() {
        return (
            <div style={{margin:35}}>
                <Row>
                    <Col
                        xs={6}
                        onClick={() => this.openModal("overtimeSetting")}
                        style={{ paddingBottom:100,paddingTop:100, marginRight: 20, background: '#ADD8E6', textAlign: 'center', borderRadius: '10%' }}
                    >
                        部门加班设置
                    </Col>
                    <Col
                        xs={6}
                        onClick={() => this.openModal("cardSetting")}
                        style={{ paddingTop: 100, marginRight: 20, paddingBottom: 100, background: '#87CEFA', textAlign: 'center', borderRadius: '10%' }}
                    >
                        异常 补卡/加班 设置
                    </Col>
                    {this.state.company.isDisable == '0' ?
                        <Col
                            xs={6}
                            onClick={() => this.openModal("companySetting")}
                            style={{ paddingTop: 100, paddingBottom: 100, background: '#B0E0E6', textAlign: 'center', borderRadius: '10%' }}
                        >
                            公司时间设置
                        </Col> : <Col
                            xs={6}
                            style={{ paddingTop: 55,paddingBottom: 60, background: '#87CEEB', textAlign: 'center', borderRadius: '10%' }}
                            >
                            <p>上班时间：{this.state.company.startCompanyTime}</p>
                            <p>下班时间：{this.state.company.endCompanyTime}</p>
                            <p>午休时长：{this.state.company.lunchTime}</p>
                        </Col>
                    }


                </Row>

                <MyModal
                    ref="overtimeSetting"
                    title="部门加班设置"
                    hiddenCB={this.resetStateField}
                >
                    <MyForm
                        fieldArr={this.state.addFieldArr}
                        handleSubmit={this.handleOvertime}
                        type="submit"
                        ref='overtimeSettingForm'>
                    </MyForm>
                </MyModal>

                <MyModal
                    ref="cardSetting"
                    title="个人 补卡/加班 设置"
                    hiddenCB={this.resetStateField}
                >
                    <MyForm
                        fieldArr={this.state.addFieldArr}
                        handleSubmit={this.handleCard}
                        type="submit"
                        ref='cardSettingForm'>
                    </MyForm>
                </MyModal>

                <MyModal
                    ref="companySetting"
                    title="公司时间设置"
                    hiddenCB={this.resetStateField}
                >
                    <MyForm
                        fieldArr={this.state.addFieldArr}
                        handleSubmit={this.handleCompany}
                        type="submit"
                        ref='companySettingForm'>
                    </MyForm>
                </MyModal>


            </div>
        )
    }

}