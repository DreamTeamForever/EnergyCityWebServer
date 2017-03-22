//----Было надо, но теперь. Пусть будет----
// var sun_select = document.getElementById("input_sol_model");
// var wind_select = document.getElementById("input_wind_model");
// var save_settings = document.getElementById("btn_save_settings");
// var game_speed = document.getElementById("input_speed");
//-----------------------------------------

//----Глобальные переменные и все такое----
var cs_url = "http://82.117.171.124:9099/"; // Адресс сервера
var gamerTimer = 0; //Таймер для таймера
var gamerCount = 0; //Счетчик для таймера
var superIDObject;
var superTypeModel = "";
var gamerClock = {
    "day": 0,
    "hour": 0,
    "minute": 0
};
var table_model; //Данные описывающие все модели
var game_model; //Данные описывающие игровую сессию
var object_model; //Данные описывающие объекты и их настройки
var id_modal = ["CH_001", "CH_002", "CU_001", "CU_002",
    "CU_003", "CU_004", "CU_005", "CU_006",
    "CF_001", "CF_002", "GRA_001", "GRA_002",
    "GRA_003", "GRD_001", "GRD_002", "GRD_003",
    "GW_001", "GS_001", "MS_001", "SS_001"
];
var modal_type = [{
        "modelName": "sol_model",
        "modelName_ru": "Модель солнца"
    },
    {
        "modelName": "wind_model",
        "modelName_ru": "Модель ветра"
    },
    {
        "modelName": "consumption",
        "modelName_ru": "Модель потребителя"
    },
    {
        "modelName": "supplier",
        "modelName_ru": "Модель поставщика"
    },
    {
        "modelName": "station",
        "modelName_ru": "Модель станции"
    }
];
var game = {
    game_state: false
};
//-----------------------------------------

//----Отработка ф-ци по завршению загрузки страницы----
$(document).ready(function() {
    loadData("modelCollections", loadModel);
    loadData("gameSettings", lodaGameSettings);
    loadData("objectCollections", lodaObject);
    allModalBS();
});
//-----------------------------------------

//----Изменение состояния кнопки(вкл/выкл)----
// isActive - активна ли кнопка true/false
// btn_id   - идентефикатор кнопки
function changeStateButtom(isActive, btn_id) {
    if (isActive) {
        document.getElementById(btn_id).removeAttribute("disabled");
    } else {
        document.getElementById(btn_id).setAttribute("disabled", "disabled");
    }
}
//-----------------------------------------

//----Загрузка данных с сервера------------
// url  - путь до файла на сервере
// callback - ну он и в африке callback
function loadData(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', cs_url + url);
    xmlHttp.onload = function() {
        if (xmlHttp.status >= 200 && xmlHttp.status < 400) {
            var data = JSON.parse(xmlHttp.responseText);
            callback(data);
        } else {
            console.log("Server error code: " + xmlHttp.status);
        }
    }
    xmlHttp.send();
};
//-----------------------------------------

//----Сохранение данных на сервер----------
// url  - путь до файла на сервере
// data - данные в формате Json
function saveData(url, data) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', cs_url + url);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            console.log("Server say 200: " + xmlHttp.responseText);
        }
    }
    xmlHttp.send(data);
};
//-----------------------------------------

//----Начало и конец игры------------------
$('#startStop').change(function() {
    game.game_state = $(this).prop('checked')
    if ($(this).prop('checked')) {
        saveData("startGame", JSON.stringify(game));
        startGame();
    } else {
        saveData("stopGame", JSON.stringify(game));
        stopGame();
    }
});

function startGame() {
    startTimer();
    console.log(game.game_state);
    $('#clockdiv > div').css("background", '#5cb85c');
}

function stopGame() {
    stopTimer();
    console.log(game.game_state);
    $('#clockdiv > div').css("background", '#c9302c');
}
//-----------------------------------------

