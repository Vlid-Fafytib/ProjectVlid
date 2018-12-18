const preObject = document.getElementById('all');

const db = firebase.database();
let listRef = db.ref().child('all');
var array = [];
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
// for (let i = 1; i < 2; i++)voidd(i);
// function voidd(k) {
//     var id = "id"+2;
//     listRef = db.ref('all/articles/'+id);         //изменение пути листа с компментами 
//     listRef.on('value', function (snap) {     //если не выбрано ничего, то загруждается дефолтное значение пути
//         document.querySelector('.com_field').innerHTML = "";    
//         var data = snap.val();
//         addItem(data);                          //опять же вызов функции добавления

//     });
// }
listRef = db.ref('all/articles/'); //это изменение пути для комментов, в зависимости от выбранного варианта
listRef.on('child_added', function (data) {             //функция которая вызовет другую функцию с данными получеными из бд
        addItem(data);                                      //вызов функции addItem
    });
function addItem(item) {//добавление элемента в отображение
    //cоздадим новый элемент списка с данными из аргумента (каждый item состоит из ключа и значения)
    //по сути это просто добавление комеентария в список комментариев
      
    var newItem = '<div class="comm_block"><h2 class="user_name">'
    +item.val().title+'</h2><p class="commText">'
    +item.val().text+'</div>';
    document.querySelector('.com_field').innerHTML += newItem;  //добавление элемента списка в список 
}
array[6] = document.getElementById("btn-submit");

function CustomValidation() { }

CustomValidation.prototype = {
  // Установим пустой массив сообщений об ошибках
  invalidities: [],

  // Метод, проверяющий валидность
  checkValidity: function(input) {

    var validity = input.validity;

    if (validity.patternMismatch) {
      this.addInvalidity('This is the wrong pattern for this field');
    }

    if (validity.rangeOverflow) {
      var max = getAttributeValue(input, 'max');
      this.addInvalidity('The maximum value should be ' + max);
    }

    if (validity.rangeUnderflow) {
      var min = getAttributeValue(input, 'min');
      this.addInvalidity('The minimum value should be ' + min);
    }

  },

  // Добавляем сообщение об ошибке в массив ошибок
  addInvalidity: function(message) {
    this.invalidities.push(message);
  },

  // Получаем общий текст сообщений об ошибках
  getInvalidities: function() {
    return this.invalidities.join('. \n');
  }
};

// Добавляем обработчик клика на кнопку отправки формы
array[6].addEventListener('click', function(e) {
    array[0] = document.getElementById("form-age");
    array[1] = document.getElementById("form-growth");
    array[2] = document.getElementById("form-weight");
    if (document.getElementById("form-male").cheked){
        array[3] = document.getElementById("form-male");
    } else{
        array[3] = document.getElementById("form-female");
    }
    if (document.getElementById("form-pressure-yes").cheked){
        array[4] = document.getElementById("form-pressure-yes");
    } else if (document.getElementById("form-pressure-no").cheked){
        array[4] = document.getElementById("form-pressure-no");
    } else {
        array[4] = document.getElementById("form-pressure-possibly");
    } 

    if (document.getElementById("form-temperature-yes").cheked) {
        array[5] = document.getElementById("form-temperature-yes");
    } else if(document.getElementById("form-temperature-no").cheked){
        array[5] = document.getElementById("form-temperature-no");
    } else{
        array[5] = document.getElementById("form-temperature-possibly");
    }

  // Пройдёмся по всем полям
  for (var i = 0; i < array.length; i++) {

    var input = array[i];

    // Проверим валидность поля, используя  функцию checkValidity()
    if (input.checkValidity() == false) {
      var inputCustomValidation = new CustomValidation(); // Создадим объект CustomValidation
      inputCustomValidation.checkValidity(input); // Выявим ошибки
      var customValidityMessage = inputCustomValidation.getInvalidities(); // Получим все сообщения об ошибках
      input.setCustomValidity(customValidityMessage); // Установим специальное сообщение об ошибке

    } // закончился if
  } // закончился цикл

});



