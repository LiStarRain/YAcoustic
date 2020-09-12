// 加载轮播组件
let glide = new Glide(".glide");
// 加载标题动画
let captionEl = $(".slide-caption");
// 设置加载完成、轮播完成事件
glide.on(["mount.after","run.after"], () => {
  // 获取当前显示的轮播图
  let caption = captionEl[glide.index];
  // 传入动画配置选项
  anime({
    targets: caption.children,
    opacity: [0,1],
    duration: 400,
    easing: "linear",
    delay: anime.stagger(400,{start:300}),
    translateY: [anime.stagger([40,10]),0]
  });
});
// 轮播前要必须把把不透明度设置为0
glide.on("run.before", () => {
  document.querySelectorAll(".slide-caption > *").forEach(el => {
    el.style.opacity = 0;
  });
})
// 加载
glide.mount();

// 实现图片过滤
// 让图片填充父容器的高度
let isotope = new Isotope(".cases", {
  layoutMode: "fitRows",
  itemSelector: ".case-item"
}); 
let filterBtns = document.querySelector(".filter-btns");
filterBtns.addEventListener("click",(event) => {
  let {target} = event; //解构赋值 相当于event.target
  let filterOption = target.getAttribute("data-filter");
  if (filterOption) {
    document.querySelectorAll(".filter-btn.active").forEach(btn => {
      btn.classList.remove("active");
    });
    target.classList.add("active");

    isotope.arrange({filter: filterOption});
  }
});

//  当滑到时内容由下往上缓慢出现
// 设置动画参数
let staggeringOption = {
  delay: 300,
  distance: "50px",
  duration: 500,
  easing: "ease-in-out",
  origin: "bottom"
};

// 控制固定导航栏
let headerEl = document.querySelector("header");
// 监听滚动事件
window.addEventListener("scroll",() => {
  let height = headerEl.getBoundingClientRect().height;
  // 向下滑动的距离超过header本身的距离800px，则把它显示出来
  if (window.pageYOffset - height > 600) {
    if (!headerEl.classList.contains("sticky")) {
      headerEl.classList.add("sticky");
    }
  } else {
    headerEl.classList.remove("sticky");
  }

  // 返回顶部按钮
  let scrollToTop = document.querySelector(".scrollToTop");
  if (window.pageYOffset > 2000) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }
});

// 流畅滚动
let scroll = new SmoothScroll("nav a[href*='#'], .scrollToTop a[href*='#']", {
  header: "header",
  offset: 80
});
// 设置元素动画
ScrollReveal().reveal(".feature",{...staggeringOption,interval: 350});
ScrollReveal().reveal(".case-item",{...staggeringOption,interval: 350});

// 探索更多按钮
let exploreBtns = document.querySelectorAll(".explore-btn");
exploreBtns.forEach(exploreBtn => {
  exploreBtn.addEventListener("click",() => {
    scroll.animateScroll(document.querySelector("#acoustic"));
  });
});

// 折叠按钮
let burger = document.querySelector(".burger");
burger.addEventListener("click",() => {
  headerEl.classList.toggle("open");
  if (headerEl.classList.contains("open")) {
    $(".search-text").css({
      width: "200px",
      opacity: 1
    });
  }
});

// 关闭全屏导航
document.addEventListener("scrollStart",() => {
  if (headerEl.classList.contains("open")) {
    headerEl.classList.remove("open");
  }
});

$(".logOff").click(() => {
  $(".user-message").slideUp(500);
  setTimeout(() => {
    // $("nav").removeClass("logIn");
    // $("user").text("登录");

    location.href = "./index.html";
  },700);
});

$(".logIn .user span").click(() => {
  $(".user-message").toggleClass("on");
});


// 视频
let glide1 = new Glide(".video-glide",{
  type: "slider",
  autoplay: 2000,
  gap: 5,
  hoverpause: true,
  startAt: 0,
  perView: 4
});
glide1.mount();