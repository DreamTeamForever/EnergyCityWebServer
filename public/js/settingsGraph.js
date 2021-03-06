//----Глобальные переменные и все такое---
var graphData; //данные для графа
//-----------------------------------------

//----Первоначальная настройка графа-------
function getSettingsGraph() {
    var settignsGraph = {
        container: document.getElementById('cy'),
        autoungrabify: true,
        minZoom: 0.3,
        maxZoom: 2,
        wheelSensitivity: 0.1,
        style: [{
                selector: 'node',
                style: {
                    'width': 100,
                    'height': 100,
                    'content': 'data(label)',
                    'text-valign': 'top',
                    'color': '#1ab394',
                    'border-color': 'data(color_node)', //'#1ab394',
                    'background-fit': 'cover',
                    'border-width': 13,
                    'border-opacity': 0.5
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 3,
                    'target-arrow-shape': 'triangle',
                    'line-color': 'data(color)',
                    'target-arrow-color': 'data(color)'
                }
            },
            {
                selector: ':selected',
                style: {
                    'background-color': 'yellow',
                    'line-color': 'yellow',
                    'target-arrow-color': 'black',
                    'source-arrow-color': 'black'
                }
            },
            {
                selector: 'node:selected',
                style: {
                    'width': 120,
                    'height': 120,
                    'border-color': 'yellow'
                }
            },
            {
                selector: 'node[type = "stick"]',
                style: {
                    'width': 3,
                    'height': 3
                }
            },
            {
                selector: 'node[type = "factory"]',
                style: {
                    'background-image': 'image/factory.jpg'
                }
            },
            {
                selector: 'node[type = "accumulate"]',
                style: {
                    'background-image': 'image/accamulator.jpg'
                }
            },
            {
                selector: 'node[type = "hospital"]',
                style: {
                    'background-image': 'image/hospital.jpg'
                }
            },
            {
                selector: 'node[type = "district"]',
                style: {
                    'background-image': 'image/district.jpg'
                }
            },
            {
                selector: 'node[type = "disel"]',
                style: {
                    'background-image': 'image/diesel.jpg'
                }
            },
            {
                selector: 'node[type = "wind"]',
                style: {
                    'background-image': 'image/wind.jpg'
                }
            },
            {
                selector: 'node[type = "sun"]',
                style: {
                    'background-image': 'image/solar.jpg'
                }
            },
            {
                selector: 'node[type = "electric_substaion"]',
                style: {
                    'background-image': 'image/electric.jpg'
                }
            },
            {
                selector: 'node[type = "mini_electric_substaion"]',
                style: {
                    'background-image': 'image/electric.jpg'
                }
            },
            {
                selector: '#electric_substaion',
                style: {
                    'background-image': 'image/electric.jpg'
                }
            }
        ],
        elements: graphData
    };
    return settignsGraph;
}
//-----------------------------------------

//----Подготовка новых данных для графа----
function getDataGraph() {
    var collD = [];
    for (var i = 0; i < graphData.nodes.length; i++) {
        var dataG = {
            group: "",
            data: ""
        };
        dataG.group = "nodes";
        dataG.data = graphData.nodes[i].data;
        collD.push(dataG);
    }
    for (var i = 0; i < graphData.edges.length; i++) {
        var dataG = {
            group: "",
            data: ""
        };
        dataG.group = "edges";
        dataG.data = graphData.edges[i].data;
        collD.push(dataG);
    }

    return collD;
}
//-----------------------------------------
