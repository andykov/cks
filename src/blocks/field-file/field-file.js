/* global document */

$('input[type=file]').change(function(e){
  $(this).parents('.field-file').find('.btn').text(e.target.files[0].name);
});