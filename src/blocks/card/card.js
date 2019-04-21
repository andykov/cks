/* global document */

var cardPreviewData = {
  id: 1001,
  name: "EMERALD PEARL EXTRA",
  images: [
    {
      url: 'https://picsum.photos/1260/522/?image=1068',
    },
    {
      url: 'https://picsum.photos/1260/522/?image=1069',
    },
    {
      url: 'https://picsum.photos/1260/522/?image=1070',
    },
    {
      url: 'https://picsum.photos/1260/522/?image=1071',
    },
    {
      url: 'https://picsum.photos/1260/522/?image=1072',
    },
  ],
  specifications: {
    material: 'Лабрадорит',
    format: 'Сдэб',
    processing: 'Полированная',
    color: 'Синий',
    size: '3050x1440',
    depth: '12, 20, 30',
    country: 'Италия',
    brand: 'TECHNISTONE'
  },
  description: '<p><b>Labrador Multicolor</b> – гранит итальянского происхождения с идеальной зеркальной полировкой.</p><p>Поверхность минерала темно-зеленая настолько, что кажется черной. Украшение камня – многочисленные серебристые вкрапления, формирующие монотонный, насыщенный узор. Укладка плитки и гранита <b>Labrador Multicolor</b> – не составит проблемы.</p><p>Колоритны подоконники и столешницы из гранита <b>Labrador Multicolor</b> в классических интерьерных решениях. Используется данный камень в составе художественных панно.</p>'
};

var cardPreviewData2 = {
id: 1001,
name: "EMERALD PEARL EXTRA",
images: [
  {
    url: 'https://picsum.photos/1260/522/?image=389',
  },
  {
    url: 'https://picsum.photos/1260/522/?image=395',
  }
],
specifications: {
  material: 'Лабрадорит',
  format: 'Сдэб',
  processing: 'Полированная',
  color: 'Синий',
  size: '3050x1440',
  depth: '12, 20, 30',
  country: 'Италия',
  brand: 'TECHNISTONE'
},
description: '<p><b>Labrador Multicolor</b> – гранит итальянского происхождения с идеальной зеркальной полировкой.</p><p>Поверхность минерала темно-зеленая настолько, что кажется черной. Украшение камня – многочисленные серебристые вкрапления, формирующие монотонный, насыщенный узор. Укладка плитки и гранита <b>Labrador Multicolor</b> – не составит проблемы.</p><p>Колоритны подоконники и столешницы из гранита <b>Labrador Multicolor</b> в классических интерьерных решениях. Используется данный камень в составе художественных панно.</p>'
};

