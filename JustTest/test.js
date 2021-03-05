Date.prototype.toFormat = function() {
  let yyyy = this.getFullYear();
  let MM = this.getMonth() + 1;
  let dd = this.getDate();
  let HH = this.getHours();
  let mm = this.getMinutes();
  let ss = this.getSeconds();
  return `${yyyy}/${MM}/${dd} ${HH}:${mm}:${ss}`;
};

// document.querySelector('#runECPay').addEventListener('click', function() {
//   let merchantTradeNo = 'A0000000000000000001';
//   let allString = encodeURIComponent(
//     `HashKey=5294y06JbISpM5x9&ChoosePayment=Credit&EncryptType=1&ItemName=TestItemName&MerchantID=2000132&MerchantTradeDate=${new Date().toFormat()}&MerchantTradeNo=${merchantTradeNo}&PaymentType=aio&ReturnURL=/Checkout/MoneyTest&TotalAmount=1000&TradeDesc=${encodeURIComponent('testTradeDesc')}&HashIV=v77hoKGq4kWxNNIS`
//   ).toLowerCase();
//   // 6. 以 SHA256 加密方式來產生雜凑值
//   let hash = sha256(allString);
//   // 7. 再轉大寫產生 CheckMacValue
//   hash = hash.toUpperCase();
//   console.log(hash);

//   $.ajax({
//     method: 'POST',
//     url: 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5',
//     contentType: 'application/json',
//     data: JSON.stringify({
//       MerchantID: '2000132',
//       MerchantTradeNo: 'A0000000000000000001',
//       MerchantTradeDate: new Date().toFormat(),
//       PaymentType: 'aio',
//       TotalAmount: 1000,
//       TradeDesc: encodeURIComponent('testTradeDesc'),
//       ItemName: 'TestItemName',
//       ReturnURL: 'https://localhost:44308/Checkout/FromECPay',
//       ChoosePayment: 'ALL',
//       EncryptType: 1,
//       CheckMacValue: hash,
//     }),
//     success: function() {
//       console.log('yes');
//     },
//   });
// });