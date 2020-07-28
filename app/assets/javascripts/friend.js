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
  let search_lists = $(".search-lists")
  function buildFriendList(friend){
    let html = `
    <div class="search-lists__list">
    <p>${friend['name']}</p>
    <div class="seach-lists__add add-button" data-id="${friend['id']}" data-name="${friend['name']}">
    追加
    </div>
    </div>
    `
    search_lists.append(html);
  }
  
  
  function addNoUserMessage(message){
    let addHtml = `
    <div class="search-lists__list">
    <p>${message}</p>
    </div>
    `
    return addHtml
  }
  
  let myfriendsContainer = $(".myfriends-container")
  function addFriend(userId, userName){
    let html = `
                <div class="friend">
                  <p data-user-id="${userId}">${userName}</p>
                  <div class="friend__del" data-id="${userId}">
                    <span class="del-button">
                    さよなら
                    </span>
                    <input name="friend[follower_ids][]" type="hidden" value="${userId}">
                  </div>
                </div>
                `
    myfriendsContainer.append(html);
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
    $(".friends-list__item").removeClass("selected-name")
    let day = $(this).attr("id");
    $(this).addClass("selected-name");
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
  let addedArray = []
  let my_friends_array = []
  $(document).on("keyup", ".search-friend", function(e){
    let keyword = $(".search-friend").val();
    $.ajax({
      type: 'GET',
      url: '/friends',
      data: {keyword: keyword},
      dataType: 'json'
    })
    .done(function(friends){
      let my_friends = $(".friend").find("p");
      let num = my_friends.length
      if(keyword !== ""){
        for (let i =0; i < num; i++){
          my_friends_array.push(my_friends[i].getAttribute('data-id'))
        }
        $('.search-lists__list').remove();
        if (friends.length !== 0){
          friends.forEach(function(friend){
            if (my_friends_array.includes(String(friend.id))){
            }else{
              buildFriendList(friend);
            }
          })
        }else{
          $('.search-lists').append(addNoUserMessage("そんな人いません"));
        }
      }else{
        $(".search-lists__list").remove();
      }
    })
    .fail(function(){
      alert("検索失敗しました。。。。");
    });
  });
  $(document).on("click", ".add-button", function(){
    const userId = $(this).attr("data-id");
    const userName = $(this).attr("data-name");
    addFriend(userId, userName);
    my_friends_array.push(userId)
    $(this).parent().remove();
  })
  $(document).on("click", ".friend__del", function(){
    const userId = $(this).attr("data-id");
    const num = my_friends_array.indexOf(String(userId));
    const url = "/friends/" + String(userId)
    my_friends_array.splice(num, 1);
    $(this).parent().remove();
    $.ajax({
      type: 'DELETE',
      url: url,
      dataType: 'json'
    })
    .done(function(){
    })
    .fail(function(){
      alert('うまくいかんかった');
    })
  })
  $(document).on("click", ".hamberger", function(){
    $(".friends-container").slideDown();
    $(".friends-container").addClass('display-block');
    $(".friends-container").removeClass('display-none');
    $(".close-icon").addClass('display-block');
    $(".hamberger").addClass('display-none');
    $('.hamberger').prop('disabled', false);
    $(".close-icon").removeClass('display-none');
  })
  
  $(document).on("click", ".close-icon", function(){
    $(".friends-container").slideUp();
    $(".friends-container").removeClass('display-block');
    $(".close-icon").addClass('display-none');
    $(".hamberger").fadeIn();
    $(".hamberger").removeClass('display-none');
    $('.close-icon').prop('disabled', false);
  })

  $(window).on('load resize', function(){
    var winW = $(window).width();
    var devW = 360;
    if (winW <= devW) {
      //360px以下の時の処理
      $('.friends-container').removeClass('display-block')
      $('.friends-container').addClass('display-none')
      $('.hamberger').addClass('display-block');
      $('.hamberger').removeClass('display-none');
      // $('.addfriend-wrapper').removeClass('')
    } else {
      //360pxより大きい時の処理
      $('.friends-container').removeClass('display-none')
      $('.friends-container').addClass('display-block')
      $('.hamberger').removeClass('display-block');
      $('.hamberger').addClass('display-none');
      $('.close-icon').removeClass('display-block');
    }
  });
});