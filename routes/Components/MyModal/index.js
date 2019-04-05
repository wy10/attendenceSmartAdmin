import React, { Component } from 'react';
import { Modal } from 'antd';

export default class MyModal extends Component{
    
    constructor(props){
        super(props);
        this.state={
            visiable:false,
        }
    }

    showModal=()=>{
        this.setState({
            visiable:true,
        })
    }

    hideModal = () =>{
        this.setState({
            visiable:false,
        })
    }

    render(){
        return(
            <Modal
                width={this.props.width||400}
                title={this.props.title}
                visible={this.state.visiable}
                onCancel={this.hideModal}
            >
                {this.props.children}
            </Modal>
        )
    }
}
