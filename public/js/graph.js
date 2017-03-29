//----Глобальные переменные и все такое---
var graphTimer = 0; //Таймер
loadData("testGraphData", testGraph); //для теста
var cy; //= cytoscape(settignsGraph);
var layout;
var positonCrap;
var zoomCrap;
var timerSP = 0;
var currentNodeId = 0;
//-----------------------------------------
function testGraph(data) {
    graphData = data;
    forGraphOnly();
}

//----обновление данных--------------------
function updateGraph() {
    loadData("testGraphData", loadGr);
}
//-----------------------------------------

//----обновление данных по таймеру---------
function enableTimerGp(gameState, time) {
    if (gameState) {
        graphTimer = setInterval('updateGraph()', time);
    } else {
        clearInterval(graphTimer);
    }
}
//-----------------------------------------

//----загрузка данных----------------------
function loadGr(data) {
    graphData = data;
    var collection = cy.elements();
    cy.remove(collection);
    collection = getDataGraph();
    cy.add(collection);
    layout = cy.makeLayout({
        name: 'breadthfirst',
        roots: ["MS_001"], //, "SS_001"],
        spacingFactor: 1.0
    });
    layout.start();
    cy.zoom(zoomCrap);
    cy.pan(positonCrap);
    cy.$("#" + currentNodeId).select();
};
//-----------------------------------------

//------НЕПОЯНТНАЯ ХЕРНЯ ГРАФА-----
function forGraphOnly() {
    var win = $(window);
    win.resize(function() {
        resize();
    });

    function resize() {
        $("#cy-container").height(win.innerHeight() / 2.0); // - 130);
        cy.resize();
    }

    setTimeout(resize, 0);

    cy = cytoscape(getSettingsGraph());
    layout = cy.makeLayout({
        name: 'breadthfirst',
        roots: ["MS_001"], //, "SS_001"],
        spacingFactor: 1.0
    });
    layout.run();
    positonCrap = cy.pan();
    cy.userPanningEnabled(true);
    cy.zoom(0.3);
    timerSP = setInterval('savePos()', 250);

    var selectedNodeHandler = function(evt) {
        $("#edge-operation").hide();
        $("#node-operation").show();
        var target = evt.cyTarget;
        if (target.data('label') != "") {
            $("#graph_name").text("График потребления '" + target.data('label') + "'");
            setIdObjectChart(target.id());
        }
        $("#selected").text("Selected:" + target.id());
        currentNodeId = target.id();
    }

    var unselectedHandler = function(evt) {
        $("#edge-operation").hide();
        $("#node-operation").hide();
    }

    var selectedEdgeHandler = function(evt) {
        $("#edge-operation").show();
        $("#node-operation").hide();
        var target = evt.cyTarget;
        $("#selected").text("Selected:" + target.id());
    }

    cy.on('select', 'node', selectedNodeHandler);
    cy.on('unselect', 'node', unselectedHandler);
    cy.on('select', 'edge', selectedEdgeHandler);
    cy.on('unselect', 'edge', unselectedHandler);
}

function savePos() {
    positonCrap = cy.pan();
    zoomCrap = cy.zoom();
}
//-----------------------------------------
