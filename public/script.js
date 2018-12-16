const preObject = document.getElementById('all');

const db = firebase.database();
let listRef = db.ref().child('all');

//Sync
// db.on('value',  function (snap) {

// snap.forEach(function(childSnapshot) {
//     var childData = childSnapshot.val();
//     console.log(childData);
//     console.log("d");
// });

// });

const page1 = {
    ref: db.ref('all'),
    // list: [],
    // show: function(item) {
    // },
// createOptions: function(item){
//     this.post.innerHTML = "";
//     for (let i in item){
//         this.post.innerHTML+= `<option value="${i}">${item[i]}</option>`;
//     }
// }
};
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
    var id = "id"+k;
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