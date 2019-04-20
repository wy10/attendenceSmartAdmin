import React, { Component } from 'react';
import { Layout } from 'antd';

const { Content } = Layout;
export default class Right extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Content>
                {this.props.children}
            </Content>
        )
    }
}