// (function() {
const obj_now = new Date();
const disableList = ['2021-01-29', '2021-01-30', '2021-02-15'];
const enableBtn = (btn) => {
  btn.removeAttr('disabled');
  btn.removeClass('disable');
};
const disableBtn = (btn) => {
  btn.attr('disabled', '');
  btn.addClass('disable');
};
$.ajax({
  type: 'GET',
  url: './json/districts.json',
  dataType: 'json',
  success: (data) => {
    const $countyList = $('#county-list');
    const $districtList = $('#district-list');
    data.forEach((item) => {
      let option = document.createElement('option');
      option.text = item.name;
      $countyList[0].add(option);
    });
    $countyList.on('change', function() {
      let districtList = $districtList[0];
      let prompt = districtList.firstElementChild;
      $districtList.empty();
      $districtList.append(prompt);
      data[this.selectedIndex - 1].districts.forEach((item) => {
        let option = document.createElement('option');
        option.text = item.name;
        districtList.add(option);
      });
    });
  }
});
// pick time
const $row_date = $('#row_date');
const $row_time = $('#row_time');
const makeMonth = (obj_startDate, count) => {
  $row_date.empty();
  const startY = obj_startDate.getFullYear();
  const startM = obj_startDate.getMonth();
  const startD = obj_startDate.getDate();
  $('.pick-time .year').text(`${startY}`);
  $('.pick-time .month').text(`${startM + 1}`);
  // 開始空格
  for (let i = 0; i < obj_startDate.getDay(); i++) {
    $row_date.append(`<div class="date"></div>`);
  }
  for (let i = 0; i < count; i++) {
    const d = new Date(
      obj_now.getFullYear(), startM, startD + i
    );
    const $ele_date = $(`
        <div class="date">
          <div class="text">${d.getMonth() + 1}/${d.getDate()}</div>
        </div>
      `);
    $ele_date[0].obj_date = d;
    $ele_date.on('click', function() {
      if ($row_date.focusDate)
        $row_date.focusDate.removeClass('selected');
      $(this).addClass('selected');
      $row_date.focusDate = $(this);
    });
    // 恢復高亮上次選取
    if ($row_date.focusDate) {
      if ($row_date.focusDate[0].obj_date.getTime() == d.getTime()) {
        $ele_date.addClass('selected');
        $row_date.focusDate = $ele_date;
      }
    }
    $row_date.append($ele_date);
  }
  // 結束空格
  // const start = $row_date[0].childElementCount + 1;
  // for (let i = start; i <= 42; i++) {
  //   $row_date.append(`<div class="date"></div>`);
  // }
};
const $btn_lastM = $('#last-month');
const $btn_nextM = $('#next-month');
$btn_lastM.on('click', function() {
  disableBtn($(this));
  enableBtn($btn_nextM);
  makeMonth(obj_tomorrow, generateCount);
});
$btn_nextM.on('click', function() {
  disableBtn($(this));
  enableBtn($btn_lastM);
  const thisY = obj_now.getFullYear();
  const nextM = obj_now.getMonth() + 1;
  const obj_nextM = new Date(
    thisY, nextM, 1
  );
  const obj_nextMonthEnd = (new Date(
    thisY, nextM + 1, 0
  )).getDate();
  makeMonth(obj_nextM, obj_nextMonthEnd);
});
const thisY = obj_now.getFullYear();
const thisM = obj_now.getMonth();
const thisD = obj_now.getDate();
const obj_tomorrow = new Date(
  thisY, thisM, thisD + 1
);
const obj_nextMonthEnd = new Date(
  thisY, thisM + 2, 0
);
let generateCount = ((obj_nextMonthEnd - obj_tomorrow) / 86400000) + 1;
generateCount = Math.min(generateCount, 31);
$row_time.children().on('click', function() {
  if ($row_time.focusTime)
    $row_time.focusTime.removeClass('selected');
  $(this).addClass('selected');
  $row_time.focusTime = $(this);
});
// 上下一步
const $lastStep = $("#last-step");
const $nextStep = $("#next-step");
const $stepList = $('.step');
const $barFront = $('.barGroup .barFront');
const $numList = $('.numGroup .num');
const $radioCredit = $('#credit');
const $checkRead = $('#read');
let state = 0; /* 0 ~ 3 */
const isComplete = function() {
  let ok = true;
  switch (state) {
    case 0:
      // return true;
      return $row_date.focusDate && $row_time.focusTime;
    case 1:
      // return true;
      $.each($('.fill-info .required'), (i, input) => {
        if (!input.value) {
          ok = false;
          return false;
        }
      });
      $.each($('.fill-info .select'), (i, select) => {
        if (select.selectedIndex == 0) {
          ok = false;
          return false;
        }
      });
      return ok;
    case 2:
      if (!$checkRead[0].checked) {
        console.log('notY');
        return false;
      }
      if ($radioCredit[0].checked) {
        $.each($('.pay .credit-method .required'), (i, input) => {
          if (!input.value) {
            ok = false;
            return false;
          }
        });
        $.each($('.pay .credit-method .select'), (i, select) => {
          if (select.selectedIndex == 0) {
            ok = false;
            return false;
          }
        });
      }
      return ok;
  }
  console.log('here');
  return false;
};
$lastStep.on('click', function() {
  // if (!isComplete()) {
  //   return;
  // }
  state--;
  if (state < 0) {
    state = 0;
    return;
  }
  $barFront.css('width', `${33.333 * state}%`);
  $numList[state + 1].classList.remove('on');
  $stepList[state + 1].classList.remove('on');
  $stepList[state].classList.add('on');
});
$nextStep.on('click', function() {
  if (!isComplete()) {
    return;
  }
  state++;
  if (state > 3) {
    state = 0;
    return;
  }
  $barFront.css('width', `${33.333 * state}%`);
  $numList[state].classList.add('on');
  $stepList[state - 1].classList.remove('on');
  $stepList[state].classList.add('on');
});