//----Часы тикают, а я херню написал-------
function enableTimerGm(gameState, time) {
    if (gameState) {
        changeTimerLabel();
        gamerTimer = setInterval('realTimer()', time);
    } else {
        clearInterval(gamerTimer);
        gamerClock.minute = 0;
        gamerClock.hour = 0;
        gamerClock.day = 0;
    }
}

function realTimer() {
    gamerClock.minute += 20;
    if (gamerClock.minute == 60) {
        gamerClock.hour += 1;
        gamerClock.minute = 0;
    }
    if (gamerClock.hour == 24) {
        gamerClock.day += 1;
        gamerClock.hour = 0;
    }
    if (gamerClock.day >= 8) {
        gamerClock.minute = 0;
        gamerClock.hour = 0;
        gamerClock.day = 0;
        endGameFunc();
        return 0;
    }
    changeTimerLabel();
}

function endGameFunc() {
    console.log('game_over');
    $('#startStop').bootstrapToggle('off')
    $('#game_over_modal').modal('show');
}

function changeTimerLabel() {
    // var labelText = "День: " + gamerClock.day + ";" + " Час: " + gamerClock.hour + ";" + " Минута: " + gamerClock.minute + ".";
    // document.getElementById('startStopLabel').innerHTML = labelText;
    $('.days').text(gamerClock.day);
    $('.hours').text(gamerClock.hour);
    $('.minutes').text(gamerClock.minute);
    saveClock();
}

function saveClock() {
    eraseCookie("days");
    eraseCookie("hours");
    eraseCookie("minutes");
    writeCookie("days", gamerClock.day, 10);
    writeCookie("hours", gamerClock.hour, 10);
    writeCookie("minutes", gamerClock.minute, 10);
}

function readClock() {
    gamerClock.day = Number(readCookie("days"));
    gamerClock.hour = Number(readCookie("hours"));
    gamerClock.minute = Number(readCookie("minutes"));
}

function loadState() {
    var tem = readCookie("game");
    console.log(tem);
    if (tem == "true") {
        readClock();
        changeTimerLabel();
        $('#startStop').bootstrapToggle('on');
    }

}
//-----------------------------------------

//----обновление таймера игры--------------
function startTimer() {
    var val = game_model.gameSpeed * 1000;
    console.log("Game speed: " + val);
    enableTimerCh(true, val);
    enableTimerGp(true, val);
    enableTimerGm(true, val);
    eraseCookie("game");
    writeCookie("game", "true", 10);
}

function stopTimer() {
    var val = game_model.gameSpeed * 1000;
    console.log("Game speed: " + val);
    enableTimerCh(false, val);
    enableTimerGp(false, val);
    enableTimerGm(false, val);
    eraseCookie("game");
    writeCookie("game", "false", 10);
}
//-----------------------------------------

