var alert_text, db_data;

$(document)
 
  .on('click', '.js_change_password', async function(){
    $form = $('.js_change_password_inputs')
      
    $id = $form.find("#js_fi_uid").val();
    $new_password = $form.find("#js_fi_newpass").val();
    $new_password_confirm =  $form.find("#js_fi_newpassconf").val();
    
    await get_translate('change_your_password_confirm');
    if (confirm(alert_text)){
      change_password($id,$new_password,$new_password_confirm);
    }
  })

function change_password($id, $new_password, $new_password_confirm){
  $.ajax({
    type: "post",
    url: "index.php",
    data: {
      act: 'change_password',
      id: $id,
      new_password: $new_password,
      new_password_confirm: $new_password_confirm
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
