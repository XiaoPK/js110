function loadAllItems() {
  return [{
    id: 'ITEM0001',
    name: '黄焖鸡',
    price: 18.00
  }, {
    id: 'ITEM0013',
    name: '肉夹馍',
    price: 6.00
  }, {
    id: 'ITEM0022',
    name: '凉皮',
    price: 8.00
  }, {
    id: 'ITEM0030',
    name: '冰锋',
    price: 2.00
  }];
}

function loadPromotions() {
  return [{
    type: '满30减6元'
  }, {
    type: '指定菜品半价',
    items: ['ITEM0001', 'ITEM0022']
  }];
}


selectedItems = ["ITEM0013 x 4"];



let items = loadAllItems();
let promotions = loadPromotions();

function moneyPay(selectedItems) {
  let inputs = calculateGoods(selectedItems,items);
  let str = "============= 订餐明细 =============\n";
  let countAll = 0, countSmall = 0;
  for(let i in items){
    if(inputs[items[i].id]){
      countSmall = items[i].price * inputs[items[i].id];
      str += items[i].name +" X "+inputs[items[i].id] +" = "+countSmall+"元\n";
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
      str += "使用优惠:\n" + promotions[1].type +"（黄们鸡，凉皮）"+
        "，省"+(countAll-countSecond)+"元\n";
      str += "-----------------------------------\n"+"总计："+countSecond+"元"
    }
  }
  str += "\n===================================";
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
  let result = countAll;
  for(let i in promotions){
    if(inputs[promotions[1].items[i]]){
      for(let j in items){
        if(items[j].id === promotions[1].items[i]){
          result -= inputs[promotions[1].items[i]]*items[j].price*0.5;
        }
      }
    }
  }
  return result;
}

console.log(moneyPay(selectedItems));
