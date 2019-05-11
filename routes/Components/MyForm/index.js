import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, Input, Select, DatePicker, Button,Checkbox, Row,Radio,TimePicker } from 'antd';
import { PureNumber, priceVerify, notZeroInt } from './../../utils/vertify';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const MonthPicker = DatePicker.MonthPicker;
const { TextArea } = Input;

class MyForm extends React.Component{

  state = {
    btnLoading: false
  }

  handleSubmit = (e) => {

    e.preventDefault();

    this.props.form.validateFields((err, values) => {

      if(!err){

        if(this.props.layout !== 'inline'){
          this.toggleStatus();
        }

        this.props.fieldArr.forEach(item => {

          //格式化moment对象
          if(item.type === 'rangePicker'){

            let tempRange = [];

            if(values[item.field] && values[item.field].length > 0){

              tempRange = [ values[item.field][0].format('YYYY-MM-DD'), values[item.field][1].format('YYYY-MM-DD') ]

            }

            values[item.field] = tempRange;

          }

          //格式化moment对象
          if(item.type === 'datePicker'){
            values[item.field] = values[item.field] ? values[item.field].format('YYYY-MM-DD') : undefined;
          }

          //格式化moment对象
          if(item.type === 'monthPicker'){
            values[item.field] = values[item.field] ? values[item.field].format('YYYY-MM') : undefined;
          }

          if(item.type == 'timePicker'){
            values[item.field] = values[item.field]?values[item.field].format('HH:mm:ss'):undefined;
          }

        })

        this.props.handleSubmit(this.toggleStatus)(values);

      }

    })

  }

  toggleStatus = () => {
    this.setState({
      btnLoading: !this.state.btnLoading
    })
  }

  clearInput = () => {
    if(this.props.resetForm){
      this.props.resetForm();
    }
    this.props.form.resetFields();
  }