$(function(){
  if ($('.card-preview').length) {
    var card = $('.js-card').children().not($('.card-preview').parent());

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

    $('.js-card .card').on('click', function() {

        var cardId = $(this).attr('id');
        $('.js-card .card').removeClass('active');
        $(this).addClass('active');

        $('.card-preview').addClass('is-show');
        $('.card-preview').parent().css({
          'order': Number($(this).parent().css('order')),
        });

        $('.js-slider').not('.slick-initialized').slick({
          infinite: false,
          lazyLoad: 'ondemand',
          dots: true
        });

        $.each(cardPreviewData.images, function(indexObj, obj) {
          var obj = obj;
          if ($('.slider__item').eq(indexObj).length === 0) {
            // слайды добавляются если в массиве больше объектов чем самих слайдов
            indexObj++;
            $('.js-slider').slick('slickAdd','<div class="slider__item"><img src="'+obj.url+'"></div>');
          } else {
            // слайды удаляются если в массиве меньше объектов чем самих слайдов,
            $.each($('.slider__item'), function(indexEl, elem) {
              if (indexEl != indexObj) {
                $('.js-slider').slick('slickRemove', indexEl);
              } else {
                // console.log(cardPreviewData.images[0].url);
                $(elem).eq(0).find('img').attr('src', cardPreviewData.images[0].url);
                $('.js-slider').slick('slickAdd','<div class="slider__item"><img src="'+obj.url+'"></div>');
                $('.js-slider').slick('slickGoTo', 0);
              }
            });
          }
          $('.slider__item').eq(indexObj).find('img').attr('src', obj.url);
        });



        // ПРОВЕРКА РАБОТЫ РАЗНОГО НАБОРА ПРИХОДЯЩИХ ИЗОБРАЖЕНИЙ

        // if (cardId == '99') {
        //   $.each(cardPreviewData2.images, function(indexObj, obj) {
        //     var obj = obj;
        //     if ($('.slider__item').eq(indexObj).length === 0) {
        //       // слайды добавляются если в массиве больше объектов чем самих слайдов
        //       indexObj++;
        //       $('.js-slider').slick('slickAdd','<div class="slider__item"><img src="'+obj.url+'"></div>');
        //     } else {
        //       // слайды удаляются если в массиве меньше объектов чем самих слайдов,
        //       $.each($('.slider__item'), function(indexEl, elem) {
        //         if (indexEl != indexObj) {
        //           $('.js-slider').slick('slickRemove', indexEl);
        //         } else {
        //           // console.log(cardPreviewData2.images[0].url);
        //           $(elem).eq(0).find('img').attr('src', cardPreviewData2.images[0].url);
        //           $('.js-slider').slick('slickAdd','<div class="slider__item"><img src="'+obj.url+'"></div>');
        //           $('.js-slider').slick('slickGoTo', 0);
        //         }
        //       });
        //     }
        //     $('.slider__item').eq(indexObj).find('img').attr('src', obj.url);
        //   });
        // } else {
        //   $.each(cardPreviewData.images, function(indexObj, obj) {
        //     var obj = obj;
        //     if ($('.slider__item').eq(indexObj).length === 0) {
        //       // слайды добавляются если в массиве больше объектов чем самих слайдов
        //       indexObj++;
        //       $('.js-slider').slick('slickAdd','<div class="slider__item"><img src="'+obj.url+'"></div>');
        //     } else {
        //       // слайды удаляются если в массиве меньше объектов чем самих слайдов,
        //       $.each($('.slider__item'), function(indexEl, elem) {
        //         if (indexEl != indexObj) {
        //           $('.js-slider').slick('slickRemove', indexEl);
        //         } else {
        //           // console.log(cardPreviewData.images[0].url);
        //           $(elem).eq(0).find('img').attr('src', cardPreviewData.images[0].url);
        //           $('.js-slider').slick('slickAdd','<div class="slider__item"><img src="'+obj.url+'"></div>');
        //           $('.js-slider').slick('slickGoTo', 0);
        //         }
        //       });
        //     }
        //     $('.slider__item').eq(indexObj).find('img').attr('src', obj.url);
        //   });
        // }

        var elMaterial = $('.js-product-material span'),
            elFormat = $('.js-product-format span'),
            elProcessing = $('.js-product-processing span'),
            elColor = $('.js-product-color span'),
            elSize = $('.js-product-size span'),
            elDepth = $('.js-product-depth span'),
            elCountry = $('.js-product-country span'),
            elBrand = $('.js-product-brand span'),
            elDescription = $('.js-product-desc');
            

        elMaterial.text(cardPreviewData.specifications.material);
        elFormat.text(cardPreviewData.specifications.format);
        elProcessing.text(cardPreviewData.specifications.processing);
        elColor.text(cardPreviewData.specifications.color);
        elSize.text(cardPreviewData.specifications.size);
        elDepth.text(cardPreviewData.specifications.depth);
        elCountry.text(cardPreviewData.specifications.country);
        elBrand.text(cardPreviewData.specifications.brand);
        elDescription.html(cardPreviewData.description);
    });


    $('.js-card-preview-close').on('click', function(){
      $(this).closest('.card-preview').removeClass('is-show');
      $('.card').removeClass('active');
    });
  }
});
