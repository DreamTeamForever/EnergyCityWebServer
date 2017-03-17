//----Глобальные переменные и все такое----
var dataChart; //Данные для построения графика
var chartTimer = 0; //Таймер
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
    lineColors: ['green', 'red']
});
//-----------------------------------------

//-------СЕКТОР ПРИЗ-----------------------
Morris.Donut({
    element: 'morris-donut-sun',
    data: [{
        label: "Ligth",
        value: 12
    }, {
        label: "Dark",
        value: 45
    }],
    resize: true
});

Morris.Donut({
    element: 'morris-donut-wind',
    data: [{
        label: "Power",
        value: 12
    }, {
        label: "Brizz",
        value: 30
    }],
    resize: true,
    colors: [
        '#0BA462',
        '#39B580',
        '#67C69D',
        '#95D7BB'
    ],
});
//-----------------------------------------

//----загрузка данных----------------------
function loadChart(data) {
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
