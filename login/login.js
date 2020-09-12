// 注意箭头函数没有this
$("#login").click(function() {
  $(".switch span").removeClass("active");
  $(".submit").removeClass("on");
  $(".submit").removeClass("verity");
  $(this).addClass("active");

  $(this).parents(".content").removeClass("signUp");
  $(this).parents(".content").addClass("login");
  $("form button p").text("登录");
});
$("#signUp").click(function() {
  $(".switch span").removeClass("active");
  $(".submit").removeClass("on");
  $(".submit").removeClass("verity");
  $(this).addClass("active");

  $(this).parents(".content").removeClass("login");
  $(this).parents(".content").addClass("signUp");
  $("form button p").text("注册");
});

$(".input input").on("focus",function() {
  $(this).parent().addClass("focus");
});
$(".input input").on("blur",function() {
  if ($(this).val() === "") {
    // 如果文本框有值就恢复原样了
    $(this).parent().removeClass("focus");
  }
});

// 折叠按钮
let burger = document.querySelector(".burger");
let headerEl = document.querySelector("header");
burger.addEventListener("click",() => {
  headerEl.classList.toggle("open");
  if (headerEl.classList.contains("open")) {
    $(".search-text").css({
      width: "200px",
      opacity: 1
    });
  }
});

// 提交按钮
$(".submit").click(function() {
  $(this).toggleClass("on");
  if (!this.classList.contains("verity")) {
    setTimeout(() => {
      $(this).addClass("verity");
    },1000);
    setTimeout(() => {
      // location.href = "../index.html";
      $(this).submit();
    },3000);
  } else {
    $(this).removeClass("verity");
  }
});

// 表单输入验证
let inputs = $(".input input").prop("required",true);
let pwd;
for (let i = 0; i < inputs.length; i++) {
  $(inputs[i]).blur(function() {
    switch(this.name) {
      case "username":
        console.log(this.value);
        if (!(/^[a-zA-Z]\w{0,7}$/.test(this.value))) {
          alert("用户名不合法(应是有英文字母开头，并且由字母数字或下划线组成的长度小于8的字符串)");
          this.value = '';
          // console.log(this.value);
        }
        break;
    
      case "password": 
        // console.log(this.value);
        if (!/^[a-zA-Z]\S{7,9}$/.test(this.value)) {
          alert("密码输入不合法(应是有英文字母开头，并且由非空白符组成的长度大于8小于10的字符串)");
          this.value = 0;
        } else {
          pwd = this.value;
        }
        break;
      
      case "email":
        if(!/^[0-9a-zA-z]\w+@[0-9a-zA-Z]+.[0-9a-zA-Z]{1,3}$/.test(this.value)) {
          alert("请输入正确的邮箱地址");
          this.value = '';
        }
        break;
      
      case "password-repeat":
        if(this.value !== pwd) {
          alert("两次密码重复输入得不一致，请重新输入！");
          this.value = '';
        }
        break;

      case "phone":
        if (!/^\d{11}$/.test(this.value)) {
          alert("请输入正确的11位电话联系方式！");
          this.value = '';
        }
        break;
    }
  });
}