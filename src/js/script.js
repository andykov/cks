const ready = require('./utils/documentReady.js');

ready(function(){
  console.log('DOM героически построен!');

  
});

// document.addEventListener('DOMContentLoaded', function () {

//   // Intro

//   var introVideo = document.getElementById('introVideo');
//   var introIframe = document.getElementById('introIframe');
//   var npmClipboard = new Clipboard('#npmCopy');

//   if (Vimeo) {
//     var introPlayer = new Vimeo.Player(introIframe);
//     introPlayer.ready().then(function () {
//       introVideo.classList.add('has-loaded');
//     });
//   }
// });

const $ = require('jquery');
$( document ).ready(function() {
    // const slicksli = require('slick-carousel');
    // console.log(slicksli);
    $('.js-main-banner').slick();
    $('.js-media-cont').slick();
    $('.js-fabrics-logo').slick();
    $('.js-card-about-gallery').slick();
});