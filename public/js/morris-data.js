//----Глобальные переменные и все такое----
var dataChart; //Данные для построения графика
var chartTimer = 0; //Таймер
var magickC = 2.45;
var idObject = "1";
loadData("dataChart", loadChart); //для теста
//-----------------------------------------

//----создание графика----
var chartMoris = Morris.Area({
    element: 'area-chart',
    data: dataChart,
    xkey: ['step'],
    ykeys: ['input', 'output'],
    labels: ['Total Income', 'Total Outcome'],
    fillOpacity: 0.6,
    hideHover: 'auto',
    behaveLikeLine: true,
    resize: true,
    parseTime: false,
    pointFillColors: ['#ffffff'],
    pointStrokeColors: ['blue'],
    lineColors: ['#1ab394', '#87d6c6']
});
//-----------------------------------------

//-------СЕКТОР ПРИЗ-----------------------
var dataAll = [{
        step: '2014',
        input: 50,
        output: 90
    },
    {
        step: '2015',
        input: 65,
        output: 75
    },
    {
        step: '2016',
        input: 50,
        output: 50
    },
    {
        step: '2024',
        input: 160,
        output: 95
    }
];

var chartEconomy = Morris.Bar({
    element: 'area-chart-econom',
    data: dataAll,
    xkey: ['step'],
    ykeys: ['input', 'output'],
    labels: ['Total Income', 'Total Outcome'],
    fillOpacity: 0.6,
    hideHover: 'auto',
    behaveLikeLine: true,
    resize: true,
    parseTime: false,
    pointFillColors: ['#ffffff'],
    pointStrokeColors: ['blue'],
    lineColors: ['#1ab394', '#87d6c6']
    // lineColors: ['green', 'red']
});


//-----------------------------------------

//----загрузка данных----------------------
function loadChart(data) {
    dataAll = data;
    dataChart = findObject(data);
    chartMoris.setData(dataChart);
}
//-----------------------------------------

//----обновление данных--------------------
function updateChart() {
    loadData("dataChart", loadChart);
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
    console.log(id);
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
    console.log(id);
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
// function updateEconomy(id){
//     var chto = [];
//     chto = preMagickNumber(updateidEconomy(id));
//   //  chartEconomy.setData(chto);
// }
//-----------------------------------------
// function updateidEconomy(id){
//     for (var i = 0; i < dataAll.length; i++) {
//         if(dataAll[i].object_id == id) {
//             return dataAll[i].object_data;
//         }
//     }
// }
//-----------------------------------------

//-----------economy----------------------
function changeEconomy() {
    var io =  findId($('#select_econom_model').val());
    console.log(io);
    var ttt = findEcData(io);
    chartEconomy.setData(preMagickNumber(ttt));
}
//-----------------------------------------
function findId(name) {
    for (var i = 0; i < object_model.length; i++) {
        if(object_model[i].object_name == name){
            return object_model[i].object_id;
        }
    }
}
//-----------------------------------------

function findEcData(id) {
    for (var i = 0; i < dataAll.length; i++) {
        if(dataAll[i].object_id == id){
            return datatAll[i].object_data;
        }
    }
}

function preMagickNumber(data) {
    for (var i = 0; i < data.length; i++) {
        data.input = Number(data.input)*magickC;
        data.output = Number(data.output)*magickC;
    }
    return data;
}