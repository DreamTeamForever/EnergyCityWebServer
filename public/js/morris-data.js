var dataChart;

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

function loadChart(data) {
    dataChart = data[0].object_data;
    chartMoris.setData(dataChart);
}

loadData("dataChart",loadChart);

//setInterval(update, 100);  врубить потом когда надо будет /потом вырубить



// function loadChart(data) {
//     dataChart = data[0].object_data;
//     morisData = {
//         element: 'morris-area-chart',
//         data: dataChart,
//         xkey: 'step',
//         ykeys: ['input','output'],
//         labels: ['потребление','поставка'],
//         smooth: false,
//         resize: true
//     };
//     Morris.Line(morisData);
// }

// loadData("dataChart",loadChart);

// $(function() {

//     Morris.Line();
// });

// function loadChart(data) {
//     dataChart = data[0].object_data;
//     var data =  dataChart,
//                 config = {
//                   data: data,
//                   xkey: ['step'],
//                   ykeys: ['input', 'output'],
//                   labels: ['Total Income', 'Total Outcome'],
//                   fillOpacity: 0.6,
//                   hideHover: 'auto',
//                   behaveLikeLine: true,
//                   resize: true,
//                   parseTime: false,
//                   pointFillColors:['#ffffff'],
//                   pointStrokeColors: ['blue'],
//                   lineColors:['green','red']
//                 };
//     config.element = 'area-chart';
//     Morris.Area(config);
// }
// loadData("dataChart",loadChart);

