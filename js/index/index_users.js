const FILTER_TYPE = 'user';
const PDF_PREPARE = false;
var map_property = {zoom: 4, popup_bool: false};
$(document)
  .ready(function() {
    load_table();
  })
  .on('click', '.js_search', function(){
    load_table();
  })
  .on('keypress', '.js_search_input', function(e){
    if(e.which == 13) {
      e.preventDefault();
      load_table();
    }
  })
  .on("click", "[class^='clicksort'], [class^='form-check-input clicksort'], .clicksort", function(){
    $field = $(this).data('field');
    post = $.post("index.php", {act: "list_sort", page: 'user_list', sort: $field});
    post.done(function(data){
        if (data == '1'){
            location.reload();
        }
    });
  })
  .on("click", "[class^='clickResetSort']", function(){
    post = $.post("index.php", {act: "list_sort", page: 'user_list', sort: 'reset'});
    post.done(function(data){
        if (data == '1'){
            location.reload();
        }
    });
  })
.on('click', '.js_button_user_deactivate_of', async function(){
    $id = $(this).data('userid');
    await get_translate('officer_deactivate_confirm');
    if (confirm(alert_text)){
      deactivate_user($id);
    }
  })
  

function load_table(){
  $.ajax({
    type: "post",
    url: "index.php",
    async: true,
    data: {
      act: "load_users_table",
      search: $('.js_search_input').val()
    },
    dataType: "HTML",
    success: function (user_tbody) {
      $('.js_table tbody').html(user_tbody);
      var hash = window.location.hash.substr(1);
      if(hash.length > 0){
        rowOffset = $('#'+hash).offset().top;
        scrollToTop(rowOffset-100);
      }
      let intervalId;

      function checkForGoogleMaps() {
        if (window.google && window.google.maps) {
          clearInterval(intervalId);
          initMap();
        }
      }
      
      intervalId = setInterval(checkForGoogleMaps, 100); 
    }
  })
}
function deactivate_user($id){
  $.ajax({
    type: "post",
    url: "index.php",
    data: {
      act: 'deactivate_user',
      id: $id
    },
  }).done(function(result){
    data = JSON.parse(result);
    if (data.error=='1'){
      alert(data.errorText);
    } else {
      location.reload();
    }
  })
}

//Created for the GSA in 2020-2021. Project management: SpaceTec Partners, software development: www.foxcom.eu
