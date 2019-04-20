import $ from  'jquery';

//ajax请求封装
export const URL = "http://localhost:8080";

export const MyAjax = (type,uri,params,callBack) => {
    let wholeUrl = URL+uri;
    $.ajax({
        type:type,
        url:wholeUrl,
        data:params,
        dataType:"json",
        success:function(data){
            callBack(data)
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

