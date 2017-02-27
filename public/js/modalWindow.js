//----Было надо, но теперь. Пусть будет----
var sun_select    = document.getElementById("input_sol_model");
var wind_select   = document.getElementById("input_wind_model");
var save_settings = document.getElementById("btn_save_settings");
var game_speed    = document.getElementById("input_speed");
//-----------------------------------------

//----Глобальные переменные и все такое----
var cs_url        = "http://82.117.171.124:9099/"; // Адресс сервера
var table_model;  //Данные описывающие все модели
var game_model;   //Данные описывающие игровую сессию
var object_model; //Данные описывающие объекты и их настройки
var id_modal = ["FUPUZACY", "YWGQZWKS", "OONFKJAP", "ODWTMDBY", 
                "OPFLGRDB", "WXKEARFV", "CQPQIOBW", "BCFUYTKE", 
                "CWWAWXCC", "NKIXIFEX", "ADLDXAIY", "PWOQPTJU", 
                "QUCLMOBF", "HTRRGVVP", "SCTZRYPP", "PEBYPPPI", 
                "BETIBSFU", "CEHPZNNF", "JACGEIKD", "WKYDPBKW"];
var modal_type =  [
                    {
                    "modelName" : "sol_model",
                    "modelName_ru" : "Модель солнца"
                    },
                    {
                    "modelName" : "wind_model",
                    "modelName_ru" : "Модель ветра"
                    },
                    {
                    "modelName" : "consumption",
                    "modelName_ru" : "Модель потребителя"
                    },
                    {
                    "modelName" : "supplier",
                    "modelName_ru" : "Модель поставщика"
                    },
                    {
                    "modelName" : "station",
                    "modelName_ru" : "Модель станции"
                    }
                  ];
var game = { game_state: false };
//-----------------------------------------

//----Отработка ф-ци по завршению загрузки страницы----
$(document).ready(function() {
  loadData("modelCollections",loadModel);
  loadData("gameSettings",lodaGameSettings);
  loadData("objectCollections",lodaObject); 
  allModalBS();
});
//-----------------------------------------

//----Изменение состояния кнопки(вкл/выкл)----
// isActive - активна ли кнопка true/false
// btn_id   - идентефикатор кнопки
function changeStateButtom(isActive, btn_id) {
  if(isActive){
    document.getElementById(btn_id).removeAttribute("disabled"); 
  } else {
    document.getElementById(btn_id).setAttribute("disabled","disabled");
  }
}
//-----------------------------------------

//----Загрузка данных с сервера------------
// url  - путь до файла на сервере
// callback - ну он и в африке callback
function loadData(url,callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET',cs_url+url);
  xmlHttp.onload = function() {
    if (xmlHttp.status >= 200 && xmlHttp.status < 400) {
      var data = JSON.parse(xmlHttp.responseText);
      callback(data);        
    } else {
      console.log("Server error code: "+xmlHttp.status);
    }
  }
  xmlHttp.send();
};
//-----------------------------------------

//----Сохранение данных на сервер----------
// url  - путь до файла на сервере
// data - данные в формате Json
function saveData(url,data) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('POST',cs_url+url);
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
  xmlHttp.onreadystatechange = function() {
    if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      console.log("Server say 200: "+xmlHttp.responseText);
    }
  }
  xmlHttp.send(data);
};
//-----------------------------------------

//----Начало и конец игры------------------
$('#satrtStop').change(function() {
  game.game_state = $(this).prop('checked')
  if($(this).prop('checked')){
    saveData("satrtGame",JSON.stringify(game));
    startTimer();
    console.log(game.game_state);
  } else {
    saveData("stopGame",JSON.stringify(game));
    stopTimer();
    console.log(game.game_state);
  }
});
//-----------------------------------------

//----обновление таймера игры--------------
function startTimer() {
  enableTimerCh(true,game_model.gameSpeed);
  enableTimerGp(true,game_model.gameSpeed);
}
function stopTimer() {
  enableTimerCh(false,game_model.gameSpeed);
  enableTimerGp(false,game_model.gameSpeed);
}
//-----------------------------------------

//----блокировка интерфейса----------------
function blokControl(isStart) {
  if(isStart){
    $("#inputSolModel").attr("disabled","disabled");
    $("#inputWindModel").attr("disabled","disabled");
    $("#inputSpeed").attr("disabled","disabled");
  } else {
    $("#inputSolModel").removeAttr("disabled");
    $("#inputWindModel").removeAttr("disabled");
    $("#inputSpeed").removeAttr("disabled");
  }
}
//-----------------------------------------

