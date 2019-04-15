//=require libs/jquery-3.3.1.min.js


$(function(){
    $('.embed-responsive').addClass('loading');
        $('.embed-responsive').on('load', function(){
        console.log('IFRAME LOADED');
        $('.embed-responsive').removeClass("loading");
    });
});
