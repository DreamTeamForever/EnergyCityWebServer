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
var dataAll;

// var chartEconomy = Morris.Bar({
//     element: 'area-chart-econom',
//     data: dataAll,
//     xkey: ['step'],
//     ykeys: ['input', 'output'],
//     labels: ['Total Income', 'Total Outcome'],
//     fillOpacity: 0.6,
//     hideHover: 'auto',
//     behaveLikeLine: true,
//     resize: true,
//     parseTime: false,
//     pointFillColors: ['#ffffff'],
//     pointStrokeColors: ['blue'],
//     lineColors: ['#1ab394', '#87d6c6']
// });


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
    // console.log(id);
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
    // console.log(id);
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
   // console.log(io);
   // console.log(dataAll);
    //console.log(findEcData(io));
    var countFor = findEcData(io);
    //console.log(ttt);
    chartEconomy.setData(dataAll[countFor].object_data);
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
    var temp5;
    for (var i = 0; i < dataAll.length; i++) {
	// console.log(dataAll[i].object_id);
        if(dataAll[i].object_id == id){
            temp5 = i;
	    //console.log(dataAll[i].object_data);
	    //console.log(temp5);
        }
    }
    return temp5;
}

function preMagickNumber(data) {
    for (var i = 0; i < data.length; i++) {
        data.input = data.input*magickC;
        data.output = data.output*magickC;
    }
    // console.log(data);
    return data;
}

$('#econom_settings').on('show.bs.modal', function() {
    updateSelectEconomy();
    testTest_te();
});

var rpTimer = 0;

function forReload() {
    clearTimeout(rdTimer);
}

function testTest_te() {
    rpTimer = setTimeout(forReload, 200);
    chartEconomy = Morris.Bar({
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
    });
}

// gameTime
// economycData