const preObject = document.getElementById('all');

const db = firebase.database();
let listRef = db.ref().child('all');
var age, growth, weight, gender, pressure, temperature;

//Sync
// db.on('value',  function (snap) {

// snap.forEach(function(childSnapshot) {
//     var childData = childSnapshot.val();
//     console.log(childData);
//     console.log("d");
// });

// });

const page1 = {
    post: document.getElementById("probleme"),
    ref: db.ref('all/articles'),
    list: [],
    show: function(item) {
    },
createOptions: function(item){
    this.post.innerHTML = "";
    for (let i in item){
        this.post.innerHTML+= `<option value="${i}">${item[i].title}</option>`;
    }
}
};
page1.ref.on('value', function(snap) {  //функция создания списка с комментами
	this.list = snap.val();             //массив из строки 6 заполняется даннми из базы
	page1.createOptions(this.list);     //вызов функции для вывода вариантов списка из строки 12
});
// var id = "";
// id = "id" + 1;

// listRef = db.ref('all/articles/'+id);         //изменение пути листа с компментами 
// listRef.on('value', function (snap) {     //если не выбрано ничего, то загруждается дефолтное значение пути
//     document.querySelector('.com_field').innerHTML = "";    
//     var data = snap.val();
//     addItem(data);                          //опять же вызов функции добавления

// });
for (let i = 1; i < 2; i++)voidd(i);
function voidd(k) {
    var id = "id"+3;
    listRef = db.ref('all/articles/'+id);         //изменение пути листа с компментами 
    listRef.on('value', function (snap) {     //если не выбрано ничего, то загруждается дефолтное значение пути
        document.querySelector('.com_field').innerHTML = "";    
        var data = snap.val();
        addItem(data);                          //опять же вызов функции добавления

    });
}
function addItem(item) {//добавление элемента в отображение
    //cоздадим новый элемент списка с данными из аргумента (каждый item состоит из ключа и значения)
    //по сути это просто добавление комеентария в список комментариев
      
        var newItem = '<div class="comm_block"><h2 class="user_name">'
        +item.title+'</h2><p class="commText">'
        +item.text+'</div>';
        document.querySelector('.com_field').innerHTML += newItem;  //добавление элемента списка в список 
}

function goo(){
    age = document.getElementById("form-age");
    growth = document.getElementById("form-growth");
    weight = document.getElementById("form-weight");
    if (document.getElementById("form-male").cheked){
        gender = document.getElementById("form-male");
    } else{
        gender = document.getElementById("form-female");
    }
    if (document.getElementById("form-pressure-yes").cheked){
        pressure = document.getElementById("form-pressure-yes");
    } else if (document.getElementById("form-pressure-no").cheked){
        pressure = document.getElementById("form-pressure-no");
    } else {
        pressure = document.getElementById("form-pressure-possibly");
    }

    if (document.getElementById("form-temperature-yes").cheked) {
        temperature = document.getElementById("form-temperature-yes");
    } else if(document.getElementById("form-temperature-no").cheked){
        temperature = document.getElementById("form-temperature-no");
    } else {
        temperature = document.getElementById("form-temperature-possibly");
    }
    document.location.href = "../html/list.html";
    console.log("temperature");
}




