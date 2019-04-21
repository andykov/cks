//=include ../libs/slick.min.js
//=include ../libs/baron.min.js
//=include ../libs/jquery.fancybox.min.js

$(function(){
    $('.js-main-banner').slick();
    $('.js-fabrics-logo').slick({
        infinite: false,
        slidesToShow: 8,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    });
    $('.js-media-cont').slick();
    // baron({
    //     root: '.awards',
    //     scroller: '.js-custom-scroll',
    //     bar: '.main__bar',
    //     scrollingCls: '_scrolling',
    //     draggingCls: '_dragging',
    //     direction: 'h',
    //     impact: 'scroller'
    // });
});
