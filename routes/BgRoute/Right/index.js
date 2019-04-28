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
                <div style={{padding:20,background:'#fff',marginBottom:8}}>
                    123
                </div>
                <div style={{paddingLeft:10}}>
                    {this.props.children}
                </div>
            </Content>
        )
    }
}