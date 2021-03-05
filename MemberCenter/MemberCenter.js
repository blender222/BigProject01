//改變顯示button
$('#btn-change-info').on('click', () => {
  $('#member-info .btn-box .button').toggleClass('db');
  const $value = $('#member-info .value');
  $.each($value, (index, ele) => {
    const temp = ele.textContent.trim();
    $(ele).replaceWith(`<input class="value" type="text" value="${temp}">`);
  });
});
$('#btn-change-cancel').on('click', () => {
  $('#member-info .btn-box .button').toggleClass('db');
  const $value = $('#member-info .value');
  $.each($value, (index, ele) => {
    const temp = ele.value.trim();
    $(ele).replaceWith(`<div class="value">${temp}</div>`);
  });
});
$('#order-sort .nav-link').on('click', () => {
  $('.block#order .layer').fadeOut(50);
});
// comment
// od
const layerDetail = document.querySelector('.layer.detail');
$('.button.detail').on('click', () => {
  $(layerDetail).fadeIn(100);
});
$('.btn_back').on('click', (e) => {
  $(e.target.closest('.layer')).fadeOut(100);
});
// star
const starBox = document.querySelector('#modal-comment .star-box');
const starGroup = starBox.querySelectorAll('.star');
starGroup.clear = function() {
  this.forEach((ele) => {
    ele.classList.remove('active');
  });
};
starGroup.forEach((ele, index) => {
  ele.rank = index;
  ele.addEventListener('mouseenter', function() {
    starGroup.clear();
    for (let i = 0; i <= index; i++) {
      starGroup[i].classList.add('active');
    }
  });
  ele.addEventListener('mouseleave', function() {
    starGroup.clear();
    for (let i = 0; i <= starBox.clickRank; i++) {
      starGroup[i].classList.add('active');
    }
  });
  ele.addEventListener('click', function() {
    starBox.clickRank = this.rank;
  });
});
$('#modal-comment').on('show.bs.modal', function() {
  starGroup.clear();
});
// 手機版 點擊後關閉sidemenu
$('.side-menu .nav-link').on('click', () => {
  $('#side-menu-check').prop('checked', false);
});
// favorite
const RoomTypes = ['廚房', '客廳', '臥室', '浴廁', '陽台'];
const SquareFeets = ['5坪以下', '6-10坪', '11-15坪', '16坪以上'];

const dataFavorite = {
  isPackage: false,
  ProductName: '小資消費輕鬆省',
  // packageList: [],
  packageList: [{
    RoomType: [RoomTypes[2], RoomTypes[3]],
    SquareFeet: [SquareFeets[0], SquareFeets[0]],
    ServiceItems: '清潔 + 收納',
    Hour: 1.5,
    Price: 100,
  }],
  UserDefinedList: [],
  // UserDefinedList: [{
  //     RoomType: RoomTypes[4],
  //     SquareFeet: SquareFeets[0],
  //     ServiceItems: '清潔',
  //     Hour: 0.5,
  //   },
  //   {
  //     RoomType: RoomTypes[1],
  //     SquareFeet: SquareFeets[1],
  //     ServiceItems: '清潔',
  //     Hour: 1.5,
  //   },
  //   {
  //     RoomType: RoomTypes[3],
  //     SquareFeet: SquareFeets[1],
  //     ServiceItems: '清潔',
  //     Hour: 1,
  //   },
  //   {
  //     RoomType: RoomTypes[0],
  //     SquareFeet: SquareFeets[0],
  //     ServiceItems: '清潔 + 除蟲',
  //     Hour: 1,
  //   },
  //   {
  //     RoomType: RoomTypes[2],
  //     SquareFeet: SquareFeets[1],
  //     ServiceItems: '清潔 + 收納',
  //     Hour: 1.5,
  //   },
  //   {
  //     RoomType: RoomTypes[2],
  //     SquareFeet: SquareFeets[0],
  //     ServiceItems: '清潔 + 收納',
  //     Hour: 1,
  //   },
  // ],
};

// const  = new Vue({
//   el: '#',
//   data: dataFavorite,
// });
const modalFavorite = new Vue({
  el: '#modal-favorite',
  data: dataFavorite,
});