//----НАСТРОЙКИ ТАБЛИЦ МОДЕЛЕЙ-------------
//----Загрузка данных о моделях------------
function loadModel(data) {
  table_model = data;
}
//-----------------------------------------

//----Обновление формы "Выбор модели" при открытии-----------
$('#model_settings').on('show.bs.modal', function() {
  updateSelectModel(table_model);
  $("#table_model_body tr").remove();
});
//-----------------------------------------

//----Обновление селектора-----------
function updateSelectModel(data) {
  $("#select_model option").remove();
  for (var i = 0; i < data.length; i++) {
    $('#select_model').append($("<option></option>").attr("value",data[i].model_name).text(data[i].model_name));
  }
  selectModelType();
}
//-----------------------------------------

//----Отображение таблицы при выборе модели--------
function selectModel() {
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
//-----------------------------------------

//----Редактирование модели по кнопке--------
function editTable() {
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
  $(window).keydown(function(event){  //Херня для таблицы II + Enter
    if(event.keyCode == 13) {
      $('#edit').blur();
    } 
  });
}
//-----------------------------------------

//----Удаление модели по кнопке--------
function deletTableModel() {
  changeStateButtom(false,"btn_delet_model");
  changeStateButtom(false,"btn_edit_model");
  var name = $("#select_model").val();
  for (var i = 0; i < table_model.length; i++) {
    if(name == table_model[i].model_name){
      table_model.splice(i,1);
      break;
    }
  }
  $("#table_model_body tr").remove();
  updateSelectModel(table_model); 
}
//-----------------------------------------

//----обновление выбора типа модели--------
function selectModelType() {
  $("#select_model_type option").remove();
  for (var i = 0; i < modal_type.length; i++) {
    $('#select_model_type').append($("<option></option>").attr("value",modal_type[i].modelName_ru).text(modal_type[i].modelName_ru));
  }
}

function getModelType() {
  var name = $("#select_model_type").val();
  for (var i = 0; i < modal_type.length; i++) {
    if(name == modal_type[i].modelName_ru){
      return modal_type[i].modelName;
    }
  }
}
//-----------------------------------------

//----Создание и редактирование таблицы моделей--------
function createTableModel() {
  var new_name = $("#create_model").val();
  for (var i =0; i < table_model.length; i++) {
    if(table_model[i].model_name == new_name){
      $("#form_create_model").attr("class","form-group has-error");
      return false;
    }
  }
  $("#form_create_model").attr("class","form-group has-success");
  changeStateButtom(false,"btn_create_model");
  changeStateButtom(true,"btn_add_model");
  initTable(new_name);
  console.log("test");
}

function initTable(n_m) {
  $("#table_model_body tr").remove(); 
  for(var j = 0; j < 24; j++ ) {
    var table_c   = document.getElementById('table_current_model').getElementsByTagName('tbody')[0];
    var new_row   = table_c.insertRow(table_c.rows.length);
    new_row.appendChild(document.createElement("TH")).innerText = j ;
    new_row.insertCell(1).innerText = 0;
  }
  editTable();
}
//-----------------------------------------

//----Добавлние таблицы модели в коллекцию--------
function addTableModel(){
  changeStateButtom(true,"btn_create_model");
  changeStateButtom(false,"btn_add_model");
  $("#form_create_model").attr("class","form-group");
  var new_name = $("#create_model").val();
  addModelObject(new_name);
  $("#select_model option").remove();
  updateSelectModel(table_model); //#
  $("#create_model").val("");
}

function addModelObject(newObject) {
  var model_object = {
    model_id: "",
    model_name: "",
    model_type: "",
    data: []
  };
  model_object.model_id = newObject;
  model_object.model_name = newObject;
  model_object.model_type = getModelType();
  model_object.data = getTableData($("#table_current_model  > tbody"));
  table_model.push(model_object);
}

function getTableData(table) {
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
    });
    return data;
}
//-----------------------------------------

//----Сохранение коллекции моделей на сервере--------
function saveСhangesModel() {
  saveData("modelCollections",JSON.stringify(table_model)); 
}
//-----------------------------------------

//----Отмена внесенных изменений--------
function discardChangesModel() {
  $("#table_model_body tr").remove();
  loadData("modelCollections",loadModel);
  loadData("modelCollections",updateSelectModel);
}
//-----------------------------------------
//-----------------------------------------


