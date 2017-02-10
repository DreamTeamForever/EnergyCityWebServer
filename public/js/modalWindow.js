var sun_select = document.getElementById("input_sol_model");
var wind_select = document.getElementById("input_wind_model");
var model_request = new XMLHttpRequest();
model_request.open('GET', 'http://localhost/data/default/table_models.json');
model_request.onload = function() {
  if (model_request.status >= 200 && model_request.status < 400) {
    var model_select = JSON.parse(model_request.responseText);
    renderHTML(model_select);
  } else {
    console.log()
  }

};
model_request.onerror = function() {
  console.log("Connection error");
};
model_request.send();

function renderHTML(data) {
  for (var i = 0; i < data.length; i++) {
    var option = document.createElement("option");
    option.text = data[i].model_name;
    if(data[i].model_type == "sol_model") {
      sun_select.add(option, sun_select[i]);
    } else if (data[i].model_type == "wind_model") {
      wind_select.add(option, wind_select[i]);
    }
  };
};