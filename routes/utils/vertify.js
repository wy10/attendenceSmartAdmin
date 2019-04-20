export const nameVerify = (value) => {
    let reg=/^([\u4e00-\u9fa5·]){2,10}$/;//只能是中文和·，长度为2-10位
    return reg.test(value);
}

export const certNoVerify = (value) => {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(value);
}

export const mobileVerify = (value) => {
    let reg = /(^\d{11}$)/;  //手机号码验证 11位数字
    return reg.test(value);
}

export const wxNameVerify = (value) => {
    let reg = /^([a-zA-Z])([-_a-zA-Z0-9]{5,19})$/;//6-20个字母、数字、下划线和减号,必须以字母开头
    return reg.test(value);
}

export const qqVerify = (value) => {
    let reg = /(^([1-9])([0-9]{4,11})$)/;  //第一位1-9之间的数字，其余的0-9之间的数字，总长度5-12个之间
    return reg.test(value);
}

export const emailVerify = (value) => {
    let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;  //邮箱 \w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*
    return reg.test(value);
}

export const imgCodeVerify = (value) => {
    let reg = /^[0-9a-zA-Z]{4}$/;  //图形验证码 只能为4位字母或数字
    return reg.test(value);
}

export const JDVerify = (value) => {
    let reg = /^[\u4e00-\u9fa5\w-]{4,20}$/;//京东账号 中文、字母、数字、-、_，4-20位组合
    return reg.test(value);
}

export const chineseVerify = (value) => {
    let reg = /[\u4e00-\u9fa5]+/;//校验是否含有中文
    return reg.test(value);
}

export const servicePWD = (value) => {
  let reg = /\d+/; //服务密码  6或8位数字
  return reg.test(value) && ( value.length === 6 || value.length === 8 );
}

export const numVerify = (value) => {
  let reg = /^\d{6}$/; // 纯数字的校验
  return reg.test(value);
}

export const PureNumber = (value) => {
    let reg = /^\d+$/; // 纯数字的校验
    return reg.test(value);
}

export const numberSixLength = (value) => {
    let reg = /^\d{1,6}$/; // 纯数字的校验
    return reg.test(value);
}

export const notZeroInt = (value) => {
    let reg = /^[0-9]*[1-9][0-9]*$/; // 非零整数的校验
    return reg.test(value);
}

export const priceVerify = (value) => {
    let reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/; // 大于0且最多两位小数的价格的校验
    return reg.test(value);
}

export const specialCharacters = (value) => {
    let reg = new RegExp("[ `~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"); //校验是否含有特殊字符和空格
    return reg.test(value);
  }