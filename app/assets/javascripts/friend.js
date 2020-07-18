$(function(){

  function buildButton(newday, user_id){
    let html =`
      <span class="friend-day-icon back" id="/friends/${user_id}/otherday/${newday[0]}">
        <i class="fas fa-chevron-left"></i>
      </span>
      <span class="day_display">${newday[1]}</span>
      <span class="friend-day-icon front" id="/friends/${user_id}/otherday/${newday[2]}">
        <i class="fas fa-chevron-right"></i>
      </span>
    `
    return html;
  };

  function buildPlanDone(schedules, width_records){
    let html2 = ""
    for(var i = 0; i< schedules.length; i++){
      let schedule_id = schedules[i].id
      let width = width_records[schedule_id]
      let html = `
                  <div class="task" style="grid-column: ${width[0]}/${width[1]}; grid-row: 1/2; background-color: ${schedules[i]['color']};">
                    <span>${schedules[i]['name']}<span>
                  </div>
                `
      if (width.length > 2){
        let html3 = `
                      <div class="task" style="grid-column: ${width[2]}/${width[3]}; grid-row: 3/4; background-color: ${schedules[i]['color']};">
                        <span>${schedules[i]['name']}</span>
                      </div>
                    `
        html += html3
      }
      html2 = html2 + html;
    }
    return html2;
  }

  $(document).on('click', '.friend-day-icon', function(e){
    e.preventDefault();
    let day = $(this).attr("id");
    $.ajax({
      url: day,
      type: "GET",
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(schedules){
      $('.task').remove();
      $('.back').remove();
      $('.front').remove();
      $('.day_display').remove();
      $('.center-buttons').append(buildButton(schedules.days, schedules.user_id));
      $('.schedule-wrapper__plan').append(buildPlanDone(schedules.schedules, schedules.width_records));
      $('.friend-day-icon').prop('disabled', false);
    })
    .fail(function(){
      alert("ごめんなさい！表示できません。。。");
    });
  });
  $(document).on('click', '.friends-list__item', function(e){
    e.preventDefault();
    let day = $(this).attr("id");
    $.ajax({
      url: day,
      type: "GET",
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(schedules){
      $('.task').remove();
      $('.back').remove();
      $('.front').remove();
      $('.day_display').remove();
      $('.center-buttons').append(buildButton(schedules.days, schedules.user_id));
      $('.schedule-wrapper__plan').append(buildPlanDone(schedules.schedules, schedules.width_records));
      $('.friend-day-icon').prop('disabled', false);
    })
  });

});