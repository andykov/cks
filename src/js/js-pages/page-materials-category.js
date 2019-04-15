var cardPreviewData = {
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
    description: '<p><b>Labrador Multicolor</b> – гранит итальянского происхождения с идеальной зеркальной полировкой.</p><p>Поверхность минерала темно-зеленая настолько, что кажется черной. Украшение камня – многочисленные серебристые вкрапления, формирующие монотонный, насыщенный узор. Укладка плитки и гранита <b>Labrador Multicolor</b> – не составит проблемы.</p><p>Колоритны подоконники и столешницы из гранита <b>Labrador Multicolor</b> в классических интерьерных решениях. Используется данный камень в составе художественных панно.</p>'
};

$(function(){
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
        $('.card-preview').parent().css({
            'height': 'auto',
            'visibility': 'visible',
            'order': Number($(this).parent().css('order')),
        });

        // $('.js-slider').slick();

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
});