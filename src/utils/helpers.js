import React from "react";


const capetalizer = (text) => {
    const str = String(text).charAt(0).toUpperCase() + String(text).slice(1);
        return str
}


const textWrapper = (text) => {
var length = 160;
var trimmedString =  String(text).substring(0, length) + '...'
    return trimmedString
}

const setOption = (option, options) => {
  let res = options && options.find(a => a.type === option)?.value
  return res
    
}


export default {
   capetalizer,
   textWrapper,
   setOption
  };