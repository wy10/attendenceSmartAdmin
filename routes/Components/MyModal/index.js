import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        if(this.props.hiddenCB){
            this.props.hiddenCB();
        }
        this.setState({
            visiable:false,
        })
    }

    render(){
        return(
            <Modal
                width={this.props.width||430}
                title={this.props.title}
                visible={this.state.visiable}
                onCancel={this.hideModal}
                footer = {null}
            >
                {this.props.children}
            </Modal>
        )
    }
}

MyModal.propTypes = {
    title:PropTypes.string.isRequired,
    width:PropTypes.number,
    hiddenCB: PropTypes.func
  }
  
