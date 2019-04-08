/* global document */

const ready = require('../../js/utils/documentReady.js');

ready(function(){
  
});

const $ = require('jquery');
$( document ).ready(function() {


    var card = $('.js-card').children().not('.col-full');

    card.each(function(i){
        $(this).css('order', ++i);
    });
    

    var cardRowIndexNum = 1;
    var cardRowIndexCount = 1;
    var arrCardRow = [];
    card.each(function(){

        var thisOffset = $(this).offset().top;

        if(thisOffset == $(this).next().offset().top) {
            ++cardRowIndexCount;
            $(this).css('order', cardRowIndexNum);
        } else {
            arrCardRow.push([cardRowIndexCount, cardRowIndexNum]);
            $(this).css('order', cardRowIndexNum);
            cardRowIndexNum = cardRowIndexNum + 1;
            cardRowIndexCount = 1;
        }
    });
    // $('.js-card .col-full').css({
    //     'height': 'auto',
    //     'order': 1,
    // });
    $('.js-card .card').on('click', function(){
        $('.js-card .card').removeClass('active');
        $(this).addClass('active');
        $('.js-card .col-full').css({
            'height': 'auto',
            'visibility': 'visible',
            'order': Number($(this).parent().css('order')),
        });
    });
});
