import React,{ Component } from 'react';
import { Row,Col,message } from 'antd';
import MyModal from './../../Components/MyModal';
import MyForm from './../../Components/MyForm';
import { MyAjax } from './../../utils';

export default class OvertimeAndCardSetting extends Component{
    constructor(props){
        super(props);
        this.state = {
            addFieldArr: [],
            workDeptOptions:[],
        }
    }

    componentDidMount(){
        //获取研发部门的数据
        MyAjax("POST","/selWorkdept",{},(data)=>{
            if(data.result != '{}' || data.result.length !== 0 ){
                let wholeData = data.result;
                for(let i in wholeData){
                  wholeData[i].value = wholeData[i].workId + '';
                  wholeData[i].label = wholeData[i].workDept;
                }
                this.setState({
                    workDeptOptions:wholeData
                })
            }
        })
    }

    openModal = (type) => {
        this.refs[type].showModal();
        if(type == "overtimeSetting"){
            this.setState({
                addFieldArr:[
                    {
                        label: '加班日期',
                        field: 'dateClock',
                        type: 'datePicker',
                    }, {
                        label: '部门',
                        field: 'workId',
                        type: 'select',
                        imode: 'multiple',
                        options:this.state.workDeptOptions
                    }, {
                        label: '加班时长',
                        field: 'overtimeCompany',
                    },{
                        label:'是否加班',
                        field:'isOvertime',
                        type:'radio',
                        options:[{label:'确认加班',value:'1'},{label:'取消加班',value:'0'}],
                        defaultValue:"1"
                    }
                ]
            })
        }else if(type == 'cardSetting'){
            this.setState({
                addFieldArr:[
                    {
                        label: '员工工号',
                        field: 'staffId',
                    }, {
                        label: '部门',
                        field: 'workId',
                        type: 'select',
                        imode: 'multiple',
                        options:this.state.workDeptOptions
                    }, {
                        label: '打卡日期',
                        field: 'dateClock',
                        type: 'datePicker',
                    }, {
                        label: '上班打卡时间',
                        type:'timePicker',
                        field: 'starttime',
                    },{
                        label: '下班打卡时间',
                        type:'timePicker',
                        field: 'endtime',
                    },{
                        label: '加班时长',
                        field: 'overtimeCompany',
                    },{
                        label:'是否加班',
                        field:'isOvertime',
                        type:'radio',
                        options:[{label:'确认加班',value:'1'},{label:'取消加班',value:'0'}],
                        defaultValue:'0'
                    }
                ]
            })
        }
    }

    //提交加班设置
    handleOvertime = (finishCB) =>{

        return params => {
            MyAjax("POST","/updateStaffAttOvertimeSetting",params,(data)=>{
                if(data.result =='success'){
                    this.refs.overtimeSetting.hideModal();
                    message.success("加班设置成功");
                    
                }else{
                    message.error("服务器繁忙");

                }
                finishCB();
            })   
          
        }
       
    }
     //提交补卡设置
     handleCard = (finishCB) =>{

        return params => {
            params.startPersonTime = params.dateClock+" "+params.starttime._i;
            params.endPersonTime = params.dateClock+" "+params.endtime._i;
            delete params.starttime;
            delete params.endtime;
            console.log(params)
            MyAjax("POST","/updateStaffAttCardSetting",params,(data)=>{
                if(data.result =='success'){
                    this.refs.cardSetting.hideModal();
                    message.success("补卡成功");
                    
                }else{
                    message.error("服务器繁忙");

                }
                finishCB();
            })

            
          
        }
       
    }

    //清空表单数据
    resetStateField = () =>{
        this.setState({
            addFieldArr:[]
        })
    }

    render(){
        return(
            <div>
                <Row>
                    <Col 
                        xs = {3}
                        onClick = {()=>this.openModal("overtimeSetting")}
                        style={{paddingTop:50,paddingBottom:50,background:'#4169E1',textAlign:'center',borderRadius:'10%'}}
                    >
                    加班设置
                    </Col>
                    <Col 
                        xs = {3}
                        onClick = {()=>this.openModal("cardSetting")}
                        style={{paddingTop:50,paddingBottom:50,background:'#6495ED',textAlign:'center',borderRadius:'10%'}}
                    >
                    补卡处理
                    </Col>
                </Row>
             
                <MyModal 
                    ref="overtimeSetting"
                    title="加班设置"
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
                    title="补卡设置"
                    hiddenCB={this.resetStateField}
                >
                    <MyForm 
                        fieldArr={this.state.addFieldArr} 
                        handleSubmit={this.handleCard} 
                        type="submit" 
                        ref='cardSettingForm'>
                    </MyForm>
                </MyModal>

                
            </div>
        )
    }
    
}