import Driver from "driver.js"; // import driver.js
import "driver.js/dist/driver.min.css"; // import driver.js css
let driver = new Driver({
  opacity: 0.5,
  allowClose: false,
  keyboardControl: false,
  nextBtnText: "下一步",
  prevBtnText: "上一步",
  closeBtnText: "关闭",
  doneBtnText: "关闭",
});

export function dri(cls, type) {
  // cls dialog节点class, 如果没有dialog 传个undefined
  // type  driver步骤,
  // 开启 这里用不用定时器自己测试,看看去掉之后管不管用
  setTimeout(() => {
    driv(cls, type);
  }, 300);
}

export function resetDri() {
  // 重置遮罩并且清屏
  driver.reset();
}

function driv(cls, type) {
  driver.defineSteps(type);
  driver.start();
  setTimeout(() => {
    // 如果传入了父节点,就进行dom添加操作
    if (cls) {
      let driver_one = document.querySelector("#driver-page-overlay");
      let driver_two = document.querySelector(
        "#driver-highlighted-element-stage"
      );
      let obj = document.querySelector(cls);
      let pa = obj.parentNode;
      //   let driver_three = document.querySelector('#driver-popover-item')
      pa.appendChild(driver_one);
      pa.appendChild(driver_two);
      //   pa.appendChild(driver_three)
    }
  });
}
