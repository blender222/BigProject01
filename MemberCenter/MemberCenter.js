//layer
const layerDetail = document.querySelector('.layer.detail');
let $lastTab = null;
$('#order-sort .nav-link').on('click', () => {
  $('.block#order .layer').removeClass('dfc');
});
$('.button.detail').on('click', () => {
  $lastTab = $('.block#order .tab-pane.show');
  $lastTab.removeClass('show');
  $(layerDetail).addClass('dfc');
});
$('.btn_back').on('click', () => {
  $lastTab.addClass('show');
  $(layerDetail).removeClass('dfc');
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
// member info
const memberInfo = {
  isInput: false,
  AccountName: 'blender222',
  Phone: '0975831568',
  Email: 'sean@gmail.com',
  Address: '台北市信義區101大樓台北市信義區101大樓',
  isPhoneOk: true,
  isEmailOk: true,
  isAddressOk: true,
  errorMsgPhone: '',
  errorMsgEmail: '',
  errorMsgAddress: '',
  oldPassword: '',
  newPassword: '',
  newPassword2: '',
  isOldPasswordOk: true,
  isNewPasswordOk: true,
  errorMsgOld: '',
  errorMsgNew: '',
};
const vueMemberInfo = new Vue({
  el: '.block#member-info',
  data: memberInfo,
  methods: {
    changeInfo: function() {
      this.isInput = true;
    },
    changeCancel: function() {
      this.isInput = false;
    },
    changeOk: function() {
      if (/^09\d{8}$/.test(memberInfo.Phone)) {
        memberInfo.errorMsgPhone = '請輸入正確手機號碼';
        memberInfo.isPhoneOk = false;
      }
      if (/^[\w\.\-]+\@[\w\.\-]+$/.test(memberInfo.Email)) {
        memberInfo.errorMsgEmail = '請輸入正確信箱';
        memberInfo.isEmailOk = false;
      }
      if (/^.+$/.test(memberInfo.Address)) {
        memberInfo.errorMsgAddress = '請輸入正確地址';
        memberInfo.isAddressOk = false;
      }
      if (memberInfo.isPhoneOk && memberInfo.isEmailOk && memberInfo.isAddressOk) {
        this.isInput = false;
      }
    },
    clearInput: function() {
      memberInfo.isOldPasswordOk = true;
      memberInfo.isNewPasswordOk = true;
      memberInfo.oldPassword = '';
      memberInfo.newPassword = '';
      memberInfo.newPassword2 = '';
    },
  }
});
const vueModelChangePW = new Vue({
  el: '#modal-changePassword',
  data: memberInfo,
  methods: {
    submitPassword: function() {
      memberInfo.isOldPasswordOk = true;
      memberInfo.isNewPasswordOk = true;
      
      if (memberInfo.newPassword != memberInfo.newPassword2) {
        memberInfo.errorMsgNew = '密碼不符';
        memberInfo.isNewPasswordOk = false;
      } else if (!/^[a-zA-Z\d]+$/.test(memberInfo.oldPassword)) {
        memberInfo.errorMsgOld = '請輸入原密碼';
        memberInfo.isOldPasswordOk = false;
      } else if (!/^[a-zA-Z\d]{6,15}$/.test(memberInfo.newPassword)) {
        memberInfo.errorMsgNew = '需6 ~ 15位';
        memberInfo.isNewPasswordOk = false;
      } else if (!/^[a-zA-Z\d]*[a-z][a-zA-Z\d]*$/.test(memberInfo.newPassword)) {
        memberInfo.errorMsgNew = '格式不正確';
        memberInfo.isNewPasswordOk = false;
      } else if (!/^[a-zA-Z\d]*[A-Z][a-zA-Z\d]*$/.test(memberInfo.newPassword)) {
        memberInfo.errorMsgNew = '格式不正確';
        memberInfo.isNewPasswordOk = false;
      } else {
        
        console.log('ok');
        // axios({
        //   method: 'post',
        //   url: '',
        //   data: {
        //     Password: memberInfo.Password,
        //     newPassword: memberInfo.newPassword,
        //   }
        // });
      }
    }
  }
});


$('#btn-change-ok').on('click', () => {

});
// order
const RoomTypes = ['廚房', '客廳', '臥室', '浴廁', '陽台'];
const SquareFeets = ['5坪以下', '6-10坪', '11-15坪', '16坪以上'];
const InvoiceTypes = ['個人電子發票', '捐贈'];
const InvoiceDonateTos = ['中華民國唐氏症基金會', '陽光社會福利基金會', '台灣兒童暨家庭扶助基金會'];

const dataOrder = {
  isPackage: false,
  ProductName: '我家很大',
  DiscountAmount: 150,
  FinalPrice: 600,
  PaymentType: '信用卡/金融卡',
  InvoiceType: InvoiceTypes[1],
  InvoiceDonateTo: InvoiceDonateTos[2],
  packageList: [],
  // packageList: [{
  //   RoomType: [RoomTypes[2], RoomTypes[3]],
  //   SquareFeet: [SquareFeets[0], SquareFeets[0]],
  //   ServiceItems: '清潔 + 收納',
  //   Hour: 1.5,
  //   Price: 100,
  // }],
  // UserDefinedList: [],
  UserDefinedList: [{
      RoomType: RoomTypes[4],
      SquareFeet: SquareFeets[0],
      ServiceItems: '清潔',
      Hour: 0.5,
    },
    {
      RoomType: RoomTypes[1],
      SquareFeet: SquareFeets[1],
      ServiceItems: '清潔',
      Hour: 1.5,
    },
    {
      RoomType: RoomTypes[3],
      SquareFeet: SquareFeets[1],
      ServiceItems: '清潔',
      Hour: 1,
    },
    {
      RoomType: RoomTypes[0],
      SquareFeet: SquareFeets[0],
      ServiceItems: '清潔 + 除蟲',
      Hour: 1,
    },
    {
      RoomType: RoomTypes[2],
      SquareFeet: SquareFeets[1],
      ServiceItems: '清潔 + 收納',
      Hour: 1.5,
    },
    {
      RoomType: RoomTypes[2],
      SquareFeet: SquareFeets[0],
      ServiceItems: '清潔 + 收納',
      Hour: 1,
    },
  ],
};
const vueInfoBox = new Vue({
  el: '#info-box',
  data: dataOrder,
});
const vueItemBox = new Vue({
  el: '#layer-item-box',
  data: dataOrder,
});
const vueModalFavorite = new Vue({
  el: '#modal-favorite',
  data: dataOrder,
});