// fill-info
const $inputPhone = $('#input_phone');
$inputPhone.lastStr = '';
$inputPhone.on('input', function() {
  const num = $inputPhone.val();
  if (!isOnlyNum($inputPhone)) {
    return;
  }
  $inputPhone.lastStr = num;
});




// pay
const $creditMethod = $(document.querySelector('.credit-method'));
$('#credit, #atm').on('change', (e) => {
  if (e.target.getAttribute('data-i') == 0) {
    $creditMethod.slideDown(200);
  } else {
    $creditMethod.slideUp(200);
  }
});
const isOnlyNum = function($ele) {
  const num = $ele.val();
  const trimNum = num.replaceAll(' ', '');
  if (!trimNum.match(/(^\d+$|^$)/)) {
    $ele.val($ele.lastStr);
    return false;
  }
  return true;
};
const $inputCredit = $('#input_credit');
const $inputSecurity = $('#input_security');
$inputCredit.lastStr = '';
$inputCredit.realStr = '';
$inputSecurity.lastStr = '';
$inputCredit.on('input', (e) => {
  const num = $inputCredit.val();
  // let cursorIndex = $inputCredit[0].selectionStart;
  // console.log(cursorIndex);
  if (!isOnlyNum($inputCredit)) {
    return;
  }
  $inputCredit.realStr = num.replaceAll(' ', '');
  // format
  let output = '';
  for (let i = 0; i < $inputCredit.realStr.length; i++) {
    if (i % 4 == 0 && i != 0) {
      output += ' ';
    }
    output += $inputCredit.realStr[i];
  }
  $inputCredit.lastStr = output;
  $inputCredit.val(output);
  // if (cursorIndex % 5 == 0 && cursorIndex != 0) {
  //   cursorIndex++;
  // }
  // $inputCredit[0].setSelectionRange(cursorIndex, cursorIndex);
});
$inputSecurity.on('input', function() {
  const num = $inputSecurity.val();
  let cursorIndex = $inputCredit[0].selectionStart;
  if (!isOnlyNum($inputSecurity)) {
    return;
  }
  $inputSecurity.lastStr = num;
});
// invoice
const invoiceData = {
  invoiceI: 0,
  foundationI: 0
};
const $invoiceCheck = $('#invoice-check');
const $foundationCheck = $('#foundation-check');
const $caption = $('.form_invoice .caption');
const $component = $('#component > *');
const $donateSelect = $('.form_invoice #donate-select');
$('#invoice-select .option').on('click', (e) => {
  $invoiceCheck.click();
  invoiceData.invoiceI = e.target.getAttribute('data-index');
  // update內容
  let content;
  switch (invoiceData.invoiceI) {
    case '0':
      content = `<p>由uCleaner自動為您兌獎，中獎後將主動通知您並掛號寄出紙本發票</p>
        <p>提醒您，個人電子發票一旦開立，不得任意更改或改開三聯式發票(統編)</p>`;
      $component.removeClass('show');
      break;
    case '1':
      content = `
          <p>提醒您，捐贈發票後無法變更成開立或索取紙本發票</p>
        `;
      $donateSelect.addClass('show');
      break;
  }
  $caption.html(content);
});
$('#donate-select .option').on('click', (e) => {
  $foundationCheck.click();
  invoiceData.foundationI = e.target.getAttribute('data-index');
});
// 關閉各自的下拉選單
$('.my-dropdown .head-list').on('blur', (e) => {
  const $checkbox = $(e.target).children('[type=checkbox]')[0];
  if ($checkbox.checked) {
    $checkbox.click();
  }
});
// rule
// const $read = $('.rule #read');
// $read.on('change', function() {
//   if (this.checked) {
//     enableBtn($nextStep);
//   } else {
//     disableBtn($nextStep);
//   }
// });
// 初始化
// disableBtn($nextStep);
let year = obj_now.getFullYear().toString().substring(2);
const endYear = parseInt(year) + 25;
for (; year < endYear; year++) {
  $('#input_expireY').append(`<option>${year}</option>`);
}
$("[data-toggle=tooltip").tooltip();
makeMonth(obj_tomorrow, generateCount);
// })();