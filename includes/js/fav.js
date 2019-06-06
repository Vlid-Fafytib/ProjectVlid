
const db = firebase.database();
const auth = firebase.auth();

var listRef = "";
var newItem = "";
var fav;
var com_fielder = document.getElementById("com_field"); //див со статьями

function call1(uid) {
    newItem = "";
    listRef = db.ref("all/users/" + uid);
    listRef.once("value").then(e => {
        fav = e.val().favorites.split(",");
        // console.log(fav);
        outPut(fav);
    }).catch(e => {
        console.log(e);
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

function outPut(fav) {
    newItem = "";
    var reff = db.ref("all/articles/");
    fav.forEach(e => {
        reff.child(e).on("value", function (snap) {
            newItem += '<dt><a href="#" class="accordion-title accordionTitle js-accordionTrigger">' +
            snap.val().title +
            '</a></dt>' +
            '<dd id="' +
            '" class="accordion-content accordionItem is-collapsed"><p><label class="label1"><input type="checkbox" class="barabash like" name="like" id="' + snap.key + '" onclick="changeTheFav('+ snap.key +')"><span class="like"></span></label></p>' +
            snap.val().text +
            "</dd>";
            document.querySelector(".accordion>dl").innerHTML = ""; //очищение блока для статей
            document.querySelector(".accordion>dl").innerHTML += newItem; //отрисовка статей на странице
        });
    });

}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      call1(user.uid);
    } else {
      console.log("fail");
      
    }
  });