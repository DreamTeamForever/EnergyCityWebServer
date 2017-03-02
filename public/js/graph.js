//----Глобальные переменные и все такое---
var graphTimer = 0; //Таймер
loadData("testGraphData",testGraph); //для теста
var cy; //= cytoscape(settignsGraph);


//-----------------------------------------
function testGraph(data) {
    graphData = data;
    function_name();
}

//----обновление данных--------------------
function updateGraph() {
    loadData("testGraphData",loadGr);
}
//-----------------------------------------

//----обновление данных по таймеру---------
function enableTimerGp(gameState,time) {
    if(gameState){
        graphTimer = setInterval('updateGraph()',time);
    } else {
        clearInterval(graphTimer);
    }
}
//-----------------------------------------

//----загрузка данных----------------------
function loadGr(data) {   
    graphData = data;
    //cy.collection(getDataGraph());

    function_name();
    //cy.add(graphData);
};
//-----------------------------------------

//------НЕПОЯНТНАЯ ХЕРНЯ ГРАФА-----
//$(function() {
function function_name() {


var win = $(window);

win.resize(function() {
    resize();
});

function resize() {
    console.log(win.height(), win.innerHeight());
    $("#cy-container").height(win.innerHeight() / 2.0); // - 130);
    cy.resize();
}

setTimeout(resize, 0);
cy = cytoscape(getSettingsGraph());
console.log(cy.elements());
var collection = cy.elements();
//edges1 = collection.group('edges');
console.log(cy.edges());
// console.log(collection[0].data());
cy.remove( collection );

collection = getDataGraph();
// console.log(collection);
// cy.collection(collection);
cy.add(collection);
// cy.elements().layout({ name: 'grid' });
var layout = cy.makeLayout({ name: 'dagre' });

layout.run();
console.log(cy.edges());
// console.log(cy.elements());
// collection = cy.elements();
// console.log(collection[0].data());
//cy.reset();
//setTimeout(resize, 0);
// var edgesss = graphData.edges;
// console.log("1");
// cy.add(collection);
// console.log("2");
// cy.add(edgesss);
// console.log("3");
// var syleGrah = getStyleGraph();
// cy.add(syleGrah);
// cy.add(graphData);

// var nodeOptions = {
//     normal: {
//         bgColor: 'grey'
//     },
//     selected: {
//         bgColor: 'yellow'
//     }
// };

// var edgeOptions = {
//     selected: {
//         lineColor: 'yellow'
//     }
// };


    //console.log("Test graph: "+ JSON.stringify(cy.json()));
// cy = cytoscape(
//     {
//     container: document.getElementById('cy'),
//     autoungrabify: true,
//     minZoom: 0.5,
//     maxZoom: 10,
//     wheelSensitivity: 0.1,
//     layout: { name: 'dagre'},
//     style: [{
//                 selector: 'node',
//                 style: { 'width': 60, 'height': 60, 'content': 'data(label)', 'text-valign': 'top', 'color': '#1ab394', 'background-fit': 'cover', 'border-color': '#000', 'border-width': 5, 'border-opacity': 0.5 }
//             },
//             {
//                 selector: 'edge',
//                 style: { 'width': 3, 'target-arrow-shape': 'triangle', 'line-color': 'data(color)', 'target-arrow-color': 'data(color)' }
//             },
//             {
//                 selector: ':selected',
//                 style: { 'background-color': 'yellow', 'line-color': 'yellow', 'target-arrow-color': 'black', 'source-arrow-color': 'black' }
//             },
//             {
//                 selector: 'edge:selected',
//                 style: { 'width': 20 }
//             },

//             {
//                 selector: 'node[type = "stick"]',
//                 style: { 'width': 6, 'height': 6 }
//             },
//             {
//                 selector: 'node[type = "factory"]',
//                 style: { 'background-image': 'image/factory.jpg'}
//             },
//             {
//                 selector: 'node[type = "accumulate"]',
//                 style: { 'background-image': 'image/accamulator.jpg' }
//             },
//             {
//                 selector: 'node[type = "hospital"]',
//                 style: {'background-image': 'image/hospital.jpg' }
//             },
//             {
//                 selector: 'node[type = "district"]',
//                 style: { 'background-image': 'image/district.jpg' }
//             },
//             {
//                 selector: 'node[type = "disel"]',
//                 style: { 'background-image': 'image/diesel.jpg' }
//             },
//             {
//                 selector: 'node[type = "wind"]',
//                 style: { 'background-image': 'image/wind.jpg' }
//             },
//             {
//                 selector: 'node[type = "sun"]',
//                 style: { 'background-image': 'image/solar.jpg' }
//             },
//             {
//                 selector: 'node[type = "electric_substaion"]',
//                 style: { 'background-image': 'image/electric.jpg' }
//             },
//             {
//                 selector: 'node[type = "mini_electric_substaion"]',
//                 style: { 'background-image': 'image/electric.jpg' }
//             },
//             {
//                 selector: 'node[type = "stick"]',
//                 style: { 'background-image': 'image/stcik.png' }
//             },
//             {
//                 selector: '#electric_substaion',
//                 style: { 'background-image': 'image/electric.jpg' }
//             }
//         ],
//     elements: graphData
// });

var selectedNodeHandler = function(evt) {
    console.log("asd");
    $("#edge-operation").hide();
    $("#node-operation").show();
    var target = evt.cyTarget;
    console.log('select ' + target.id(), target);
    $("#selected").text("Selected:" + target.id());
}

var unselectedHandler = function(evt) {
    $("#edge-operation").hide();
    $("#node-operation").hide();
}

var selectedEdgeHandler = function(evt) {
    $("#edge-operation").show();
    $("#node-operation").hide();
    var target = evt.cyTarget;
    console.log('tapped ' + target.id(), target);
    $("#selected").text("Selected:" + target.id());
}

cy.on('select', 'node', selectedNodeHandler);
cy.on('unselect', 'node', unselectedHandler);
cy.on('select', 'edge', selectedEdgeHandler);
cy.on('unselect', 'edge', unselectedHandler);


// function addSelectHandler() {
//     cy.on('select', 'node', function(evt) {
//         console.log('select node:', evt.cyTarget);
//         evt.cyTarget.animate({
//             style: {
//                 'background-color': nodeOptions.selected.bgColor
//             }
//         }, {
//             duration: 100
//         });
//     });
//     cy.on('unselect', 'node', function(evt) {
//         console.log('unselect node:', evt.cyTarget);
//         evt.cyTarget.stop();
//         evt.cyTarget.style({
//             'background-color': nodeOptions.normal.bgColor
//         });
//     });
//     cy.on('select', 'edge', function(evt) {
//         console.log('select edge:', evt.cyTarget);
//         evt.cyTarget.animate({
//             style: {
//                 'line-color': edgeOptions.selected.lineColor
//             }
//         }, {
//             duration: 100
//         });
//     });
//     cy.on('unselect', 'edge', function(evt) {
//         console.log('unselect edge:', evt.cyTarget);
//         evt.cyTarget.stop();
//         evt.cyTarget.style({
//             'line-color': evt.cyTarget.data('color')
//         });
//     });
// }

// $("#fit").click(function() {
//     console.log('cy=', cy);
//     cy.fit();
// });

// $("#layout").click(function() {
//     console.log('cy=', cy);
//     cy.layout({
//         name: 'dagre'
//     });
// });

}
// });
//-----------------------------------------
