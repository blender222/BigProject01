const phone = document.querySelector('#phone');
phone.addEventListener('input', function (e) {
  phone.value = phone.value.replace(/\D/g, '');
});
let arr = ('aBc def AbC').match(/abc/ig);
console.log(arr);