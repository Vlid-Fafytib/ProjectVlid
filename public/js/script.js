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
const page1 = {
    post1: document.getElementById("probleme"),
    post2: document.getElementById("location"),
    post3: document.getElementById("ache"),
    form1: document.getElementById("form-1"),
    form2: document.getElementById("form-2"),
    form3: document.getElementById("form-3"),
    ref: db.ref('all/articles'),
    tags: [],
    list: [],
createOptions: function(item){
    this.post1.innerHTML = "";
    this.post2.innerHTML = "";
    this.post3.innerHTML = "";
    this.form1.innerHTML = "";
    this.form2.innerHTML = "";
    this.form3.innerHTML = "";
    for (let i in item){
        // this.tags.push(item.val().tags.split(","));
        this.tags[i] = item[i].tags.split(',');
        this.post1.innerHTML+= `<option value="${this.tags[i][0]}">${this.tags[i][0]}</option>`;
        this.post2.innerHTML+= `<option value="${this.tags[i][1]}">${this.tags[i][1]}</option>`;
        this.post3.innerHTML+= `<option value="${this.tags[i][2]}">${this.tags[i][2]}</option>`;
        this.form1.innerHTML+= `<p class="aligner"><label><input type="checkbox" value="${this.tags[i][0]}" name="tags-form1" class="checkbox">${this.tags[i][0]}</label></p>`;
        this.form2.innerHTML+= `<p class="aligner"><label><input type="checkbox" value="${this.tags[i][0]}" name="tags-form2" class="checkbox">${this.tags[i][1]}</label></p>`;
        this.form3.innerHTML+= `<p class="aligner"><label><input type="checkbox" value="${this.tags[i][0]}" name="tags-form3" class="checkbox">${this.tags[i][2]}</label></p>`;
    }
}
};
// var intervalB = setInterval(function () { // вызов добавления интервалом, данный интервал нужно остановить!!!!
function call1(temp) {
    newItem = "";
    listRef = db.ref('all/articles/'); //это изменение пути для комментов, в зависимости от выбранного варианта
    listRef.on('child_added', function (data) {             //функция которая вызовет другую функцию с данными получеными из бд
    tag.length = 0;
    
    tag.push(data.val().tags.split(","));
    if (temp == 1) {
        addItem(data, tag);   
    } else {
        addItem2(data, tag);
    }
                                           //вызов функции addItem
    });
}
// }, 1000);


page1.ref.on('value', function(snap) {  //функция создания списка с комментами
    this.list = snap.val();               //массив из строки 6 заполняется даннми из базы
    page1.createOptions(this.list);     //вызов функции для вывода вариантов списка из строки 12
});
function addItem(item, tag) {
    if (tag[0][0] == array[6]){
        newItem += '<div class="comm_block"><h2 class="user_name">'
        +item.val().title+'</h2><p class="commText">'
        +item.val().text+'</div>';
    } else
    if (tag[0][1] == array[7]){
        newItem += '<div class="comm_block"><h2 class="user_name">'
        +item.val().title+'</h2><p class="commText">'
        +item.val().text+'</div>';
    } else
    if (tag[0][2] == array[8]){
        newItem += '<div class="comm_block"><h2 class="user_name">'
        +item.val().title+'</h2><p class="commText">'
        +item.val().text+'</div>';
    }
    if (bench.style.display == "none"){
        document.querySelector('.com_field').innerHTML = "";  //добавление элемента списка в список
        document.querySelector('.com_field').innerHTML += newItem;
    }
}

function addItem2 (item, tag){
    for (let i = 0; i < array.length; i++) {
        if (tag[0][0] == checkboxesChecked[i]){
            newItem += '<div class="comm_block"><h2 class="user_name">'
            +item.val().title+'</h2><p class="commText">'
            +item.val().text+'</div>';
        } else
        if (tag[0][1] == checkboxesChecked[i]){
            newItem += '<div class="comm_block"><h2 class="user_name">'
            +item.val().title+'</h2><p class="commText">'
            +item.val().text+'</div>';
        } else
        if (tag[0][2] == checkboxesChecked[i]){
            newItem += '<div class="comm_block"><h2 class="user_name">'
            +item.val().title+'</h2><p class="commText">'
            +item.val().text+'</div>';
        }
        if (bench.style.display == "none"){
            document.querySelector('.com_field').innerHTML = "";  //добавление элемента списка в список
            document.querySelector('.com_field').innerHTML += newItem;
        }
    }
}

function getCheckedCheckBoxes() {
    checkboxesChecked.length = 0;
    var checkboxes = document.getElementsByClassName('checkbox');
    for (var index = 0; index < checkboxes.length; index++) {
       if (checkboxes[index].checked) {
        checkboxesChecked.push(checkboxes[index].value); // положим в массив выбранный
       }
    }
  }
page1.form1.onchange = function (){
    getCheckedCheckBoxes();
    call1(0);
}
page1.form2.onchange = function (){
    getCheckedCheckBoxes();
    call1(0);
}
page1.form3.onchange = function (){
    getCheckedCheckBoxes();
    call1(0);
}
function loadfunc(){
    array[6] = document.getElementById("probleme").value;
    array[7] = document.getElementById("location").value;
    array[8] = document.getElementById("ache").value;
    call1(1);
}
// }
page1.post1.onchange = function () {
    array[6] = document.getElementById("probleme").value;
    array[7] = document.getElementById("location").value;
    array[8] = document.getElementById("ache").value;
    call1(1);
}
page1.post2.onchange = function () {
    array[6] = document.getElementById("probleme").value;
    array[7] = document.getElementById("location").value;
    array[8] = document.getElementById("ache").value;
    call1(1);
}
page1.post3.onchange = function () {
    array[6] = document.getElementById("probleme").value;
    array[7] = document.getElementById("location").value;
    array[8] = document.getElementById("ache").value;
    call1(1);
}

array[9] = document.getElementById("btn-submit");


// Добавляем обработчик клика на кнопку отправки формы

if (array[9]) {
    array[9].addEventListener('click', function() {
    array[0] = document.getElementById("form-age").value;
    array[1] = document.getElementById("form-growth").value;
    array[2] = document.getElementById("form-weight").value; 
    array[6] = document.getElementById("probleme").value;
    array[7] = document.getElementById("location").value;
    array[8] = document.getElementById("ache").value;

    if (document.getElementById("form-male").cheсked){
        array[3] = document.getElementById("form-male").value;
    } else{
        array[3] = document.getElementById("form-female").value;
    }
    if (document.getElementById("form-pressure-yes").cheсked){
        array[4] = document.getElementById("form-pressure-yes").value;
    } else if (document.getElementById("form-pressure-no").cheсked){
        array[4] = document.getElementById("form-pressure-no").value;
    } else {
        array[4] = document.getElementById("form-pressure-possibly").value;
    } 

    if (document.getElementById("form-temperature-yes").cheсked) {
        array[5] = document.getElementById("form-temperature-yes").value;
    } else if(document.getElementById("form-temperature-no").cheсked){
        array[5] = document.getElementById("form-temperature-no").value;
    } else{
        array[5] = document.getElementById("form-temperature-possibly").value;
    };
    bench.style.display='none';//visibility = "collapse";
    sidebar.style.display = "block";
    call1();
  // Пройдёмся по всем полям


});

}