//----ИГРОВЫЕ НАСТРОЙКИ-----------
//----Кэширование данных--------
function lodaGameSettings(data){
  game_model = data;
}
//-----------------------------------------

//----Обновление формы "Настройки игры" при открытии-------
$('#game_settings').on('show.bs.modal', function() {
  updateFormSettings(game_model);
});
//-----------------------------------------

//----Обновление полей формы--------
function updateFormSettings(data) {
  updateSelectSettings(table_model);
  $("#inputSolModel").val(data.sunModel);
  $("#inputWindModel").val(data.windModel);
  $("#inputSpeed").val(data.gameSpeed);
  blokControl(game.game_state);
}
//-----------------------------------------

//----Обновление селекторов--------
function updateSelectSettings(data) {
  $("#inputSolModel option").remove();
  $("#inputWindModel option").remove();
  var sun_select = document.getElementById("inputSolModel");
  var wind_select = document.getElementById("inputWindModel");
  for (var i = 0; i < data.length; i++) {
    var option = document.createElement("option");
    option.text = data[i].model_name;
    if(data[i].model_type == "sol_model") {
      sun_select.add(option, sun_select[i]);
    } else if (data[i].model_type == "wind_model") {
      wind_select.add(option, wind_select[i]);
    }
  }
}
//-----------------------------------------

//----Сохранение настроек на сервере--------
function saveGameSettings() {
  game_model.gameSpeed = $("#inputSpeed").val();
  game_model.sunModel  = $("#inputSolModel").val();
  game_model.windModel = $("#inputWindModel").val();
  saveData("gameSettings",JSON.stringify(game_model));
}
//-----------------------------------------

//----Отмена изменений--------
function discardChangesSettings() {
  updateFormSettings(game_model);
}
//-----------------------------------------
//-----------------------------------------

//----ЭТО МОЖНО СДЕЛАТЬ ПОДРУГОМУ--------
//----Обновить окно--------
function allModalBS(){
  for (var i = 0; i < id_modal.length; i++) {
    $("#"+id_modal[i]).on('show.bs.modal', function() {
      updateCustomSelect(this.id,getCurrentModel(this.id));
    });
    saveForBtn(id_modal[i]);
    discardForBtn(id_modal[i]);
  }
}
//-----------------------------------------


//----Объекты и их настройки---------------
//----Кэширование данных-------------------
function lodaObject(data){
  object_model = data;
}
//-----------------------------------------

//----Обновить селектор--------
function updateCustomSelect(formId,data) {
  $("#"+formId).find(".form-control").children("option").remove();
  for (var i = 0; i < table_model.length; i++) {
    if(table_model[i].model_type == data.object_type) {
      $("#"+formId).find(".form-control").append($("<option></option>").attr("value",table_model[i].model_name).text(table_model[i].model_name));
    }
  }
  $("#"+formId).find(".form-control").val(data.table_model);
  changeCustomToggle(formId,data.active);
  blokSelect(formId,game.game_state);
}
//-----------------------------------------

//----выствавить галку---------------------
function changeCustomToggle(formId,state){
  $("#"+formId).find("input").prop('checked',state).change();
}
//-----------------------------------------

//----Сохранить настройки---------
function saveForBtn(formId) {
  $("#"+formId).find(".modal-footer").find(".btn.btn-success").click(function(){
    for (var i = 0; i < object_model.length; i++) {
      if(object_model[i].object_id == formId){
        object_model[i].table_model = $("#"+formId).find(".form-control").val();
        object_model[i].active = $("#"+formId).find("input").prop('checked');
        saveData("objectCollections",JSON.stringify(object_model)); 
      }
    }   
  });
}

//----Отменить настройки---------
function discardForBtn(formId) {
  $("#"+formId).find(".modal-footer").find(".btn.btn-default").click(function(){
    updateCustomSelect(formId,object_model);
  });
}
//-----------------------------------------

//----блокировка выбора модели---------
function blokSelect(formId,isStart) {
  if(isStart){
    $("#"+formId).find(".form-control").attr("disabled","disabled");
  } else {
    $("#"+formId).find(".form-control").removeAttr("disabled");
  }
}
//-----------------------------------------

//----Поиск модели по id---------
function getCurrentModel(formId) {
  for (var i = 0; i < object_model.length; i++) {
    if(object_model[i].object_id == formId){
      return object_model[i];
    } 
  }
}
//-----------------------------------------
//-----------------------------------------
