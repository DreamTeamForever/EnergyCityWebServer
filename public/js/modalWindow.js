var sun_select    = document.getElementById("input_sol_model");
var wind_select   = document.getElementById("input_wind_model");
var save_settings = document.getElementById("btn_save_settings");
var game_speed    = document.getElementById("input_speed");
var table_model;
edit_table_model();

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
  
    // testSocet();
   //  testSocet_2();
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

function testSocet() {

var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST','http://82.117.171.124:9099/test100500',false);
    // xmlHttp.onload = function () {
    //  var status = request.status; 
    //  var data = request.responseText; 
    // }
    //setRequestHeader("Content-type", "application/x-www-form-urlencoded"
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    var postData = "1111111Some data dfgdfgdfgdfgdf gdfgsfsdgm233423423423423dfgdfgsdfg7657ghjghjfgjhfgj sdfgsdfgsdfgsdfgdsfg";
    // console.log("data: "+postData);
    // xmlHttp.send(postData);
    // console.log("Test: "+xmlHttp.status);
    xmlHttp.onreadystatechange = function() {
    if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        console.log(xmlHttp.responseText);
    }
}
xmlHttp.send(postData);
};

function testSocet_2() {

var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET','http://82.117.171.124:9099/test100500');
    xmlHttp.onload = function() {
      if (xmlHttp.status >= 200 && xmlHttp.status < 400) {
        //var test = JSON.parse(xmlHttp.responseText);
        console.log(xmlHttp.responseText);
        //renderHTML(model_select);
      } else {
        console.log("Server error code: "+xmlHttp.status);
      }
    }
    xmlHttp.send();
};

//Херня для таблицы 0
//http://www.json-generator.com/api/json/get/cgvGBbDrJu?indent=2

function edit_table_model() {
  var table_model_r = new XMLHttpRequest();
  table_model_r.open('GET', 'http://www.json-generator.com/api/json/get/cgvGBbDrJu?indent=2');
  table_model_r.onload = function() {
    if (table_model_r.status >= 200 && table_model_r.status < 400) {
      table_model = JSON.parse(table_model_r.responseText);
      renderModel(table_model);
    } else {
      console.log("Server error code: "+table_model_r.status);
    }
  };
  table_model_r.send();
}

function renderModel(data) {
  var input_model = document.getElementById("select_model");
  for (var i = 0; i < data.length; i++) {
    var option = document.createElement("option");
    option.text = data[i].model_name;
    input_model.add(option, input_model[i]); 
  }


  // var x = document.createElement("TR");
  //   x.setAttribute("id", "myTr");
  //   document.getElementById("myTable").appendChild(x);

  //   var y = document.createElement("TD");
  //   var t = document.createTextNode("new cell");
  //   y.appendChild(t);
  //   document.getElementById("myTr").appendChild(y);
}

//do not fuck, how it works
function select_on_model() {
  changeStateButtom(true,"btn_edit_model");
  changeStateButtom(true,"btn_delet_model");
  $("#table_model_body tr").remove(); 
  var model_n = document.getElementById("select_model").value;
  console.log("Select item: "+model_n);
  for(var i = 0; i < table_model.length; i++) {
    if(model_n==table_model[i].model_name){
      for(var j = 0; j < table_model[i].data.length; j++ ) {
        var table_c   = document.getElementById('table_current_model').getElementsByTagName('tbody')[0];
        var new_row   = table_c.insertRow(table_c.rows.length);
        new_row.appendChild(document.createElement("TH")).innerText = table_model[i].data[j].id ;
        new_row.insertCell(1).innerText = table_model[i].data[j].value;
      }
    }
  }
}


//Херня для таблицы I
function event_edit_table() {
  changeStateButtom(false,"btn_edit_model");
  $(function() {
    $('td').click(function(e) { 
      var t = e.target || e.srcElement; 
      var elm_name = t.tagName.toLowerCase(); 
      if(elm_name == 'input') {
        return false;
      }
      var val = $(this).html(); 
      var code = '<input type="text" id="edit" value="'+val+'" />'; 
      $(this).empty().append(code); 
      $('#edit').focus(); 
      $('#edit').blur(function() { 
        var val = $(this).val(); 
        $(this).parent().empty().html(val); 
      }); 
    }); 
  });

  //Херня для таблицы II + Enter
  $(window).keydown(function(event){ 
    if(event.keyCode == 13) {
      $('#edit').blur();
    } 
  });
}

 //Херня для кнопки I - balalayka
function changeStateButtom(isActive, btn_id) {
  if(isActive){
    document.getElementById(btn_id).removeAttribute("disabled"); 
  } else {
    document.getElementById(btn_id).setAttribute("disabled","disabled");
  }
}

function create_table_model() {
  var new_name = $("#create_model").val();
  for (var i =0; i < table_model.length; i++) {
    if(table_model[i].model_name == new_name){
      $("#form_create_model").attr("class","form-group has-error");
      return false;
    }
  }
  changeStateButtom(false,"btn_create_model");
  changeStateButtom(true,"btn_add_model");
  create_table(new_name);
  console.log("test");
}

function create_table(n_m) {
  $("#table_model_body tr").remove(); 
  for(var j = 0; j < 24; j++ ) {
    var table_c   = document.getElementById('table_current_model').getElementsByTagName('tbody')[0];
    var new_row   = table_c.insertRow(table_c.rows.length);
    new_row.appendChild(document.createElement("TH")).innerText = j ;
    new_row.insertCell(1).innerText = 0;
  }
  event_edit_table();

}

function add_table_model(){
  changeStateButtom(true,"btn_create_model");
  changeStateButtom(false,"btn_add_model");
  var new_name = $("#create_model").val();
  add_model_object(new_name);
  $("#select_model option").remove();
  renderModel(table_model);
  $("#create_model").val("");
}


function add_model_object(newObject) {
  var model_object = {
    model_id: "",
    model_name: "",
    model_type: "",
    data: []
  };
  model_object.model_id = newObject;
  model_object.model_name = newObject;
  model_object.model_type = "vse_huina"
  model_object.data = get_table_data($("#table_current_model  > tbody"));
  table_model.push(model_object);
  // for (var i = 0; i < table_model.length; i++) {
  //   console.log(table_model[i].data)
  // }
}

function delet_table_model() {
  changeStateButtom(false,"btn_delet_model");
  changeStateButtom(false,"btn_edit_model");
  var name = $("#select_model").val();
  for (var i = 0; i < table_model.length; i++) {
    if(name == table_model[i].model_name){
      table_model.splice(i,1);
      break;
    }
  }
  $("#select_model option").remove();
  $("#table_model_body tr").remove();
  renderModel(table_model);
}

function get_table_data(table) {
    var data = [];
    table.find('tr').each(function (rowIndex, r) {
        var data_model = {
          id: "",
          value: ""
        };
        $(this).find('th,td').each(function (colIndlex, c) {
          if(colIndlex == 0){
            data_model.id = c.textContent; 
          } else {
            data_model.value = c.textContent; 
          }           
        });
        data.push(data_model);
        //console.log(data_model);
    });
    //console.log(data);
    return data;
}



//магия бляяяять, Херня для таблицы III
//$('#odin').editable();