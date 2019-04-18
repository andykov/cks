/* global document */

(function(){
    var burgers = document.querySelectorAll('.burger');
    var documentBody = document.querySelector('body');
  
    for (var i = 0; i < burgers.length; i++) {
      var burger = burgers[i];
      burger.addEventListener('click', showBurgerTarget);
    }
  
    function showBurgerTarget() {
      var targetId = this.getAttribute('data-target-id');
      var targetClassToggle = this.getAttribute('data-target-class-toggle');
      if (targetId && targetClassToggle) {
        this.classList.toggle('burger--close');
        documentBody.classList.toggle('scroll-off');
        document.getElementById(targetId).classList.toggle(targetClassToggle);
      }
    }
}());
