//----Глобальные переменные и все такое----
var dataChart; //Данные для построения графика
var chartTimer = 0; //Таймер
var magickC = 2.45;
var idObject = "1";
var chartTest = true;
loadData("dataChart", loadChart); //для теста
//-----------------------------------------

//----создание графика----
var chartMoris = Morris.Line({
    element: 'area-chart',
    data: dataChart,
    xkey: ['step'],
    ykeys: ['input', 'output'],
    labels: ['Реальное потребление/Эталонное выработка электроэнергии', 'Эталонное потребление/Реальная выработка электроэнергии'],
    fillOpacity: 0.6,
    hideHover: 'auto',
    behaveLikeLine: true,
    resize: true,
    parseTime: false,
    pointFillColors: ['#ffffff'],
    pointStrokeColors: ['grey'],
    lineColors: ['blue', 'orange']
    // lineColors: ['#1ab394', '#87d6c6']
});
//-----------------------------------------

//-------СЕКТОР ПРИЗ-----------------------
var dataAll = [ {"step":0,"incom":0},
                {"step":0,"incom":0},
                {"step":0,"incom":0},
                {"step":0,"incom":0}
];

//-----------------------------------------

//----загрузка данных----------------------
function loadChart(data) {
    //dataAll = data;
    dataChart = findObject(data);
    chartMoris.setData(dataChart);
}
//-----------------------------------------

//----обновление данных--------------------
function updateChart() {
    loadData("dataChart", loadChart);
    loadData("economicData", getEconomicData);
}
//-----------------------------------------

//----обновление данных по таймеру---------
function enableTimerCh(gameState, time) {
    if (gameState) {
        chartTimer = setInterval('updateChart()', time);
    } else {
        clearInterval(chartTimer);
    }
}

function setIdObjectChart(id) {
    idObject = id;
    updateChart();
}

function findObject(data) {
    var temp = data[0].object_data;
    for (var i = 0; i < data.length; i++) {
        if (data[i].object_id == idObject) {
            temp = data[i].object_data;
            break;
        }
    }
    return temp;
}
//-----------------------------------------

//-----------------------------------------

//----обновление данных по таймеру---------
function enableTimerCh(gameState, time) {
    if (gameState) {
        chartTimer = setInterval('updateChart()', time);
    } else {
        clearInterval(chartTimer);
    }
}

function setIdObjectChart(id) {
    idObject = id;
    updateChart();
}

function findObject(data) {
    var temp = data[0].object_data;
    for (var i = 0; i < data.length; i++) {
        if (data[i].object_id == idObject) {
            temp = data[i].object_data;
            break;
        }
    }
    return temp;
}
//-----------------------------------------

//-----------economy-----------------------
//-----------------------------------------
function changeEconomy() {
    var io =  findId($('#select_econom_model').val());
    chartEconomy.setData(findEcData(io));
}
//-----------------------------------------

//-----------------------------------------
function findId(name) {
    for (var i = 0; i < object_model.length; i++) {
        if(object_model[i].object_name == name){
            return object_model[i].object_id;
        }
    }
}
//-----------------------------------------

//-----------------------------------------
function findEcData(id) {
    for (var i = 0; i < dataAll.length; i++) {
        if(dataAll[i].object_id == id){
            return dataAll[i].object_data;
        }
    }
}
//-----------------------------------------

//-----------------------------------------
$('#econom_settings').on('show.bs.modal', function() {
    updateSelectEconomy();
    initChart();
});
//-----------------------------------------

//-----------------------------------------
function initChart() {
    if(chartTest){
        chartEconomy = Morris.Bar({
        element: 'area-chart-econom',
        data: dataAll,
        xkey: ['step'],
        ykeys: ['incom'],
        labels: ['Total'],
        fillOpacity: 0.6,
        hideHover: 'auto',
        behaveLikeLine: true,
        resize: true,
        parseTime: false,
        pointFillColors: ['#ffffff'],
        pointStrokeColors: ['blue'],
        lineColors: ['#1ab394', '#87d6c6']
        });
    }
    chartTest = false;
}
//-----------------------------------------

//-----------------------------------------
function getEconomicData(data) {
    dataAll = data.economic;
}
//-----------------------------------------

//-----------------------------------------

// gameTime
// economycData
