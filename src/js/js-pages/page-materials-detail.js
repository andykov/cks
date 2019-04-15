//=require ../libs/jquery.sliderPro.js


$(function(){
    $('.js-gallery').sliderPro({
        width: 1260,
        height: 612,
        // orientation: 'vertical',
        loop: false,
        arrows: true,
        buttons: true,
        thumbnailsPosition: 'right',
        thumbnailPointer: true,
        thumbnailWidth: 160,
        breakpoints: {
            800: {
                thumbnailsPosition: 'bottom',
                thumbnailWidth: 160,
                thumbnailHeight: 72
            },
            500: {
                // orientation: 'vertical',
			    thumbnailsPosition: 'bottom',
                thumbnailWidth: 160,
                thumbnailHeight: 72
            }
        }
    });
});