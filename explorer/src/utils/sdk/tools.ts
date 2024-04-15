import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { BigNumber } from "bignumber.js";
dayjs.extend(advancedFormat);
BigNumber.config({ ROUNDING_MODE: 1 });
BigNumber.config({ EXPONENTIAL_AT: 1e9 });
//大数转常数
export function convertBigNumberToNormal(
  _number: string | BigNumber,
  decimals = 18,
  fix = 10
) {
  let number = _number;
  if (typeof _number !== "string") number = _number.toString();
  let result = new BigNumber(number).dividedBy(
    new BigNumber(Math.pow(10, decimals))
  );
  return result.toFixed(fix);
}
//常数转大数
export function convertNormalToBigNumber(
  number: string | number,
  decimals = 18,
  fix = 0
) {
  return new BigNumber(number)
    .multipliedBy(new BigNumber(Math.pow(10, decimals)))
    .minus(fix)
    .toFixed(0);
}
//百分数
export function calculatePercentage(numerator: string, denominator: string) {
  return new BigNumber(numerator)
    .dividedBy(new BigNumber(denominator))
    .toFixed();
}
//加 x+y
export function add(number1: string, number2: string, fix = 10) {
  return new BigNumber(number1).plus(new BigNumber(number2)).toFixed(fix);
}
//减 x-y
export function sub(number1: string, number2: string, fix = 10) {
  return new BigNumber(number1).minus(new BigNumber(number2)).toFixed(fix);
}
//乘 x*y
export function mul(number1: string, number2: string, fix = 10) {
  return new BigNumber(number1).times(new BigNumber(number2)).toFixed(fix);
}
//除  x/y
export function div(number1: string, number2: string, fix = 10) {
  return new BigNumber(number1).div(new BigNumber(number2)).toFixed(fix);
}
export function convertToPaddedUint8Array(str: string, length: number) {
  const value = Uint8Array.from(
    Buffer.from(str.replace(/^0x/i, "").padStart(length, "0"), "hex")
  );
  return Uint8Array.from([...new Uint8Array(length - value.length), ...value]);
}
//保留N位并除去末尾多余的0
export function toFixedCutZero(
  num: number | string,
  fix = 2,
  thousand = false
) {
  return toFormatNumber(num, fix, thousand, true);
}
//保留N位，截断不进位
export function toFixedNumber(num: number | string, fix = 2, thousand = false) {
  return toFormatNumber(num, fix, thousand, false);
}
var monthNames = new Array(12);
monthNames[0] = "January";
monthNames[1] = "February";
monthNames[2] = "March";
monthNames[3] = "April";
monthNames[4] = "May";
monthNames[5] = "June";
monthNames[6] = "July";
monthNames[7] = "August";
monthNames[8] = "September";
monthNames[9] = "October";
monthNames[10] = "November";
monthNames[11] = "December";
//月份的映射
export function toMonthName(monthNumber: number) {
  return monthNames[monthNumber];
}
function componentToHex(c: number) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
//rgb转#
export function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
// //当前页面的 URL 中查找该查询参数的值并返回.eg:***?id=123&name=hhh    gpu('id')=>123
// export function gup(name: string) {
//     name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
//     var regexS = "[\\?&]" + name + "=([^&#]*)";
//     var regex = new RegExp(regexS);
//     var results = regex.exec(window.location.href);
//     if (results == null)
//         return "";
//     else
//         return results[1];
// }
//将value转换到min到rangeSize的区间内
export function wrap(value: number, min: number, rangeSize: number) {
  rangeSize -= min;
  while (value < min) {
    value += rangeSize;
  }
  return value % rangeSize;
}
//将v从[i1,i2]的区间转换到[o1,o2]的区间
export function map(v: number, i1: number, i2: number, o1: number, o2: number) {
  return o1 + ((o2 - o1) * (v - i1)) / (i2 - i1);
}
//千分位
export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//放缩法四舍五入
export function roundNumber(num: number, dec: number) {
  var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
  return result;
}
//value是个字符串，ia是转换后的ASCII码值，off是起始偏移，size是运算多少位，返回的是ASCII码数值的和
export function dumpString(
  value: string,
  ia: number[],
  off: number,
  size: number
) {
  var i, x;
  var sum = 0;
  var len = Math.min(value.length, size);
  for (i = 0; i < len; i++) {
    x = value.charCodeAt(i);
    ia[off] = x;
    sum += x;
    off += 1;
  }
  return sum;
}
export const toHex = (num: Number | string) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};
//左边添加0
export function padLeft(value: string, size: number) {
  if (size < value.length) {
    printf("Incompatible size");
  }
  var l = size - value.length;
  for (var i = 0; i < l; i++) {
    value = "0" + value;
  }
  return value;
}
//转千分位
export function toThousands(num: number | string) {
  num = num + "";
  if (+num < 1000) return num;
  var reg = /\d{1,3}(?=(\d{3})+$)/g;
  if (num.includes(".")) {
    let [_integer, _decimal] = num.split(".");
    return _integer.replace(reg, "$&,") + "." + _decimal;
  } else {
    return num.replace(reg, "$&,");
  }
}
//处理数值格式
export function toFormatNumber(
  num: number | string,
  fix = 2,
  thousand = false,
  cutZero = false
) {
  let str = num + "";
  if (!/^(-)?[0-9.]+$/g.test(str)) return "0";
  if (!str.includes(".")) {
    str = str + ".";
  }
  str = str + "00000000";
  let index = str.indexOf(".");
  str = str.slice(0, index + fix + 1);
  if (cutZero) {
    while (str.includes(".") && (str.endsWith(".") || str.endsWith("0"))) {
      str = str.slice(0, -1);
    }
  }
  if (thousand) {
    str = toThousands(str);
  }
  return str;
}
//金额转M B单位显示
export function formatAmount(str: number | string, fix = 0) {
  let num = +str;
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(fix) + " B";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(fix) + " M";
  } else {
    return num.toFixed(fix);
  }
}
//去掉数值前面多余的0
export function toCutFrontZero(num: string) {
  let str = num + "";
  while (str.length > 1 && str.startsWith("0") && str[1] !== ".") {
    str = str.slice(1);
  }
  return str;
}
//获取截止时间
export function getDeadLine(delay: number) {
  return Math.floor(new Date().getTime() / 1000 + 60 * delay);
}
//异步延时
export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
//获取当前设备的类型 0：PC  1：Mobile
export function getDeviceType() {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return flag ? 1 : 0;
}
/**
 * 格式化时间
 * @param timestamp
 * @param formatStr "ddd, MMM D, YYYY, h:mm:ss A"|'YYYY/MM/DD HH:mm:ss'
 */
