import React, { Component } from 'react';
import { Form, Input, Select, DatePicker, Button, Checkbox, Row } from 'antd';

const FormItem = Form.Item;
class MyForm extends Component {
    constructor(props) {
        super(props)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                this.props.handleSubmit(values);
            }
        })
    }

    render() {
        const {fieldArr,form} = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        } 
        return (
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
                {
                    fieldArr.map(item => {

                        switch (item.type) {
                            case '0':
                                return "123";
                            default:
                                return (
                                    <FormItem {...formItemLayout} label={item.label} key={item.field} style={{ marginBottom: 20 }}>
                                        {getFieldDecorator(item.field, {
                                            rules: [
                                                { required: !item.notNeed, message: `${item.label}不能为空` },
                                                { validator: item.validator, },
                                                { max: item.max, message: `最多输入${item.max}个字符` }
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
                <Button type="primary" onClick={this.handleSubmit}>提交</Button>
            </Form>
        )
    }
}

const MyFormWrap = Form.create()(MyForm);

export default MyFormWrap;