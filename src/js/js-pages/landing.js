//=include ../libs/slick.min.js
//=include ../libs/jquery.fancybox.min.js

$(function(){
  // Табы
  $('.js-lp-materials-nav a').on('click', function(e){
    e.preventDefault();
    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    $(this).closest('.lp-materials').find('.lp-materials__body-item').siblings().removeClass('active');
    $(this).closest('.lp-materials').find('.lp-materials__body-item').eq($(this).index()).addClass('active')
  });

  //Слайдер
  // $('.js-example-work').slick();
  $('.js-example-work').slick({
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        }
    ]
  });
});
