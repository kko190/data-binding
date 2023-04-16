let products = [
  { id: 0, price: 70000, title: "Blossom Dress" },
  { id: 1, price: 50000, title: "Springfield Shirt" },
  { id: 2, price: 60000, title: "Black Monastery" },
];

products.forEach((item, i) => {
  let card = `<div class="col-sm-4">
  <img src="https://via.placeholder.com/600" class="w-100" />
  <h5>${products[i].title}</h5>
  <p>가격 : ${products[i].price}</p>
  <button class="buy">구매</button>
  </div>`;
  $(".row").append(card);
});
// local storage 다루기
// let arr = [1, 2, 3];
// let newArr = JSON.stringify(arr);
// localStorage.setItem("num", newArr);
// let get = localStorage.getItem("num");
// console.log(JSON.parse(get));
$(".buy").click(function (e) {
  let title = $(e.target).siblings("h5").text();
  if (localStorage.getItem("cart") != null) {
    let get = JSON.parse(localStorage.cart);
    get.push(title);
    localStorage.setItem("cart", JSON.stringify(get));
  } else {
    localStorage.setItem("cart", JSON.stringify([title]));
  }
});

// select 인풋 다루기
// 이벤트 리스너를 달아주어야 유저가 input을 조작할 때마다 실행될 수 있다.

let iphoneModel = ["Iphone13", "Iphone13 Pro", "Iphone14", "Iphone14 Pro"];
let galaxyModel = ["Galaxy23", "Galaxy23 Plus", "Galaxy23 Ultra"];

$(".form-select")
  .eq(0)
  .on("input", function () {
    if (this.value == "아이폰") {
      $(".form-select").eq(1).removeClass("form-hide");
      $(".form-select").eq(1).html("");
      iphoneModel.forEach(function (item) {
        $(".form-select").eq(1).append(`<option>${item}</option>`);
      });
    } else {
      $(".form-select").eq(1).removeClass("form-hide");
      $(".form-select").eq(1).html("");
      galaxyModel.forEach(function (item) {
        $(".form-select").eq(1).append(`<option>${item}</option>`);
      });
    }
  });
// ajax를 활용하여 데이터를 받아온 후에 출력하기
let moreCount = 0;
$("#more").click(function () {
  moreCount += 1;
  if (moreCount == 1) {
    $.get("https://codingapple1.github.io/js/more1.json").done(function (data) {
      createCard(data);
    });
  } else {
    $.get("https://codingapple1.github.io/js/more2.json").done(function (data) {
      createCard(data);
    });
  }
});

// forEach가 반복되니 함수로 축약해서 코드 축소화.
function createCard(a) {
  a.forEach((item, i) => {
    let card = `<div class="col-sm-4">
    <img src="https://via.placeholder.com/600" class="w-100" />
    <h5>${a[i].title}</h5>
    <p>가격 : ${a[i].price}</p>
    </div>`;
    $(".row").append(card);
  });
}

// 가격순정렬 버튼을 누르면 가격순으로 정렬해주는 기능
$("#price").click(function () {
  products.sort(function (a, b) {
    return a.price - b.price;
  });
  $(".row").html("");
  createCard(products);
});

// 상품명정렬 버튼을 누르면 다나가 순으로 정렬해주는 기능
$("#title").click(function () {
  products.sort(function (a, b) {
    if (b.title < a.title) {
      // 원래라면 a가 b보다 크면 오른쪽에 배치해야 하는데 음수 값을 출력하게 해서 역순으로 지정해줌.
      return -1;
    } else if (b.title > a.title) {
      return 1;
    } else {
      return 0;
    }
  });
  $(".row").html("");
  createCard(products);
});

//6만원이하 상품 버튼을 누르면 6만원 이하 상품만 보여주는 기능
$("#less").click(function () {
  let newProducts = products.filter(function (a) {
    return a.price <= 60000;
  });
  $(".row").html("");
  createCard(newProducts);
});
