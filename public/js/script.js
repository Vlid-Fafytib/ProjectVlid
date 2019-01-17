const preObject = document.getElementById('all');

const db = firebase.database();
let listRef = db.ref().child('all');
var array = [];
var tag = [];
var newItem = "";
var bench = document.getElementById("myform");

const page1 = {
    post1: document.getElementById("probleme"),
    post2: document.getElementById("location"),
    post3: document.getElementById("ache"),
    ref: db.ref('all/articles'),
    tags: [],
    list: [],
    show: function(item) {
    },
createOptions: function(item){
    this.post1.innerHTML = "";
    this.post2.innerHTML = "";
    this.post3.innerHTML = "";
    for (let i in item){
        // this.tags.push(item.val().tags.split(","));
        this.tags[i] = item[i].tags.split(',');
        this.post1.innerHTML+= `<option value="${this.tags[i][0]}">${this.tags[i][0]}</option>`;
        this.post2.innerHTML+= `<option value="${this.tags[i][1]}">${this.tags[i][1]}</option>`;
        this.post3.innerHTML+= `<option value="${this.tags[i][2]}">${this.tags[i][2]}</option>`;
    }
}
};
// var intervalB = setInterval(function () { // вызов добавления интервалом, данный интервал нужно остановить!!!!
function call1() {
    newItem = "";
    listRef = db.ref('all/articles/'); //это изменение пути для комментов, в зависимости от выбранного варианта
    listRef.on('child_added', function (data) {             //функция которая вызовет другую функцию с данными получеными из бд
    tag.length = 0;
    
    tag.push(data.val().tags.split(","));
        addItem(data, tag);                                      //вызов функции addItem
    });
}
// }, 1000);

page1.ref.on('value', function(snap) {  //функция создания списка с комментами
    this.list = snap.val();               //массив из строки 6 заполняется даннми из базы
    page1.createOptions(this.list);     //вызов функции для вывода вариантов списка из строки 12
});
function addItem(item, tag) {//добавление элемента в отображение
    //cоздадим новый элемент списка с данными из аргумента (каждый item состоит из ключа и значения)
    //по сути это просто добавление комеентария в список комментариев
    // if (bench.style.diplay == "none") {
        
    // console.log(tag);
    
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


        
    
          //добавление элемента списка в список
    
    // clearInterval(intervalB);
}
function loadfunc(){
    array[6] = document.getElementById("probleme").value;
    array[7] = document.getElementById("location").value;
    array[8] = document.getElementById("ache").value;
    call1();
    alert(array[6]);
}
// }
page1.post1.onchange = function () {
    array[6] = document.getElementById("probleme").value;
    array[7] = document.getElementById("location").value;
    array[8] = document.getElementById("ache").value;
    call1();
}
page1.post2.onchange = function () {
    array[6] = document.getElementById("probleme").value;
    array[7] = document.getElementById("location").value;
    array[8] = document.getElementById("ache").value;
    call1();
}
page1.post3.onchange = function () {
    array[6] = document.getElementById("probleme").value;
    array[7] = document.getElementById("location").value;
    array[8] = document.getElementById("ache").value;
    call1();
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

    if (document.getElementById("form-male").cheked){
        array[3] = document.getElementById("form-male").value;
    } else{
        array[3] = document.getElementById("form-female").value;
    }
    if (document.getElementById("form-pressure-yes").cheked){
        array[4] = document.getElementById("form-pressure-yes").value;
    } else if (document.getElementById("form-pressure-no").cheked){
        array[4] = document.getElementById("form-pressure-no").value;
    } else {
        array[4] = document.getElementById("form-pressure-possibly").value;
    } 

    if (document.getElementById("form-temperature-yes").cheked) {
        array[5] = document.getElementById("form-temperature-yes").value;
    } else if(document.getElementById("form-temperature-no").cheked){
        array[5] = document.getElementById("form-temperature-no").value;
    } else{
        array[5] = document.getElementById("form-temperature-possibly").value;
    };
    bench.style.display='none';//visibility = "collapse";
    call1();
  // Пройдёмся по всем полям


});

}
