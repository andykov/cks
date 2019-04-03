const ready = require('./utils/documentReady.js');

ready(function(){
  console.log('DOM героически построен!');
});

const $ = require('jquery');
$( document ).ready(function() {
    // const slicksli = require('slick-carousel');
    // console.log(slicksli);
    $('.js-main-banner').slick();
    $('.js-media-cont').slick();
    $('.js-fabrics-logo').slick();
});