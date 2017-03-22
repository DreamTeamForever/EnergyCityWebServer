//----Глобальные переменные и все такое---
var graphTimer = 0; //Таймер
loadData("testGraphData",testGraph); //для теста
var cy; //= cytoscape(settignsGraph);
var layout;
var positonCrap;
var zoomCrap;
var timerSP = 0;

//-----------------------------------------
function testGraph(data) {
    graphData = data;
    forGraphOnly();
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
    //layout.stop();
    var collection = cy.elements();
    cy.remove( collection );
    collection = getDataGraph();
    cy.add(collection);
    layout = cy.makeLayout({ name: 'dagre' });
    // console.log(JSON.stringify(cy.pan()));
    // console.log(JSON.stringify(cy.zoom()));
    layout.start();
    // console.log("-----------------------");
    //cy.zoom(setPos());
    //cy.pan();
    cy.zoom(zoomCrap);
    cy.pan(positonCrap);
    // console.log(JSON.stringify(cy.pan()));
    // console.log(JSON.stringify(cy.zoom()));
};
//-----------------------------------------

//------НЕПОЯНТНАЯ ХЕРНЯ ГРАФА-----
function forGraphOnly() {
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
    layout = cy.makeLayout({ name: 'dagre' });
    layout.run();
    positonCrap = cy.pan();
    cy.userPanningEnabled(true);
    //console.log(cy.userPanningEnabled());
    timerSP = setInterval('savePos()',250);

    var selectedNodeHandler = function(evt) {
        $("#edge-operation").hide();
        $("#node-operation").show();
        var target = evt.cyTarget;
        console.log('select ' + target.id(), target);
        $("#graph_name").text("График потребления '" + target.data('label') + "'")
        $("#selected").text("Selected:" + target.id());
        setIdObjectChart(target.id());
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
    cy.on('tap', function(event){
        var evtTarget = event.cyTarget;
        if( evtTarget === cy ){
            console.log('tap on background');
        } else {
            console.log('tap on some element');
        }
    });
}

function savePos(){
    positonCrap = cy.pan();
    zoomCrap = cy.zoom();
    // console.log("POS "+JSON.stringify(positonCrap));
    // console.log("ZOOM "+JSON.stringify(zoomCrap));
}
//-----------------------------------------
