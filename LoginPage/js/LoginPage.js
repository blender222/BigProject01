(function() {
  const $titleLogin = $(".change-box .title-login");
  const $titleRegister = $(".change-box .title-register");
  const $loginBlock = $(".login-block");
  const $registerBlock = $(".register-block");
  const $inputLogin = $(".login-block .input");
  const $inputRegister = $(".register-block .input");
  const $warnText = $(".register-block .warn");
  const fadeDuration = 100;
  const clearWarn = function($ele) {
    $ele.removeClass("input-warn");
  };
  const clearInput = function($ele) {
    $ele.val("");
  }
  $(".change-box .title-login").on("click", function() {
    $titleLogin.addClass("selected");
    $titleRegister.removeClass("selected");
    $registerBlock.fadeOut(fadeDuration, () => {
      $loginBlock.fadeIn(fadeDuration);
      clearWarn($inputRegister);
      clearInput($inputRegister);
      $warnText.text("");
    });
  });
  $(".change-box .title-register").on("click", function() {
    $titleLogin.removeClass("selected");
    $titleRegister.addClass("selected");
    $loginBlock.fadeOut(fadeDuration, () => {
      $registerBlock.fadeIn(fadeDuration);
      clearWarn($inputLogin);
      clearInput($inputLogin);
    });
  });
  $(".btn_login").on("click", function() {
    const password = $(".register-block .password").val();
    $(".login-block .input").each(function() {
      clearWarn($(this));
      if ($(this).val().length === 0) {
        $(this).addClass("input-warn");
      }
    });
  });
  $(".btn_submit").on("click", function() {
    const $password = $(".register-block .password");
    const $passwordCheck = $(".register-block .password-check");
    let isCorrect = true;
    $(".register-block .input").each(function() {
      clearWarn($(this));
      if ($(this).val().length === 0) {
        $(this).addClass("input-warn");
        isCorrect = false;
      }
    });
    $warnText.text("");
    if ($password.val() !== $passwordCheck.val()) {
      isCorrect = false;
      $password.addClass("input-warn");
      $passwordCheck.addClass("input-warn");
      $warnText.text("密碼不符");
    }
    if (!isCorrect) {
      return;
    }

  });
})();