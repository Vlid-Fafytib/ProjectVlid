const db = firebase.database();//ссылка на базу данных
let listRef = db.ref('ways/way1/comments'); //создание переменной базы данных и задание пути
const page1 = {
		post: document.getElementById("post_type"), // задание переменной поста, для выбора определенной типа комментов
		ref: db.ref('ways'),                        // задание ссылки для начала выбора комментов
		list: [],                                   // соддание массива для коммментов
		show: function(item) {                      // по сути создание функции для показа комментов либо чего то такого, ноя не понял
		},
	createOptions: function(item){                  //функция для вывода на экран вариантов выбора
		this.post.innerHTML = "";                   //пост = ничему
        for (let i in item){                        //просто вывод в цикле
            this.post.innerHTML+= `<option value="${i}">${item[i].name}</option>`; // добавление варианта выбора в HTML
		} 
    }
};

page1.ref.on('value', function(snap) {  //функция создания списка с комментами
	this.list = snap.val();             //массив из строки 6 заполняется даннми из базы
	page1.createOptions(this.list);     //вызов функции для вывода вариантов списка из строки 12
});

page1.post.onchange = function(){       //вызов функции по потере фокуса над формой (то есть при выборе какого либо варианта и нажатии в бюбое место, данная функция выполнится)
	document.querySelector('.com_field').innerHTML = "";    //это я не понял что
	
	listRef = db.ref('ways/'+page1.post.value+'/comments'); //это изменение пути для комментов, в зависимости от выбранного варианта
	listRef.on('child_added', function (data) {             //функция которая вызовет другую функцию с данными получеными из бд
        addItem(data);                                      //вызов функции addItem
    });
    
    listRef.on('child_changed', function(data) {//если в бд что-то изменили то мы вызываем другую функцию которая по идее обновляет данные
        changeItem(data);                       //вызов данной функции
    });
	setOnclick();                               //вызов функции 
}

listRef = db.ref('ways/way1/comments');         //изменение пути листа с компментами 
listRef.on('child_added', function (data) {     //если не выбрано ничего, то загруждается дефолтное значение пути
        addItem(data);                          //опять же вызов функции добавления
		setOnclick();                           //вызов функции 
});
    
listRef.on('child_changed', function(data) {    //если в бд что-то изменили дефолт
        changeItem(data);                       //опять же вызов если изменили, но только дефолтного значения 
});
setOnclick();                                   //вызов функции 

function addItem(item) {//добавление элемента в отображение
    //cоздадим новый элемент списка с данными из аргумента (каждый item состоит из ключа и значения)
    //по сути это просто добавление комеентария в список комментариев
    var newItem = '<div class="comm_block"><h2 class="user_name">'+item.val().name+'</h2><p class="commText">'+item.val().text+' </p><span class="delete buttonDel" id="'+item.key+'" >Видалити</span></div>';
    document.querySelector('.com_field').innerHTML += newItem;  //добавление элемента списка в список (но я не понял ничего что это такое?????)*********************************************************
}
	
	//добавление "слушателей" событий, eсли в бд что-то добавили
	function deleteComm(id) {                   
		var postV= page1.post.value;
		db.ref('ways/'+page1.post.value+'/comments/'+id).remove();
		page1.post.value = postV;
		page1.post.onchange();
	}
	
	function setOnclick() { // по сути эо функция удаления из списка 
		var elements = document.getElementsByClassName("delete");
		for (let i in elements){
			elements[i].onclick=function(){
				deleteComm(this.id);
			};
		}
	}		//записать в массив каждой кнопке    (это её коммент, не понял что он значит)