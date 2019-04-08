/* global document */

const ready = require('../../js/utils/documentReady.js');
const $ = require('jquery');

ready(function(){
  
});

var cardPreviewData = [
    {
    id: 1001,
    name: "EMERALD PEARL EXTRA",
    images: [
      {
        url: 'https://picsum.photos/1260/523',
      },
      {
        url: 'https://picsum.photos/1260/523',
      },
      {
        url: 'https://picsum.photos/1260/523',
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
    description: `
        <p><b>Labrador Multicolor</b> – гранит итальянского происхождения с идеальной зеркальной полировкой.</p>
        <p>Поверхность минерала темно-зеленая настолько, что кажется черной. Украшение камня – многочисленные серебристые вкрапления, формирующие монотонный, насыщенный узор. Укладка плитки и гранита <b>Labrador Multicolor</b> – не составит проблемы.</p>
        <p>Колоритны подоконники и столешницы из гранита <b>Labrador Multicolor</b> в классических интерьерных решениях. Используется данный камень в составе художественных панно.</p>
    `
    },
    {
      id: 1002,
      name: "MULTICOLOR",
      images: [
        {
          url: 'https://picsum.photos/1260/523',
        },
        {
          url: 'https://picsum.photos/1260/523',
        },
        {
          url: 'https://picsum.photos/1260/523',
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
      description: `
          <p><b>Labrador Multicolor</b> – гранит итальянского происхождения с идеальной зеркальной полировкой.</p>
          <p>Поверхность минерала темно-зеленая настолько, что кажется черной. Украшение камня – многочисленные серебристые вкрапления, формирующие монотонный, насыщенный узор. Укладка плитки и гранита <b>Labrador Multicolor</b> – не составит проблемы.</p>
          <p>Колоритны подоконники и столешницы из гранита <b>Labrador Multicolor</b> в классических интерьерных решениях. Используется данный камень в составе художественных панно.</p>
        `
    }
];

function carPreviewDisplay(_carId) {

    var cardItem, preview = $('.catalog__preview'), map = $('.catalog__map');

    if (_carId === undefined) {
        cardItem = $('.car-list .card');
        cardItem.removeClass('card--preview-show').removeClass('card--cluster');
        preview.removeClass('show').removeAttr('data-preview-id');
        SebekonCarsList.allClusterGeoObjectIDs = {};
        map.removeClass('catalog__map--disabled');
    } else {
        cardItem = $('#card_' + _carId);

        if (cardItem.hasClass('card--preview-show')) {
            cardItem.removeClass('card--preview-show').removeClass('card--cluster');
            preview.removeClass('show').removeAttr('data-preview-id');
            map.removeClass('catalog__map--disabled');
        } else {
            cardItem.siblings().removeClass('card--preview-show');
            //.removeClass('card--cluster');
            cardItem.addClass('card--preview-show');
            //.addClass('card--cluster');
            preview.addClass('show').attr('data-preview-id', _carId);
            map.addClass('catalog__map--disabled');
        }
    }
}

var Card = {
    setData: function() {
        console.log('setData');
    },
    getPreviewProperties: function() {
        // if (this.data.ID > 0) {
        //     if (this.data.DETAIL_PROPERTIES) {
        //         this.refreshCatalogPreview();
        //     } else {
        //         $('#catalog-preview-preloader').show();

        //         var url = '/ajax/car_info_short.php';
        //         if (typeof (this.data.DETAIL_PAGE_URL.split('?')[1]) != 'undefined') {
        //             url += '?' + this.data.DETAIL_PAGE_URL.split('?')[1];
        //         }
        //         var objThis = this;

        //         $.ajax({
        //             url: url,
        //             type: 'get',
        //             data: {
        //                 'AUTO_ID': this.data.ID
        //             },
        //             dataType: 'json'
        //         }).done(function(data) {
        //             if (data.status == 'success') {
        //                 objThis.data.DETAIL_PROPERTIES = data.content;
        //                 objThis.refreshCatalogPreview();

        //             } else if (data.status == 'error') {// console.log(data.content);
        //             }
        //             $('#catalog-preview-preloader').fadeOut(700);
        //         });
        //     }
        // } else {// console.log('пустой массив');
        // }
    },
    previewDisplay: function(_id) {
        cardPreviewData[0].id
        // if (data.content.CARS.length === 0) {
        //     $('.js-car-list-empty').show();
        // } else {
        //     $('.js-car-list-empty').hide();
        // }

        $.each(cardPreviewData, function(i, obj) {
            // $this.elements[obj.ID] = new Rentride.carElement();
            // $this.elements[obj.ID].setData(obj);
            // $this.elements[obj.ID].appendTo($this.parentObj);

            if (typeof SebekonCarsList.allClusterGeoObjectIDs.length != 'undefined' && SebekonCarsList.allClusterGeoObjectIDs.length > 0) {
                SebekonCarsList.allClusterGeoObjectIDs.forEach(function(object) {
                    // если в данный момент выбран кластер, то подгружаемые из него элементы нужно подсвечивать
                    if (typeof ($this.elements[object.id]) == 'object') {
                        $this.elements[object.id].domObj.addClass('card--cluster');
                    }
                });
            }

        });
    }
}


// console.log(Card.getPreview());

console.log(cardPreviewData);


$(document).ready(function() {
   
    $(document).on('click', '.card', function(e) {
        e.preventDefault();
        var cardId = Number($(this).attr('id'));

        $.ajax({
            url: '/',
            data: {name: "EMERALD PEARL EXTRA"},
            success: success,
            dataType: 'json'
          });

          function success() {
              console.log(1111);
          }

        // Показать блок "Подробнее" на карте
        // if ($(window).width() > 1200) {
            // if (!$(e.target).hasClass('card__favorit')) {
            //     event.preventDefault();
            //     var carId = $(this).closest('.card').attr('car_id');
            //     carPreviewDisplay(carId);
            //     Rentride.carsList.elements[carId].setDetailProperties();
            // }
        // }

        // cardPreviewData.forEach(function(element) {
        //     if (element.id == cardId) {
        //         // return element;
        //         console.log(element);
        //         return false;
        //     } else {
        //         console.log('not ID');
        //     }
        // });
    });







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
    // $('.js-card .col-full').css({
    //     'height': 'auto',
    //     'order': 1,
    // });
    $('.js-card .card').on('click', function(){
        $('.js-card .card').removeClass('active');
        $(this).addClass('active');
        $('.card-preview').parent().css({
            'height': 'auto',
            'visibility': 'visible',
            'order': Number($(this).parent().css('order')),
        });
    });
});
