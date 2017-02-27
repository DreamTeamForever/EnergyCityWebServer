//----Глобальные переменные и все такое----
var dataChart; //Данные для построения графика
var chartTimer = 0; //Таймер
loadData("dataChart",loadChart); //для теста
//-----------------------------------------

//----создание графика----
var chartMoris = Morris.Area({
    element : 'area-chart',
    data: dataChart,
    xkey: ['step'],
    ykeys: ['input', 'output'],
    labels: ['Total Income', 'Total Outcome'],
    fillOpacity: 0.6,
    hideHover: 'auto',
    behaveLikeLine: true,
    resize: true,
    parseTime: false,
    pointFillColors:['#ffffff'],
    pointStrokeColors: ['blue'],
    lineColors:['green','red']
});
//-----------------------------------------

//----загрузка данных----------------------
function loadChart(data) {
    dataChart = data[0].object_data;
    chartMoris.setData(dataChart);
}
//-----------------------------------------

//----обновление данных--------------------
function updateChart() {
    loadData("dataChart",loadChart);
}
//-----------------------------------------

//----обновление данных по таймеру---------
function enableTimerCh(gameState,time) {
    if(gameState){
        chartTimer = setInterval('updateChart()',time);
    } else {
        clearInterval(chartTimer);
    }
}
//-----------------------------------------