//----блокировка интерфейса----------------
function blokControl(isStart) {
    if (isStart) {
        $("#inputSolModel").attr("disabled", "disabled");
        $("#inputWindModel").attr("disabled", "disabled");
        $("#inputSpeed").attr("disabled", "disabled");
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
    $("#select_model_type_с option").remove();
    for (var i = 0; i < data.length; i++) {
        $('#select_model').append($("<option></option>").attr("value", data[i].model_name).text(data[i].model_name));
        $('#select_model_type_с').append($("<option></option>").attr("value", data[i].model_type_ru).text(data[i].model_type_ru));
    }
    $('#select_model').val(" ");
    selectModelType();
}
//-----------------------------------------

//----Отображение таблицы при выборе модели--------l
function selectModel() {
    changeStateButtom(true, "btn_edit_model");
    changeStateButtom(true, "btn_delet_model");
    $("#table_model_body tr").remove();
    var model_n = document.getElementById("select_model").value;
    var model_t;
    console.log("Select item: " + model_n);
    for (var i = 0; i < table_model.length; i++) {
        if (model_n == table_model[i].model_name) {
            model_t = table_model[i].model_type_ru;
            for (var j = 0; j < table_model[i].data.length; j++) {
                var table_c = document.getElementById('table_current_model').getElementsByTagName('tbody')[0];
                var new_row = table_c.insertRow(table_c.rows.length);
                new_row.appendChild(document.createElement("TH")).innerText = table_model[i].data[j].id;
                new_row.insertCell(1).innerText = table_model[i].data[j].value;
                new_row.insertCell(2).innerText = table_model[i].data[j].value_s;
            }
        }
    }
    $("#select_model_type_с").val(model_t);
    superTypeModel = model_t;
}
//-----------------------------------------

//----Редактирование модели по кнопке------
function editTable(type) {
    changeStateButtom(false, "btn_edit_model");
    $(function() {
        $('td').click(function(e) {
            var t = e.target || e.srcElement;
            var elm_name = t.tagName.toLowerCase();
            var countId = $(this).parent().children('th').text();
            var countIndex = $(this).index();
            if (elm_name == 'input') {
                return false;
            }
            // console.log($(this).index());
            console.log(type);
            var val = $(this).html();
            var code = '<input type="number" id="edit" value="' + val + '" />';
            $(this).empty().append(code);
            $('#edit').focus();
            $('#edit').blur(function() {
                var val = $(this).val();
                if(type =="Модель солнца"){
                    if(val >= 0 && val <= 80){
                        $(this).parent().empty().html(val);
                        editCurrentTable(countId, val, countIndex);
                    } else {
                        val = 0;
                        $(this).parent().empty().html(val);
                        editCurrentTable(countId, val, countIndex);
                        alert("НЕВЕРНОЕ ЗНАЧЕНИЕ! Введите значения в диапазоне от 0 до 80, включительно!");
                    }
                } else if(type =="Модель ветра"){
                    if(val >= 0 && val <= 80){
                        $(this).parent().empty().html(val);
                        editCurrentTable(countId, val, countIndex);
                    } else {
                        val = 0;
                        $(this).parent().empty().html(val);
                        editCurrentTable(countId, val, countIndex);
                        alert("НЕВЕРНОЕ ЗНАЧЕНИЕ! Введите значения в диапазоне от 0 до 80, включительно!");
                    }
                } else if(type =="Модель потребителя" ||
                          type =="Модель поставщика" ||
                          type =="Модель станции"    ){
                    if(val >= 0 && val <= 500){
                        $(this).parent().empty().html(val);
                        editCurrentTable(countId, val, countIndex);
                    } else {
                        val = 0;
                        $(this).parent().empty().html(val);
                        editCurrentTable(countId, val, countIndex);
                        alert("НЕВЕРНОЕ ЗНАЧЕНИЕ! Введите значения в диапазоне от 0 до 500, включительно!");
                    }

                }
            });
        });
    });
    $(window).keydown(function(event) { //Херня для таблицы II + Enter
        if (event.keyCode == 13) {
            $('#edit').blur();
        }
    });
}
//-----------------------------------------

//----Обновление данных вмодели------------
function editCurrentTable(id, val, pos) {
    for (var i = 0; i < table_model.length; i++) {
        if (table_model[i].model_name == $("#select_model").val()) {
            for (var j = 0; j < table_model[i].data.length; j++) {
                if (table_model[i].data[j].id == id) {
                    if (pos == 1) {
                        table_model[i].data[j].value = val;
                    } else {
                        table_model[i].data[j].value_s = val;
                    }
                    break;
                }
            }
        }
    }
}
//-----------------------------------------l

//----Удаление модели по кнопке--------
function deletTableModel() {
    changeStateButtom(false, "btn_delet_model");
    changeStateButtom(false, "btn_edit_model");
    var name = $("#select_model").val();
    for (var i = 0; i < table_model.length; i++) {
        if (name == table_model[i].model_name) {
            table_model.splice(i, 1);
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
        $('#select_model_type').append($("<option></option>").attr("value", modal_type[i].modelName_ru).text(modal_type[i].modelName_ru));
    }
}

function getModelType() {
    var name = $("#select_model_type").val();
    for (var i = 0; i < modal_type.length; i++) {
        if (name == modal_type[i].modelName_ru) {
            return modal_type[i].modelName;
        }
    }
}
//-----------------------------------------

//----Создание и редактирование таблицы моделей--------
function createTableModel() {
    var new_name = $("#create_model").val();
    for (var i = 0; i < table_model.length; i++) {
        if (table_model[i].model_name == new_name) {
            $("#form_create_model").attr("class", "form-group has-error");
            return false;
        }
    }
    $("#form_create_model").attr("class", "form-group has-success");
    changeStateButtom(false, "btn_create_model");
    changeStateButtom(true, "btn_add_model");
    initTable(new_name);
    console.log("test");
}

function initTable(n_m) {
    $("#table_model_body tr").remove();
    for (var j = 0; j < 24; j++) {
        var table_c = document.getElementById('table_current_model').getElementsByTagName('tbody')[0];
        var new_row = table_c.insertRow(table_c.rows.length);
        new_row.appendChild(document.createElement("TH")).innerText = j;
        new_row.insertCell(1).innerText = 0;
        new_row.insertCell(2).innerText = 0;
    } 
    editTable($('#select_model_type').val());
}
//-----------------------------------------
function editTableS() {
    editTable(superTypeModel);
}

//----Добавлние таблицы модели в коллекцию--------
function addTableModel() {
    changeStateButtom(true, "btn_create_model");
    changeStateButtom(false, "btn_add_model");
    $("#form_create_model").attr("class", "form-group");
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
        model_type_ru: "",
        data: []
    };
    model_object.model_id = newObject;
    model_object.model_name = newObject;
    model_object.model_type_ru = $("#select_model_type").val();
    model_object.model_type = getModelType();
    model_object.data = getTableData($("#table_current_model  > tbody"));
    table_model.push(model_object);
}

function getTableData(table) {
    var data = [];
    table.find('tr').each(function(rowIndex, r) {
        var data_model = {
            id: "",
            value: "",
            value_s: ""
        };
        $(this).find('th,td').each(function(colIndlex, c) {
            if (colIndlex == 0) {
                data_model.id = c.textContent;
            }
            if (colIndlex == 1) {
                data_model.value = c.textContent;
            }
            if (colIndlex == 2) {
                data_model.value_s = c.textContent;
            }
        });
        data.push(data_model);
    });
    return data;
}
//-----------------------------------------

//----Сохранение коллекции моделей на сервере--------
function saveСhangesModel() {
    saveData("modelCollections", JSON.stringify(table_model));
    alert("Настройки моделей сохранены!");
}
//-----------------------------------------

//----Отмена внесенных изменений--------
function discardChangesModel() {
    $("#table_model_body tr").remove();
    loadData("modelCollections", loadModel);
    loadData("modelCollections", updateSelectModel);
    alert("Настройки моделей восстановлены до ранее сохраненного состояния!");
}
//-----------------------------------------
//-----------------------------------------


//----ИГРОВЫЕ НАСТРОЙКИ-----------
//----Кэширование данных--------
function lodaGameSettings(data) {
    game_model = data;
    loadState();
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
        if (data[i].model_type == "sol_model") {
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
    game_model.sunModel = $("#inputSolModel").val();
    game_model.windModel = $("#inputWindModel").val();
    if(game_model.gameSpeed >= 5 && game_model.gameSpeed <= 60){
        saveData("gameSettings", JSON.stringify(game_model));
        alert("Настройки игры сохранены!");
    } else {
        $("#inputSpeed").val(5);
        game_model.gameSpeed = $("#inputSpeed").val();
        alert("НЕВЕРНОЕ ЗНАЧЕНИЕ! Введите значения скорости игры в диапазоне от 5 до 60, включительно!");
    }
    
}
//-----------------------------------------

//----Отмена изменений--------
function discardChangesSettings() {
    updateFormSettings(game_model);
    alert("Настройки игры восстановлены до ранее сохраненного состояния!");
}
//-----------------------------------------
//-----------------------------------------

//----ЭТО МОЖНО СДЕЛАТЬ ПОДРУГОМУ--------
//----Обновить окно--------
function allModalBS() {
    for (var i = 0; i < id_modal.length; i++) {
        $("#" + id_modal[i]).on('show.bs.modal', function() {
            updateCustomSelect(this.id, getCurrentModel(this.id));
        });
        saveForBtn(id_modal[i]);
        discardForBtn(id_modal[i]);
    }
}
//-----------------------------------------


//----Объекты и их настройки---------------
//----Кэширование данных-------------------
function lodaObject(data) {
    object_model = data;
}
//-----------------------------------------

//----Обновить селектор--------
function updateCustomSelect(formId, data) {
    $("#" + formId).find(".form-control").children("option").remove();
    for (var i = 0; i < table_model.length; i++) {
        if (table_model[i].model_type == data.object_type) {
            $("#" + formId).find(".form-control").append($("<option></option>").attr("value", table_model[i].model_name).text(table_model[i].model_name));
        }
    }
    $("#" + formId).find(".form-control").val(data.table_model);
    console.log(data.table_model);
    changeCustomToggle(formId, data.active);
    blokSelect(formId, game.game_state);
}
//-----------------------------------------

//----выствавить галку---------------------
function changeCustomToggle(formId, state) {
    $("#" + formId).find("input").prop('checked', state).change();
}
//-----------------------------------------

//----Сохранить настройки---------
function saveForBtn(formId) {
    $("#" + formId).find(".modal-footer").find(".btn.btn-success").click(function() {
        for (var i = 0; i < object_model.length; i++) {
            if (object_model[i].object_id == formId) {
                object_model[i].table_model = $("#" + formId).find(".form-control").val();
                object_model[i].active = $("#" + formId).find("input").prop('checked');
                saveData("objectCollections", JSON.stringify(object_model));
                alert("Настройки объекта сохранены!");
            }
        }
    });
}

//----Отменить настройки---------
function discardForBtn(formId) {
    $("#" + formId).find(".modal-footer").find(".btn.btn-default").click(function() {
        updateCustomSelect(formId, getCurrentModel(formId));
        alert("Настройки объекта восстановлены до ранее сохраненного состояния!");
    });
}
//-----------------------------------------

//----блокировка выбора модели---------
function blokSelect(formId, isStart) {
    if (isStart) {
        $("#" + formId).find(".form-control").attr("disabled", "disabled");
    } else {
        $("#" + formId).find(".form-control").removeAttr("disabled");
    }
}
//-----------------------------------------

//----Поиск модели по id---------
function getCurrentModel(formId) {
    for (var i = 0; i < object_model.length; i++) {
        if (object_model[i].object_id == formId) {
            return object_model[i];
        }
    }
}
//-----------------------------------------

//----Выпилить все настройки игры---------
var rdTimer = 0;

function reload() {
    console.log("Reload");
    loadData("modelCollections", loadModel);
    loadData("gameSettings", lodaGameSettings);
    loadData("objectCollections", lodaObject);
    clearTimeout(rdTimer);
    alert("Выполнено восстановление настроек системы!");
}

$("#resetBTN").click(function() {
    var dat = {
        "reset": true
    };
    saveData("resetDefault", JSON.stringify(dat));
    rdTimer = setTimeout(reload, 2500);
});
//-----------------------------------------

//-----Работа c печеньками-----------------
//-----------------------------------------

function writeCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
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
//-----------------------------------------

//-----Работа c экономическими печеньками--
//-----------------------------------------
function updateSelectEconomy() {
    $("#select_econom_model option").remove();
    for (var i = 0; i < object_model.length; i++) {
        $('#select_econom_model').append($("<option></option>").attr("value", object_model[i].object_name).text(object_model[i].object_name));
    }
    $('#select_econom_model').val(" ");
}
//-----------------------------------------
