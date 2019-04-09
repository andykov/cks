const ready = require('./utils/documentReady.js');
const $ = require('jquery');
window.jQuery = $;
window.$ = $;
const libFancybox = require('@fancyapps/fancybox/dist/jquery.fancybox.min.js');
ready(function(){
  console.log('DOM героически построен!');

  // var iframeEmbed = document.getElementsByClassName(".embed-responsive");
  // iframeEmbed.classList.add("loading");
  // document.querySelector('.embed-responsive iframe').onload = function() {
  //   console.log('IFRAME LOADED');
  //   iframeEmbed.classList.remove("loading");
  // }

  $('.embed-responsive').addClass('loading');
  $('.embed-responsive').on('load', function(){
    console.log('IFRAME LOADED');
    $('.embed-responsive').removeClass("loading");
  });
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


// require('@fancyapps/fancybox/dist/jquery.fancybox.min.js');

$(document).ready(function(){
  
  console.log('DOM героически построен! 2');
    // const slicksli = require('slick-carousel');
    // console.log(slicksli);
    $('.js-main-banner').slick();
    $('.js-media-cont').slick();
    // $('.js-fabrics-logo').slick();
    $('.js-card-about-gallery').slick();
});