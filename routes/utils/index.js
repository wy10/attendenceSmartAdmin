import { message } from "antd";

export const URL = "http://newsapi.gugujiankong.com";
export const MyFetch = (uri,params) => {
    let wholeUrl = URL+uri;
    console.log(wholeUrl)
    return fetch(wholeUrl,{
        method:'GET'
    }).then(res=>{
        return res.json();
    }).catch(err=>{
        message.error("服务器异常");
    })
}