export function formatTime(timestamp: number, formatStr: string) {
  if (timestamp.toString().length === 10) {
    timestamp = timestamp * 1000;
  }
  return dayjs(timestamp).format(formatStr);
}
//打log-----------------------------------
let isPrintf = localStorage.getItem("printf");

export function printf(message?: string, ...optionalParams: any[]) {
  if (isPrintf) {
    console.log(
      `%cLog%c${formatTime(Date.now(), "HH:mm:ss")}%c${message}`,
      "display: inline-block;background-color:rgba(66,66,66,1);color:#fff;margin-bottom:6px;padding:4px;border-radius:4px 0 0 4px",
      "display: inline-block;background-color:rgba(0,180,0,1);color:#fff;padding:4px;border-radius:0 4px 4px 0",
      "font-size:16px;color:#fff;background:linear-gradient(to right,red,blue);margin-left: 15px;",
      ...optionalParams
    );
  }
}
/**
 * 封装请求
 * @param url 请求链接
 * @param query 请求body | 可空
 * @returns
 */
export async function request(url: string, query?: object) {
  try {
    const token = localStorage.getItem("token") ?? "";
    let requestOptions: RequestInit = {
      method: query ? "POST" : "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: query ? JSON.stringify(query) : undefined,
    };
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      return { message: "Network response was not ok" };
    }
    return response.json();
  } catch (error) {
    return { message: error };
  }
}
