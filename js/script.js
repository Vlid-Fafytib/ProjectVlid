const preObject = document.getElementById("all");

const db = firebase.database(); //констатнта с базой данных
let listRef = db.ref().child("all"); //определение откуда начинать доставать данные
var array = [];
var tag = [];
var newItem = "";
var checkboxesChecked = [];
var sidebar = document.getElementById("side-bar"); //сайд бар с фильтрами
var bench = document.getElementById("myform"); //форма на главной
var com_fielder = document.getElementById("com_field"); //див со статьями
var esc = document.getElementById("btn-esc"); //кнопка над фильтрами для возврата к формам
var acc = document.getElementById("menu_account");
const page1 = {
  //обьявление класса, который достает данные из базы и заполняет формы
  post1: document.getElementById("probleme"),
  post2: document.getElementById("location"),
  post3: document.getElementById("ache"),
  form1: document.getElementById("form-1"),
  form2: document.getElementById("form-2"),
  form3: document.getElementById("form-3"),
  ref: db.ref("all/articles"),
  tags: [],
  what: [],
  where: [],
  part: [],
  list: [],
  createOptions: function (item) {
    //метод класса по заполнению
    this.post1.innerHTML = "";
    this.post2.innerHTML = "";
    this.post3.innerHTML = "";
    this.form1.innerHTML = "";
    this.form2.innerHTML = "";
    this.form3.innerHTML = "";
    for (let i in item) {
      let tmp = item[i].tags.split(","); //достать строку с тегами из базы и раздеить по запятой

      if (!this.what.includes(tmp[0])) this.what.push(tmp[0]);
      if (!this.where.includes(tmp[1])) this.where.push(tmp[1]);
      if (!this.part.includes(tmp[2])) this.part.push(tmp[2]);
    }
    this.what.forEach(item => {
      this.post1.innerHTML += `<option value="${item}">${item}</option>`;
      this.form1.innerHTML += `<p class="aligner2"><label><input type="checkbox" value="${item}" name="tags-form1" class="checkbox">${item}</label></p>`;
    });
    this.where.forEach(item => {
      this.post2.innerHTML += `<option value="${item}">${item}</option>`;
      this.form2.innerHTML += `<p class="aligner2"><label><input type="checkbox" value="${item}" name="tags-form2" class="checkbox">${item}</label></p>`;
    });
    this.part.forEach(item => {
      this.post3.innerHTML += `<option value="${item}">${item}</option>`;
      this.form3.innerHTML += `<p class="aligner2"><label><input type="checkbox" value="${item}" name="tags-form3" class="checkbox">${item}</label></p>`;
    });
  }
};

page1.ref.on("value", function (snap) {
  //функция создания списка с комментами
  this.list = snap.val(); //массив из строки 6 заполняется даннми из базы
  page1.createOptions(this.list); //вызов функции для вывода вариантов списка из строки 12
});

function call1() {
  newItem = "";
  listRef = db.ref("all/articles/"); //это изменение пути для комментов, в зависимости от выбранного варианта
  listRef.on("child_added", function (data) {
    //функция которая вызовет другую функцию с данными получеными из бд
    tag.length = 0;
    tag.push(data.val().tags.split(","));
    addItem2(data, tag); //вызов функции
  });
  accordionToggles = d.querySelectorAll(".js-accordionTrigger"); //далее код для того, что бы статьи открывались, и анимации работатали
  switchAccordion,
    (touchSupported = "ontouchstart" in window), //считывание нажатия
    (switchAccordion = function (e) {
      //функция которая меняет положение статьи, либо закрыть либо открыть
      var thisAnswer = e.target.parentNode.nextElementSibling;
      thisAnswer.classList.toggle("is-collapsed");
    });
  for (var i = 0, len = accordionToggles.length; i < len; i++) {
    if (touchSupported) {
      accordionToggles[i].addEventListener("touchstart", false); //проверка на нажатие
    }
    accordionToggles[i].addEventListener("click", switchAccordion, false); //вызов функции на смену положения
  }
}

