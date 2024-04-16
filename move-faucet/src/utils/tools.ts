import { copyText } from "vue3-clipboard";
import { MessageType } from "./type";
import message, { ConfigOnClose } from "ant-design-vue/es/message";

// trace function to log the arguments passed to it
export function trace(...args: any[]) {
  console.log(...args);
}

// copy function to copy the text passed to it
export function copy(text: string, callback: Function) {
  copyText(text, undefined, (error: any) => {
    if (error) {
      if (callback) {
        callback({
          code: 0,
          message: "error",
          data: error.toString(),
        });
      }
    } else {
      if (callback) {
        callback({
          code: 1,
          message: "success",
          data: text,
        });
      }
    }
  });
}

// showToast function to show a toast with the given content, type, duration and callback
export function showToast(
  content: string,
  type: MessageType = MessageType.success,
  duration: number = 4.5,
  callback: ConfigOnClose = () => {}
) {
  message[type](content, duration, callback);
}


// Export a function called isNull that takes in a parameter called val
export function isNull(val:any) {
  // If the type of val is a boolean, return false
  if (typeof val === 'boolean') {
      return false;
  }
  // If the type of val is a number, return false
  if (typeof val === 'number') {
      return false;
  }
  // If val is an array, check if the length is 0 and return true if it is
  if (val instanceof Array) {
      if (val.length === 0) return true;
  // If val is an object, check if the stringified version is '{}' and return true if it is
  } else if (val instanceof Object) {
      if (JSON.stringify(val) === '{}') return true;
  // Otherwise, check if val is 'null', null, 'undefined', undefined, '', or 'undefined' and return true if it is
  } else {
      if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true;
      return false;
  }
  // If none of the above conditions are met, return false
  return false;
}

// Export a function called numQ that takes in a number, a minimum length, a maximum length, and a center number
export function numQ(value:number, minLen:number=4, maxLen:number=6, cen:number=10):number {
  if (isNaN(value)) return 0;
  value = Number(value);
  if (Math.abs(value) < cen) {
      return toFixeds(value, minLen);
  } else {
      return toFixeds(value, maxLen);
  }
}

export function removeZERO(value:string|number):string {
  let str = String(value);
  let id = str.indexOf(".")
  if (id >= 0) {
      while (str.slice(-1) == "0") {
          str = str.slice(0, -1)
      }
      if (str.slice(-1) == ".") {
          str = str.slice(0, -1)
      }
  }
  return str;
}

export function toFixedStrs(value:number, len=2) {
  let str = Number(value).toFixed(len);
  return removeZERO(str)
}
export function toFixedChange(value:number, len=2):number {
  len = len || 4
  if (Number(value) > 1) {
      return toFixeds(value, len)
  } else if (Number(value) > 0.01) {
      return toFixeds(value, 4)
  } else if (Number(value) > 0.0001) {
      return toFixeds(value, 6)
  } else if (Number(value) > 0.000001) {
      return toFixeds(value, 8)
  } else if (Number(value) > 0.00000001) {
      return toFixeds(value, 10)
  } else if (Number(value) > 0.0000000001) {
      return toFixeds(value, 12)
  } else if (Number(value) > 0.000000000001) {
      return toFixeds(value, 14)
  } else if (Number(value) > 0.00000000000001) {
      return toFixeds(value, 16)
  }else{
    return value;
  }
}


/**
 * This function takes a value and a number of decimal places, and returns the value rounded to that number of decimal places.
 * If the number of decimal places is not provided or is less than 2, it defaults to 2.
 * If the absolute value of the input value is less than 10 to the power of negative the number of decimal places, the function returns 0.
 * 
 * @param {number|string} value - The value to be rounded. Can be a number or a string that can be converted to a number.
 * @param {number} num - The number of decimal places to round to. Defaults to 2 if not provided or if less than 2.
 * @returns {number} - The input value rounded to the specified number of decimal places.
 */
export function toFixeds(value:number|string, num:number=2) {
  if (!num || num < 2) num = 2;
  if (Math.abs(Number(value)) < Math.pow(10, -num)) return 0;
  let a = Math.floor(Number(value) * Math.pow(10, num));
  value = a * Math.pow(10, -num)
  return parseFloat(String(Number(value).toFixed(num)));
}

export function resetStringKMG(value:number|string):string {
  // trace("resetString=",value,value=="",value==0)
  if (value == "") return "0";
  if (value == 0) return "0.00";
  if (isNaN(Number(value))) return "0.00";
  let a:number|string = "";
  let b:number|string = ""
  if (Number(value) < 0) {
      value = Math.abs(Number(value));
      a = "-";
  }
  value = Number(value)
  if (value >= 1000 * 1000 * 1000) {
      b = toFixeds(value / (1000 * 1000 * 1000)) + "b"
  } else if (value >= 1000 * 1000) {
      b = toFixeds(value / (1000 * 1000)) + "m"
  } else if (value >= 1000) {
      b = toFixeds(value / (1000)) + "k"
  } else {
      b = toFixeds(value);
  }
  return a + b;
}
/**
 * 
 * @param value 
 * @returns b m k
 */
export function resetStringKMG2(value:number|string):string {
  if (value == "") return "0.00";
  if (value == 0) return "0.00";
  if (isNaN(Number(value))) return "0.00";
  let a = "";
  let b = ""
  if (Number(value) < 0) {
      value = Math.abs(Number(value));
      a = "-";
  }
  value = Math.abs(Number(value))

  if (value >= 1000 * 1000 * 1000) {
      b = (value / (1000 * 1000 * 1000)).toFixed(2) + "b"
  } else if (value >= 1000 * 1000) {
      b = (value / (1000 * 1000)).toFixed(2) + "m"
  } else if (value >= 1000) {
      b = (value / (1000)).toFixed(2) + "k"
  } else {
      b = (value).toFixed(2);
  }

  return a + b;
}

/**
 * sleep
 * @param time ms
 * @returns 
 */
export async function sleep(time:number=1000) {
  return new Promise(function (resolve, reject) {
      setTimeout(resolve, time);
  });
}

/**
 * toThousands
 * @param num 
 * @returns 
 */
export function toThousands(num:number):string {
  return num.toLocaleString();
}

/**
* Countdown
* @param lefttime ms
* @returns {string}   01:25:22
*/
export function getCountdown(lefttime:number,fstr:string=':') {
 
  // var leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)),  //Counting days
  var leftH:number|string = Math.floor(lefttime / (1000 * 60 * 60) % 24),  //Calculation hours
  leftM:number|string = Math.floor(lefttime / (1000 * 60) % 60), //Count minutes
  leftS:number|string = Math.floor(lefttime / 1000 % 60);  //Count seconds
  if(leftH.toString().length==1) leftH = '0'+leftH;
  if(leftM.toString().length==1) leftM = '0'+leftM;
  if(leftS.toString().length==1) leftS = '0'+leftS;
  return leftH + fstr + leftM + fstr + leftS;  
}


//This function takes in a string, a start length, an end length, and a replacement string and returns a new string with the start and end of the string replaced with the replacement string
export function replaceStr(str:string,startlen:number=4,endLen:number=4,replaceStr:string='...'):string {
 //Declare variables to store the start and end of the string
 const a = str.slice(0,startlen);
 const b = str.slice(str.length-endLen);
 //Return a new string with the start and end replaced with the replacement string
 return a + replaceStr + b;
}