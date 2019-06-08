
const db = firebase.database();
const auth = firebase.auth();

var listRef = "";
var newItem = "";
var fav;
var com_fielder = document.getElementById("com_field"); //див со статьями
//
function call1(uid) {
    var temp = "";
    newItem = "";
    listRef = db.ref("all/users/" + uid);
    listRef.once("value", function (e) {
        temp = e.val().favorites;
        if (temp.charAt(0) === ",")
            temp = temp.slice(1);
        fav = temp.split(",");
        // console.log(fav);
        outPut(fav);
    });
}
// отрисовка статей 
function outPut(fav) {
    newItem = "";
    var reff = db.ref("all/articles/");

    fav.forEach(e => {
        reff.child(e).on("value", function (snap) {
            newItem += '<dt onclick="switchAccordion()"><a href="#' + snap.key + '" name="' + snap.key + '" class="accordion-title accordionTitle js-accordionTrigger">' +
                snap.val().title +
                '</a></dt>' +
                '<dd id="" class="accordion-content accordionItem is-collapsed"><p><label class="label1"><input type="checkbox" checked class="barabash like" name="like" id="' + snap.key + '" onclick="changeTheFav(' + snap.key + ')"><span class="like"></span></label></p>' +
                snap.val().text +
                "</dd>";
            document.querySelector(".accordion>dl").innerHTML = ""; //очищение блока для статей
            document.querySelector(".accordion>dl").innerHTML += newItem; //отрисовка статей на странице

        });
    });

}

// проверка на наличие пользователя, и вызов отрисовки статей
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        call1(user.uid);
        // switchAccordion();
    } else {
        console.log("fail");

    }
});


function changeTheFav(key) {
    console.log(key.id);
    var favo = '';
    var mass = [];
    var favorites = db.ref("all/users/" + auth.currentUser.uid);
    favorites.once("value").then(snap => {
        favo = snap.val().favorites;
        mass = favo.split(",");
        if (!mass.includes(key.id)) {
            favorites.update({
                'favorites': favo + ',' + key.id
            });
        } else if (mass.includes(key.id)) {
            favo = "";
            for (let i = 0; i < mass.length; i++) {
                if (mass[i] != key.id && mass[i] != "") {
                    if (favo == "") {
                        favo += mass[i];
                    } else {
                        favo += "," + mass[i];
                    }
                }
            }
            favorites.update({
                'favorites': favo
            });
        }
    });
}
// функция смены акориона
function switchAccordion() {
    var d = document,
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