  render(){

    const { form, fieldArr, layout, itemLayOut } = this.props;

    const { getFieldDecorator } = form;

    const formItemLayout = itemLayOut ? {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 14 },
        },
      } : null;

    const btnsStyle =  this.props.layout === 'inline' ? { marginBottom:10 } : itemLayOut ? { marginTop:10, textAlign:'center'} : { marginTop:10, textAlign:'right' };

    // fieldArr.map((item)=> {

    //   if (item.type === 'select' && item.mode !== 'multiple' && !item.notAll) {
    //     item.options = [
    //       {
    //         label: <span style={{color:"#949494"}}>全部</span>,
    //         value: ""
    //       },
    //       ...item.options];
    //   }
    // });

    return(

      <Form layout={layout || 'horizontal'} onSubmit={this.handleSubmit}>

        {
          fieldArr.map((item)=>{

            switch (item.type){

              case 'select':

                return(
                  <FormItem {...formItemLayout} label={item.label} key={item.field} style={{ marginBottom: 10 }}>
                    {getFieldDecorator(item.field, {
                      rules: [
                        { required: !item.notNeed, message: `${item.label}不能为空` },
                      ],
                      initialValue: item.defaultValue
                    })(
                      <Select placeholder={`请选择${item.label}`} mode={item.mode} disabled={item.isDisable || false} onChange={item.onChange || function () {} } style={{minWidth: 150}}>
                        {
                          item.options.map(item=>(
                            <Option key={item.value} value={item.value}>{item.label}</Option>
                          ))
                        }
                      </Select>
                    )}
                  </FormItem>
                )

              case 'rangePicker':

                return(
                  <FormItem {...formItemLayout} label={item.label} key={item.field} style={{ marginBottom: 10 }}>
                    {getFieldDecorator(item.field, {
                      rules: [{ required: !item.notNeed, message: `${item.label}不能为空` }],
                      initialValue: item.defaultValue
                    })(
                      <RangePicker/>
                    )}
                  </FormItem>
                )

                case 'timePicker':

                return(
                  <FormItem {...formItemLayout} label={item.label} key={item.field} style={{ marginBottom: 10 }}>
                    {getFieldDecorator(item.field, {
                      rules: [{ required: !item.notNeed, message: `${item.label}不能为空` }],
                      initialValue: item.defaultValue
                    })(
                      <TimePicker/>
                    )}
                  </FormItem>
                )

              case 'monthPicker':

                return(
                  <FormItem {...formItemLayout} label={item.label} key={item.field} style={{ marginBottom: 10 }}>
                    {getFieldDecorator(item.field, {
                      rules: [{ required: !item.notNeed, message: `${item.label}不能为空` }],
                      initialValue: item.defaultValue
                    })(
                      <MonthPicker/>
                    )}
                  </FormItem>
                )

              case 'datePicker':

                // noBefore 不能选择今天及以前的时间 canChooseTime 禁止选用展期之前的时间

                return(
                  <FormItem {...formItemLayout} label={item.label} key={item.field} style={{ marginBottom: 10 }}>
                    {getFieldDecorator(item.field, {
                      rules: [{ required: !item.notNeed, message: `${item.label}不能为空` }],
                      initialValue: item.defaultValue
                    })(
                      // <DatePicker disabledDate={(current)=>{ return item.noBefore ? current && current._d.getTime() < Date.now() : '' } }/>
                      <DatePicker 
                        disabledDate={(current)=>{ 
                          if(item.noBefore){
                           
                            return  current && current._d.getTime() < Date.now();
                          }
                          if(item.canChooseTime){
                            let timestamp = Date.parse(new Date(item.canChooseTime));
                            let newtimestamp = timestamp /1000+86400;
                            return current && current._d.getTime() < newtimestamp*1000;
                        
                          }
                          
                        } }/>
                    )}
                  </FormItem>
                )

              case 'msgCode':

                return (
                  <FormItem label={item.label} key={item.field} style={{ marginBottom: 10 }}>
                    {getFieldDecorator(item.field, {
                      rules: [
                        { required: !item.notNeed, message: `${item.label}不能为空` },
                        { max:4, message:`最多输入4个字符` },
                      
                      ]
                    })(
                      <div>
                        <Input
                          style={{width:'110px',height:'32px',verticalAlign: 'top'}}
                          placeholder={`请输入${item.label}`}
                          type={'text'}
                         
                        />
                        <img
                          src={item.msgCode}
                          onClick={item.resetCodeImg || function(){}}
                          style={{marginLeft:'10px',display: 'inline-block',width: '80px',height: '32px',verticalAlign: 'top',cursor:'pointer'}}/>
                      </div>
                    )}
                  </FormItem>
                )

              case 'textArea':

                return(
                  <FormItem {...formItemLayout} label={item.label} key={item.field} style={{ marginBottom: 10 }}>
                    {getFieldDecorator(item.field, {
                      rules: [
                        { required: !item.notNeed, message: `${item.label}不能为空` },
                        { validator: item.validator, },
                        { max:item.max, message:`最多输入${item.max}个字符` }
                      ],
                      initialValue: item.defaultValue
                    })(
                      <TextArea
                        rows={item.rows}
                        placeholder={`请输入${item.label}`}
                      />
                    )}
                  </FormItem>
                );
              
              case 'checkbox':
                return (
                  <FormItem {...formItemLayout} label={item.label} key={item.field} style={{ marginBottom: 10 }}>
                    {getFieldDecorator(item.field, {
                      rules: [
                        { required: !item.notNeed, message: `必须要验证项` },
                        { validator: item.validator || defaultValidator }
                      ],
                      initialValue: item.defaultValue
                    })(
                      <Checkbox.Group options={item.options} />
                    )}
                  </FormItem>
                )

                case 'radio':

                const defaultValidator = (rule,value,callback)=>{
                  callback();
                }

                return (
                  <FormItem {...formItemLayout} label={item.label} key={item.field} style={{ marginBottom: 10 }}>
                    {getFieldDecorator(item.field, {
                      rules: [
                        { required: !item.notNeed, message: `必须要验证项` },
                        { validator: item.validator || defaultValidator }
                      ],
                      initialValue: item.defaultValue
                    })(
                      <Radio.Group options={item.options} />
                    )}
                  </FormItem>
                )
                
              default :

                // notNeed, max：最大长度, validator, type, isDisable, verifyType=>校验类型

                let vtype = item.verifyType, validator = null;
                if(vtype === 'decimal'){
                  validator = (rule, value, callback) => {
                    if(!priceVerify(value) && value && value.length !==0 && value.length <= item.max){
                      callback('请输入大于0且最多两位小数的数字');
                    }else{
                        callback();
                    }
                  }
                }else if(vtype === 'int'){
                  validator = (rule, value, callback) => {
                    if(!PureNumber(value) && value && value.length !== 0 && value.length <= item.max){
                      callback('请输入大于等于0的整数');
                    }else{
                        callback();
                    }
                  }
                }else if(vtype === 'notZeroInt'){
                  validator = (rule, value, callback) => {
                    if(!notZeroInt(value) && value && value.length !== 0 && value.length <= item.max){
                      callback('请输入大于0的整数');
                    }else{
                        callback();
                    }
                  }
                }else{
                  validator = item.validator;
                }

                return(
                  <FormItem {...formItemLayout} label={item.label} key={item.field} style={{ marginBottom: 10 }}>
                    {getFieldDecorator(item.field, {
                      rules: [
                        { required: !item.notNeed, message: `${item.label}不能为空` },
                        { validator: validator, },
                        { max:item.max, message:`最多输入${item.max}个字符` }
                      ],
                      initialValue: item.defaultValue
                    })(
                      <Input
                        placeholder={`请输入${item.label}`}
                        type={item.type || 'text'}
                        onBlur={item.onBlur}
                        disabled={item.isDisable}
                      />
                    )}
                  </FormItem>
                )

            }

          })
        }

        <Row style={btnsStyle}>
            <Button type="primary" onClick={this.handleSubmit} loading={this.state.btnLoading} >
              { this.props.type === 'nextStep' ? '下一步' :

                 this.props.type === 'submit' ? '确认' : '搜索'

              }
            </Button>

            <Button style={{ marginLeft: 15 }} onClick={this.clearInput}>重置</Button>
        </Row>

      </Form>

    )

  }

}

const MyFormWrap = Form.create()(MyForm);

MyFormWrap.propTypes = {
  resetForm:PropTypes.func, // 重置表单的业务层面附加操作
  itemLayOut:PropTypes.bool,// label和input同一行
  type:PropTypes.string,    // btn按钮 submit:确认 默认:搜索
  layout:PropTypes.string,  //默认 horizontal ，可接受 inline(行内)
  handleSubmit: PropTypes.func.isRequired,
  fieldArr:PropTypes.array.isRequired
}

export default MyFormWrap;
