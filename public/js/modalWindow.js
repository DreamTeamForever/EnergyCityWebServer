var sun_select    = document.getElementById("input_sol_model");
var wind_select   = document.getElementById("input_wind_model");
var save_settings = document.getElementById("btn_save_settings");
var game_speed    = document.getElementById("input_speed");
var model_request = new XMLHttpRequest();
model_request.open('GET', 'http://localhost/data/default/table_models.json');
model_request.onload = function() {
  if (model_request.status >= 200 && model_request.status < 400) {
    var model_select = JSON.parse(model_request.responseText);
    renderHTML(model_select);
  } else {
    console.log("Server error code: "+model_request.status);
  }
};

model_request.onerror = function() {
  console.log("Connection error");
};

model_request.send();

save_settings.addEventListener("click", function() {
  writeCookie("game_speed",game_speed.value,10);
  writeCookie("sun_select",sun_select.value,10);
  writeCookie("wind_select",wind_select.value,10);
  $('#game_settings').modal('hide');
});

$(document).ready(function() {
  updateModalSettings();
});

function updateModalSettings(){
  $('#game_settings').on('show.bs.modal', function() {
      $("#input_sol_model").val(readCookie ("sun_select"));
      $("#input_wind_model").val(readCookie ("wind_select"));
      $("#input_speed").val(readCookie ("game_speed"));
  })
}

function renderHTML(data) {
  for (var i = 0; i < data.length; i++) {
    var option = document.createElement("option");
    option.text = data[i].model_name;
    if(data[i].model_type == "sol_model") {
      sun_select.add(option, sun_select[i]);
    } else if (data[i].model_type == "wind_model") {
      wind_select.add(option, wind_select[i]);
    }
  }
};
function writeCookie(name, value, days) {
  var expires = "";
  if(days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toGMTString();
    document.cookie = name + "=" + value + expires + "; path=/";
  }
};

function readCookie(name) {
  var searchName = name + "=";
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var c = cookies[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(searchName) == 0)
      return c.substring(searchName.length, c.length);
  }
  return null;
};

function eraseCookie(name) {
  writeCookie(name, "", -1);
};