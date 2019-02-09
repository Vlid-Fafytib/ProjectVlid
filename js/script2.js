var d = document,
accordionToggles = d.querySelectorAll('.js-accordionTrigger'),
switchAccordion,
touchSupported = ('ontouchstart' in window),
switchAccordion = function(e) {
    var thisAnswer = e.target.parentNode.nextElementSibling;
        thisAnswer.classList.toggle('is-collapsed');
       console.log(e.target.parentNode.nextElementSibling);
    };
    for (var i=0,len=accordionToggles.length; i<len; i++) {
        if(touchSupported) {
      accordionToggles[i].addEventListener('touchstart', false);
    }
    accordionToggles[i].addEventListener('click', switchAccordion, false);
  }
