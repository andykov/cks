//=require libs/jquery-3.3.1.min.js
//=include ../blocks/main-nav/main-nav.js
//=include ../blocks/field-num/field-num.js

$(function(){
    $('.embed-responsive').addClass('loading');
        $('.embed-responsive').on('load', function(){
        console.log('IFRAME LOADED');
        $('.embed-responsive').removeClass("loading");
    });
});

