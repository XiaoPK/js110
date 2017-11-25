// 请把与index.html页面相关的javascript代码写在这里
// 同时删除该注释
let {bestCharge} = require("../src/best-charge");
let inputs =

function calculatePrice(inputs) {
  let str="";
  str += bestCharge(inputs);
  document.write(str);
}

function clear() {
  // 清除用户的选择，以及页面显示的信息
  // 清除之后，用户可以继续正常使用各项功能
}