function addItem2(item, tag) {
  //функция для вывода статей по чекбоксам
  for (let i = 0; i < array.length; i++) {
    //проход по массиву с данными
    if (tag[0][0] == checkboxesChecked[i]) {
      //если теги из текущей статьи совпадают с тегом выбраным в фильтрах, тогда в переменную добавить то что ниже
      newItem +=
        '<dt><a href="#' +
        item.val().id +
        '"  class="accordion-title accordionTitle js-accordionTrigger">' +
        item.val().title +
        "</a></dt>" +
        '<dd id="' +
        item.val().id +
        '" class="accordion-content accordionItem is-collapsed">' +
        item.val().text +
        "</dd>";
    } else if (tag[0][1] == checkboxesChecked[i]) {
      if (newItem.indexOf(item.val().text) > -1) {
        newItem += "";
      } else {
        newItem +=
          '<dt><a href="#' +
          item.val().id +
          '"  class="accordion-title accordionTitle js-accordionTrigger">' +
          item.val().title +
          "</a></dt>" +
          '<dd id="' +
          item.val().id +
          '" class="accordion-content accordionItem is-collapsed">' +
          item.val().text +
          "</dd>";
      }
    } else if (tag[0][2] == checkboxesChecked[i]) {
      if (newItem.indexOf(item.val().text) > -1) {
        newItem += "";
      } else {
        newItem +=
          '<dt><a href="#' +
          item.val().id +
          '"  class="accordion-title accordionTitle js-accordionTrigger">' +
          item.val().title +
          "</a></dt>" +
          '<dd id="' +
          item.val().id +
          '" class="accordion-content accordionItem is-collapsed">' +
          item.val().text +
          "</dd>";
      }
    }
    if (bench.style.display == "none") {
      //проверка на то что форма уже скрыта, иначе статьи будут выводиться до того как мы нажали на кнопку
      document.querySelector(".accordion>dl").innerHTML = ""; //очищение блока для статей
      document.querySelector(".accordion>dl").innerHTML += newItem; //отрисовка статей на странице
    }
  }
}

function getCheckedCheckBoxes() {
  //функция проверяющая на количество и качество выбраных чекбоксов
  checkboxesChecked.length = 0;
  var checkboxes = document.getElementsByClassName("checkbox");
  for (i in checkboxes) {
    // проход по всем чекбоксам с классом cheсkbox
    if (checkboxes[i].value == arguments[0]) {
      //если чекбокс совпадает с чекбокосм выбраным в начальной форме из селекта, тогда сделать его выбраным
      checkboxes[i].checked = true; //это сделано для того, что бы после того, что бы начальные селкты сразу выбирали чекбоксы и выводились дефолтные статьи
    } else if (checkboxes[i].value == arguments[1]) {
      checkboxes[i].checked = true;
    } else if (checkboxes[i].value == arguments[2]) {
      checkboxes[i].checked = true;
    }
  }
  for (var index = 0; index < checkboxes.length; index++) {
    if (checkboxes[index].checked) {
      //если чекбокс выбран, тогда добавить чекбокс в массив чекбоксов
      checkboxesChecked.push(checkboxes[index].value); //сделано для того, что бы потом при выводе проверять на то, выбран ли чекбокс
    }
  }
}

page1.form1.onchange = function () {
  //функция которая обновляет статьи после изменения чекбокса, сделано посредством вызва функции вывода
  getCheckedCheckBoxes();
  call1();
};

page1.form2.onchange = function () {
  getCheckedCheckBoxes();
  call1();
};

page1.form3.onchange = function () {
  getCheckedCheckBoxes();
  call1();
};

function fillArray() {
  //функция для обновления данных в массиве данных из формы
  array[6] = document.getElementById("probleme").value;
  array[7] = document.getElementById("location").value;
  array[8] = document.getElementById("ache").value;
}

page1.post1.onchange = function () {
  //если селект изменили, вызвать функцию заполнения и функцию обвнления параметров в фильтрах
  fillArray();
  call1();
};

page1.post2.onchange = function () {
  fillArray();
  call1();
};

page1.post3.onchange = function () {
  fillArray();
  call1();
};

esc.onclick = function () {
  //если на кнопку назад нажали, тогда скрыть не нужное и открыть формы

  bench.style.display = "block";
  com_fielder.style.display = "none";
  sidebar.style.display = "none";
};

array[9] = document.getElementById("btn-submit"); //инициализация кнопки, дальше, для скрытия формы и открытия сайдбара со статьями

// Добавляем обработчик клика на кнопку отправки формы

if (array[9]) {
  array[9].addEventListener("click", function () {
    //большая функция по нажатию на кнопку дальше, заполняет все данныие из формы в этот массив

    array[6] = document.getElementById("probleme").value;
    array[7] = document.getElementById("location").value;
    array[8] = document.getElementById("ache").value;

    getCheckedCheckBoxes(array[6], array[7], array[8]); //вызывает функцию по первичному определению чекбоксов
    bench.style.display = "none";
    sidebar.style.display = "block";
    com_fielder.style.display = "block";
    call1();
  });
}
const auth = firebase.auth();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log("sign in");
    acc.innerHTML = "";
    acc.innerText = "Здравствуйте, " + user.displayName;
    // console.log(user.displayName);
    // ...
  } else {
    // User is signed out.
    console.log("sign out");
  }
});