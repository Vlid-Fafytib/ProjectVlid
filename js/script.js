const preObject = document.getElementById('all');

const db = firebase.database();
let listRef = db.ref().child('all');
var array = [];
var tag = [];
var global_tags = [];
var newItem = "";
var checkboxesChecked = [];
var sidebar = document.getElementById("side-bar");
var bench = document.getElementById("myform");
var com_fielder = document.getElementById("com_field");
var esc = document.getElementById("btn-esc");
const page1 = {
    post1: document.getElementById("probleme"),
    post2: document.getElementById("location"),
    post3: document.getElementById("ache"),
    form1: document.getElementById("form-1"),
    form2: document.getElementById("form-2"),
    form3: document.getElementById("form-3"),
    ref: db.ref('all/articles'),
    tags: [],
    what: [],
    where: [],
    part: [],
    list: [],
    createOptions: function (item) {
        this.post1.innerHTML = "";
        this.post2.innerHTML = "";
        this.post3.innerHTML = "";
        this.form1.innerHTML = "";
        this.form2.innerHTML = "";
        this.form3.innerHTML = "";
        for (let i in item) {
            let tmp = item[i].tags.split(',');

            if (!this.what.includes(tmp[0]))
                this.what.push(tmp[0]);
            if (!this.where.includes(tmp[1]))
                this.where.push(tmp[1]);
            if (!this.part.includes(tmp[2]))
                this.part.push(tmp[2]);
        }
        this.what.forEach(item => {
            this.post1.innerHTML += `<option value="${item}">${item}</option>`;
            this.form1.innerHTML += `<p class="aligner2"><label><input type="checkbox" value="${item}" name="tags-form1" class="checkbox">${item}</label></p>`;
        })
        this.where.forEach(item => {
            this.post2.innerHTML += `<option value="${item}">${item}</option>`;
            this.form2.innerHTML += `<p class="aligner2"><label><input type="checkbox" value="${item}" name="tags-form2" class="checkbox">${item}</label></p>`;
        })
        this.part.forEach(item => {
            this.post3.innerHTML += `<option value="${item}">${item}</option>`;
            this.form3.innerHTML += `<p class="aligner2"><label><input type="checkbox" value="${item}" name="tags-form3" class="checkbox">${item}</label></p>`;
        })
    }
};
function call1() {
    newItem = "";
    listRef = db.ref('all/articles/'); //это изменение пути для комментов, в зависимости от выбранного варианта
    listRef.on('child_added', function (data) {             //функция которая вызовет другую функцию с данными получеными из бд
        tag.length = 0;

        tag.push(data.val().tags.split(","));
        addItem2(data, tag);

        //вызов функции addItem
    });
    accordionToggles = d.querySelectorAll('.js-accordionTrigger');
    switchAccordion,
        touchSupported = ('ontouchstart' in window),
        switchAccordion = function (e) {
            var thisAnswer = e.target.parentNode.nextElementSibling;
            thisAnswer.classList.toggle('is-collapsed');
            console.log(e.target.parentNode.nextElementSibling);
        };
    for (var i = 0, len = accordionToggles.length; i < len; i++) {
        if (touchSupported) {
            accordionToggles[i].addEventListener('touchstart', false);
        }
        accordionToggles[i].addEventListener('click', switchAccordion, false);
    }
}


page1.ref.on('value', function (snap) {  //функция создания списка с комментами
    this.list = snap.val();               //массив из строки 6 заполняется даннми из базы
    page1.createOptions(this.list);     //вызов функции для вывода вариантов списка из строки 12
});

