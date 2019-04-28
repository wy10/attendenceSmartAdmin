import React,{ Component } from 'react';
import Left from './Left';
import Right from './Right';
import { Layout } from 'antd';

export default class BgRoute extends Component{
    
    constructor(props){
        super(props);
    }

    render(){
        const { children } = this.props;

        return(
            <Layout style={{ height: '100vh',background:'#F5F5F5' }}>
                <Left></Left>
                <Right children={children} />
            </Layout>
        )
    }
}