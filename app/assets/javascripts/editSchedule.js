$(function(){
  function buildEditSchedule(schedule, s_time, f_time){
    html=`
        <div class="wrapper">
          <div class="edit-container">
            <div class="edit-container__display">
              <div class="detail-container">
                <p class="detail-container__detail">${s_time}</p>
                <span>〜</span>
                <p class="detail-container__detail">${f_time}</p>
                <p class="detail-container__detail">${schedule.schedule.name}</p>
              </div>
            </div>

            <div class="edit-cantainer__form">
              <p>実績を入力してください。</p>
              <form action="/schedules/${schedule.schedule.id}" accept-charset="UTF-8" method="post"><input type="hidden" name="_method" value="patch"><input type="hidden" name="authenticity_token" value="4crboe0xUGsiGmjkyS6oAlGhpyE8cJcu5JSXtH2R+jENxPqjBgQHwiHHY+t9pYOfAY3NyRLT5qgewuH7DwAy2Q=="><input type="hidden" id="schedule_started_time_1i" name="schedule[started_time(1i)]" value="2000">
                <input type="hidden" id="schedule_started_time_2i" name="schedule[started_time(2i)]" value="1">
                <input type="hidden" id="schedule_started_time_3i" name="schedule[started_time(3i)]" value="1">
                <select id="schedule_started_time_4i" name="schedule[started_time(4i)]">
                  <option value="00">00</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                </select>
                : 
                <select id="schedule_started_time_5i" name="schedule[started_time(5i)]">
                  <option value="00">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </select>

                <span>〜</span>
                <input type="hidden" id="schedule_finished_time_1i" name="schedule[finished_time(1i)]" value="2000">
                <input type="hidden" id="schedule_finished_time_2i" name="schedule[finished_time(2i)]" value="1">
                <input type="hidden" id="schedule_finished_time_3i" name="schedule[finished_time(3i)]" value="1">
                <select id="schedule_finished_time_4i" name="schedule[finished_time(4i)]">
                  <option value="00">00</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                </select>
                : 
                <select id="schedule_finished_time_5i" name="schedule[finished_time(5i)]">
                  <option value="00">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </select>

                <input value="${schedule.schedule.color}" type="color" name="schedule[color]" id="schedule_color">
                <input type="submit" name="commit" value="登録" class="add-schedule blue-button" data-disable-with="登録">
              </form>
              <span class="close-modal">x閉じる</span>
            </div>
          </div>
        </div>
    `
    return html;
  }
  $(document).on('click', '.task', function(e){
    let sche_id = $(this).find('span').attr('data-schedule_id');
    let url = '/schedules/' + String(sche_id) +'/edit'
    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(schedule){
      let s_time = schedule.schedule.start_time.slice(11,16)
      let f_time = schedule.schedule.finish_time.slice(11,16)
      let html = buildEditSchedule(schedule, s_time, f_time);
      $('.container').append(html);
    })
    .fail(function(){
      alert("通信失敗...");
    })
  })
  $(document).on('click', '.close-modal', function(){
    $('.wrapper').fadeOut();
  })
})