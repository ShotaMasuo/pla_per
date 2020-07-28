$(function(){
  $(document).on('click', ".edidel_del", function(e){
    let sche_id = $(this).attr("data-schedule_id")
    let url = "/schedules/" + sche_id;
    $.ajax({
      type: 'DELETE',
      url: url,
      dataType: 'json'
    })
    .done(function(delId){
      let del_tr = "[data-trschedule_id=" + delId.sche_id + "]"
      $(del_tr).remove();
    })
    .fail(function(){
      alert('うまくいかんかった');
    })
  });

  $('.edidel_form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      type :"POST",
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(schedule){
      $('.edidel_edi').prop('disabled', false);
    })
    .fail(function(){
      alert('うまくいかんかった');
    })
  })
})