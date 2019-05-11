import $ from  'jquery';
import { Modal, message } from 'antd';
import { hashHistory } from 'react-router';

const confirm = Modal.confirm;
//ajax请求封装
export const URL = "http://localhost:8080";

export const MyAjax = (type,uri,params,callBack) => {
    let wholeUrl = URL+uri;
    $.ajax({
        type:type,
        url:wholeUrl,
        data:params,
        dataType:"json",
        headers: {
          "Authorization":window.localStorage.getItem("Authorization")
        },
        beforeSend: function (XMLHttpRequest) {
          XMLHttpRequest.setRequestHeader("Authorization",window.localStorage.getItem("Authorization"));
        },
        success:function(data){
            if(data.result == "login_error"){
              //接口的登录token过期
              hashHistory.push({
                pathname: "/login"
                
              });
            }else{
              callBack(data)
            }
        },
        error:function(data){
            callBack(data)
        }
    })
}

//时间格式化
export const dateFormat = (timeStamp, flag = '-') => {

    let myDate = new Date(timeStamp);
  
    let   year = myDate.getFullYear(),
          month = myDate.getMonth() + 1,
          day = myDate.getDate(),
          hour = myDate.getHours(),
          min = myDate.getMinutes()
  
    month = month.toString().length === 1 ? `0${month}` : month;
    day = day.toString().length === 1 ? `0${day}` : day;
    hour = hour.toString().length === 1 ? `0${hour}` : hour;
    min = min.toString().length === 1 ? `0${min}` : min;
  
    return flag === '-' ? `${year}-${month}-${day}` : `${year}年${month}月${day}日`
  
  }
  
  export const timeFormat = (timeStamp) => {
  
    let myDate = new Date(timeStamp);
  
    let year = myDate.getFullYear(),
        month = myDate.getMonth() + 1,
        day = myDate.getDate(),
        hour = myDate.getHours(),
        min = myDate.getMinutes(),
        sec = myDate.getSeconds()
  
    month = month.toString().length === 1 ? `0${month}` : month;
    day = day.toString().length === 1 ? `0${day}` : day;
    hour = hour.toString().length === 1 ? `0${hour}` : hour;
    min = min.toString().length === 1 ? `0${min}` : min;
    sec = sec.toString().length === 1 ? `0${sec}` : sec
  
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`
  
  }

  export const secondsFormat = (value) =>{
    var secondTime = parseInt(value);// 秒
    var minuteTime = 0;// 分
    var hourTime = 0;// 小时
    if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if(minuteTime > 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60);
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60);
        }
    }
    var result = "" + parseInt(secondTime) + "秒";

    if(minuteTime > 0) {
      result = "" + parseInt(minuteTime) + "分" + result;
    }
    if(hourTime > 0) {
      result = "" + parseInt(hourTime) + "小时" + result;
    }
    return result;
}


  export const showConfirm = (body) => {

    confirm({
      title: body.title || '提示',
      content: body.content,
      onOk() {
        MyAjax(body.type,body.url, body.params,(data)=>{
            if(data.result =='success'){
                body.success();
                
            }else{
                message.error("服务器繁忙");

            }
        })
      },
      onCancel: body.onCancel || (() => {}),
    });
  }