function addItem2(item, tag) {
    for (let i = 0; i < array.length; i++) {
        if (tag[0][0] == checkboxesChecked[i]) {
            newItem += '<dt><a href="#' + item.val().id + '"  class="accordion-title accordionTitle js-accordionTrigger">' + item.val().title + '</a></dt>'
                + '<dd id="' + item.val().id + '" class="accordion-content accordionItem is-collapsed">' + item.val().text + '</dd>';
        } else if (tag[0][1] == checkboxesChecked[i]) {
            if (newItem.indexOf(item.val().text) > -1) {
                newItem += "";
            } else {
                newItem += '<dt><a href="#' + item.val().id + '"  class="accordion-title accordionTitle js-accordionTrigger">' + item.val().title + '</a></dt>'
                    + '<dd id="' + item.val().id + '" class="accordion-content accordionItem is-collapsed">' + item.val().text + '</dd>';
            }
        } else if (tag[0][2] == checkboxesChecked[i]) {
            if (newItem.indexOf(item.val().text) > -1) {
                newItem += "";
            } else {
                newItem += '<dt><a href="#' + item.val().id + '"  class="accordion-title accordionTitle js-accordionTrigger">' + item.val().title + '</a></dt>'
                    + '<dd id="' + item.val().id + '" class="accordion-content accordionItem is-collapsed">' + item.val().text + '</dd>';
            }
        }
        if (bench.style.display == "none") {
            document.querySelector('.accordion>dl').innerHTML = "";  //добавление элемента списка в список
            document.querySelector('.accordion>dl').innerHTML += newItem;
        }
    }
}
function getCheckedCheckBoxes() {
    checkboxesChecked.length = 0;
    var checkboxes = document.getElementsByClassName('checkbox');
    for (i in checkboxes) {
        if (checkboxes[i].value == arguments[0]) {
            checkboxes[i].checked = true;
        } else if (checkboxes[i].value == arguments[1]) {
            checkboxes[i].checked = true;
        } else if (checkboxes[i].value == arguments[2]) {
            checkboxes[i].checked = true;
        }
    }
    for (var index = 0; index < checkboxes.length; index++) {
        if (checkboxes[index].checked) {
            checkboxesChecked.push(checkboxes[index].value);
        }
    }
}
page1.form1.onchange = function () {
    getCheckedCheckBoxes();
}
page1.form2.onchange = function () {
    getCheckedCheckBoxes();
}
page1.form3.onchange = function () {
    getCheckedCheckBoxes();
}

function fillArray() {
    array[6] = document.getElementById("probleme").value;
    array[7] = document.getElementById("location").value;
    array[8] = document.getElementById("ache").value;
}
function loadfunc() {
    fillArray();
}
// }
page1.post1.onchange = function () {
    fillArray();
    call1();
}
page1.post2.onchange = function () {
    fillArray();
    call1();
}
page1.post3.onchange = function () {
    fillArray();
    call1();
}

esc.onclick = function () {
    
    bench.style.display = 'block';
    com_fielder.style.display = "none";
    sidebar.style.display = "none";
    
}

array[9] = document.getElementById("btn-submit");


// Добавляем обработчик клика на кнопку отправки формы

if (array[9]) {
    array[9].addEventListener('click', function () {
        array[0] = document.getElementById("form-age").value;
        array[1] = document.getElementById("form-growth").value;
        array[2] = document.getElementById("form-weight").value;
        array[6] = document.getElementById("probleme").value;
        array[7] = document.getElementById("location").value;
        array[8] = document.getElementById("ache").value;

        if (document.getElementById("form-male").cheсked) {
            array[3] = document.getElementById("form-male").value;
        } else {
            array[3] = document.getElementById("form-female").value;
        }
        if (document.getElementById("form-pressure-yes").cheсked) {
            array[4] = document.getElementById("form-pressure-yes").value;
        } else if (document.getElementById("form-pressure-no").cheсked) {
            array[4] = document.getElementById("form-pressure-no").value;
        } else {
            array[4] = document.getElementById("form-pressure-possibly").value;
        }

        if (document.getElementById("form-temperature-yes").cheсked) {
            array[5] = document.getElementById("form-temperature-yes").value;
        } else if (document.getElementById("form-temperature-no").cheсked) {
            array[5] = document.getElementById("form-temperature-no").value;
        } else {
            array[5] = document.getElementById("form-temperature-possibly").value;
        };
        getCheckedCheckBoxes(array[6], array[7], array[8]);
        bench.style.display = 'none';
        sidebar.style.display = "block";
        if (com_fielder.style.display == "none"){
            com_fielder.style.display = "block";
        }
        call1();
        // Пройдёмся по всем полям
    });

}