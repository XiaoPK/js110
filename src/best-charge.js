
let {loadAllItems} = require("./items");
let {loadPromotions} = require("./promotions");
let items = loadAllItems();
let promotions = loadPromotions();
let onSale = [];
module.exports = function bestCharge(selectedItems) {
  let inputs = calculateGoods(selectedItems,items);
  let str = "============= 订餐明细 =============\n";
  let countAll = 0, countSmall = 0;
  for(let i in items){
    if(inputs[items[i].id]){
      countSmall = items[i].price * inputs[items[i].id];
      str += items[i].name +" x "+inputs[items[i].id] +" = "+countSmall+"元\n";
      countAll += countSmall;
    }
  }
  str += "-----------------------------------\n";
  let countFirst = countAll, countSecond = countAll;
  if(countAll >= 30){
    countFirst = promotionType1(countAll);
  }
  for(let i in promotions[1].items){
    if(inputs[promotions[1].items[i]]){
      countSecond = promotionType2(inputs,countAll);
    }
  }

  if(countFirst <= countSecond && countFirst < countAll){
    str += "使用优惠:\n"+promotions[0].type+"，省"+(countAll-countFirst)+"元\n";
    str += "-----------------------------------\n"+"总计："+countFirst+"元";
  }else{
    if(countAll===countSecond && countAll === countFirst){
      str += "总计："+countAll+"元";
    }else{
      str += "使用优惠:\n" + promotions[1].type +"("+ onSale[0];
      for(let i = 1;i<onSale.length; i++){
        str +="，"+onSale[i];
      }
      str += ")，省"+(countAll-countSecond)+"元\n";
      str += "-----------------------------------\n"+"总计："+countSecond+"元"
    }
  }
  str += "\n===================================";
  //console.log(str);
  return str;
}


function calculateGoods(selectedItems,items) {
  let result = [];
//统计购买的东西
  for(let i = 0; i<selectedItems.length; i++){
    for(let j in items){
      if(items[j].id === selectedItems[i].substring(0,8)){
        if(!result[selectedItems[i]]){
          if(items[j].id===selectedItems[i]) {
            result[selectedItems[i]] = 1;
          }else {
            result[selectedItems[i].substring(0,8)] = parseInt(selectedItems[i].substring(11,12));
          }
        }else{
          result[selectedItems[i]]++;
        }
      }
    }
  }
  return result;
}


function promotionType1(countAll) {
  return countAll-6;
}

function promotionType2(inputs,countAll) {
  let result= countAll;
  for(let i in promotions){
    if(inputs[promotions[1].items[i]]){
      for(let j in items){
        if(items[j].id === promotions[1].items[i]){
          result -= inputs[promotions[1].items[i]]*items[j].price*0.5;
          if(!onSale.includes(items[j].name)){
            onSale.push(items[j].name);
          }
        }
      }
    }
  }
  return result;
}

