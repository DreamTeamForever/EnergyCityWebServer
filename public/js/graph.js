/* cytoscape js selector demo
moved to http://codepen.io/yeoupooh/pen/BjWvRa
 */
$(function() {

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

    var nodeOptions = {
        normal: {
            bgColor: 'grey'
        },
        selected: {
            bgColor: 'yellow'
        }
    };

    var edgeOptions = {
        selected: {
            lineColor: 'yellow'
        }
    };

    var cy = window.cy = cytoscape({
        container: document.getElementById('cy'),

        minZoom: 0.1,
        maxZoom: 100,
        wheelSensitivity: 0.1,

        // panningEnabled: false,
        //boxSelectionEnabled: true,
        //autounselectify: false,
        //selectionType: 'additive',
        //autoungrabify: true,

        layout: {
            name: 'dagre'
        },

        style: [{
                selector: 'node',
                style: {
                    'width': 60,
                    'height': 60,
                    'content': 'data(label)',
                    // 'text-opacity': 0.5,
                    'text-valign': 'top',
                    'color': '#1ab394',
                    // 'background-color': nodeOptions.normal.bgColor,
                    // 'text-outline-width': 1,
                    // 'text-outline-color': '#222'
                    'background-fit': 'cover',
                    'border-color': '#000',
                    'border-width': 5,
                    'border-opacity': 0.5
                }
            },

            {
                selector: 'edge',
                style: {
                    'width': 3,
                    'target-arrow-shape': 'triangle',
                    'line-color': 'data(color)',
                    'target-arrow-color': 'data(color)', //'#9dbaea',
                    // 'curve-style': 'bezier'
                }
            },

            {
                selector: ':selected',
                style: {
                    'background-color': 'yellow',
                    'line-color': 'yellow',
                    'target-arrow-color': 'black',
                    'source-arrow-color': 'black',
                }
            },

            {
                selector: 'edge:selected',
                style: {
                    'width': 20
                }
            },

            {
                selector: 'node[type = "stick"]',
                style: {
                    'width': 6,
                    'height': 6,
                }
            },
            {
                selector: 'node[type = "factory"]',
                style: {
                    'background-image': 'https://farm8.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg',
                }
            },
            {
                selector: 'node[type = "accumulate"]',
                style: {
                    'background-image': 'https://farm8.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg',
                }
            },
            {
                selector: 'node[type = "hospital"]',
                style: {
                    'background-image': 'https://farm8.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg',
                }
            },
            {
                selector: 'node[type = "district"]',
                style: {
                    'background-image': 'https://farm8.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg',
                }
            },
            {
                selector: 'node[type = "diesel_power"]',
                style: {
                    'background-image': 'https://farm8.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg',
                }
            },
            {
                selector: 'node[type = "wind_power"]',
                style: {
                    'background-image': 'https://farm8.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg',
                }
            },
            {
                selector: 'node[type = "sun_power"]',
                style: {
                    'background-image': 'https://farm8.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg',
                }
            },
            {
                selector: 'node[type = "electric_substaion"]',
                style: {
                    'background-image': 'https://farm8.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg',
                }
            },
            {
                selector: 'node[type = "mini_electric_substaion"]',
                style: {
                    'background-image': 'https://farm8.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg',
                }
            },
            {
                selector: 'node[type = "stick"]',
                style: {
                    'background-image': 'https://farm8.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg',
                }
            },
            {
                selector: '#electric_substaion',
                style: {
                    'background-image': 'https://farm8.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg',
                }
            }
        ],

        elements: {
            nodes: [
                // { data: { id: 'factory', label: 'Фабрика' } },
                // { data: { id: 'hospital', label: 'Госпиталь' } },
                // { data: { id: 'district', label: 'Микрорайон' } },
                // { data: { id: 'diesel_power', label: 'Дизель генератор' } },
                // { data: { id: 'wind_power', label: 'Ветряк' } },
                // { data: { id: 'sun_power', label: 'Солнечная батарея' } },
                // { data: { id: 'electric_substaion', label: 'Электрическая станция' } },
                // { data: { id: 'stolby', label: '' } },
                // { data: { id: 'mini_electric_substaion', label: 'Электрическая подстанция' } }
                {
                    data: {
                        id: 'factory_0',
                        label: 'Фабрика #1',
                        type: 'factory'
                    }
                },
                {
                    data: {
                        id: 'factory_1',
                        label: 'Фабрика #2',
                        type: 'factory'
                    }
                },
                {
                    data: {
                        id: 'accumulate_0',
                        label: 'Электрический аккумулятор #1',
                        type: 'accumulate'
                    }
                },
                {
                    data: {
                        id: 'accumulate_1',
                        label: 'Электрический аккумулятор #2',
                        type: 'accumulate'
                    }
                },
                {
                    data: {
                        id: 'accumulate_2',
                        label: 'Электрический аккумулятор #3',
                        type: 'accumulate'
                    }
                },
                {
                    data: {
                        id: 'hospital_0',
                        label: 'Госпиталь #1',
                        type: 'hospital'
                    }
                },
                {
                    data: {
                        id: 'hospital_1',
                        label: 'Госпиталь #2',
                        type: 'hospital'
                    }
                },
                {
                    data: {
                        id: 'district_0',
                        label: 'Микрорайон #1',
                        type: 'district'
                    }
                },
                {
                    data: {
                        id: 'district_1',
                        label: 'Микрорайон #2',
                        type: 'district'
                    }
                },
                {
                    data: {
                        id: 'district_2',
                        label: 'Микрорайон #3',
                        type: 'district'
                    }
                },
                {
                    data: {
                        id: 'district_3',
                        label: 'Микрорайон #4',
                        type: 'district'
                    }
                },
                {
                    data: {
                        id: 'district_4',
                        label: 'Микрорайон #5',
                        type: 'district'
                    }
                },
                {
                    data: {
                        id: 'district_5',
                        label: 'Микрорайон #6',
                        type: 'district'
                    }
                },
                {
                    data: {
                        id: 'diesel_power_0',
                        label: 'Дизель генератор #1',
                        type: 'disel'
                    }
                },
                {
                    data: {
                        id: 'diesel_power_1',
                        label: 'Дизель генератор #2',
                        type: 'disel'
                    }
                },
                {
                    data: {
                        id: 'diesel_power_2',
                        label: 'Дизель генератор #3',
                        type: 'disel'
                    }
                },
                {
                    data: {
                        id: 'wind_power_0',
                        label: 'Ветрогенератор',
                        type: 'wind'
                    }
                },
                {
                    data: {
                        id: 'sun_power_0',
                        label: 'Солнечная батарея',
                        type: 'sun'
                    }
                },
                {
                    data: {
                        id: 'electric_substaion_0',
                        label: 'Электрическая станция',
                        type: 'electric_substaion'
                    }
                },
                {
                    data: {
                        id: 'mini_electric_substaion_0',
                        label: 'Электрическая подстанция',
                        type: 'mini_electric_substaion'
                    }
                },
                {
                    data: {
                        id: 'stick_0',
                        label: '',
                        type: 'stick'
                    }
                },
                {
                    data: {
                        id: 'stick_1',
                        label: '',
                        type: 'stick'
                    }
                },
                {
                    data: {
                        id: 'stick_2',
                        label: '',
                        type: 'stick'
                    }
                },
                {
                    data: {
                        id: 'stick_3',
                        label: '',
                        type: 'stick'
                    }
                },
                {
                    data: {
                        id: 'stick_4',
                        label: '',
                        type: 'stick'
                    }
                },
                {
                    data: {
                        id: 'stick_5',
                        label: '',
                        type: 'stick'
                    }
                }
            ],

            edges: [
                // { data: { id: 'diesel_power_electric_substaion', weight: 1, color: '#74E883',  source: 'diesel_power', target: 'electric_substaion' } },
                // { data: { id: 'sun_power_electric_substaion', weight: 2, color: '#74E883',  source: 'sun_power', target: 'electric_substaion' } },
                // { data: { id: 'wind_power_electric_substaion', weight: 3, color: '#74E883',  source: 'wind_power', target: 'electric_substaion' } },
                // { data: { id: 'electric_substaion_factory', weight: 4, color: '#E8747C',  source: 'electric_substaion', target: 'factory' } },
                // { data: { id: 'electric_substaion_district', weight: 5, color: '#E8747C',  source: 'electric_substaion', target: 'district' } },
                // { data: { id: 'electric_substaion_mini_electric_substaion', weight: 6, color: '#6FB1FC',  source: 'electric_substaion', target: 'mini_electric_substaion' } },
                // { data: { id: 'mini_electric_substaion_hospital', weight: 7, color: '#E8747C',  source: 'mini_electric_substaion', target: 'hospital' } }
                {
                    data: {
                        id: 'diesel_power_0_stick_0',
                        weight: 126,
                        color: '#74E883',
                        source: 'diesel_power_0',
                        target: 'stick_0'
                    }
                },
                {
                    data: {
                        id: 'diesel_power_1_stick_0',
                        weight: 135,
                        color: '#74E883',
                        source: 'diesel_power_1',
                        target: 'stick_0'
                    }
                },
                {
                    data: {
                        id: 'diesel_power_2_stick_0',
                        weight: 144,
                        color: '#74E883',
                        source: 'diesel_power_2',
                        target: 'stick_0'
                    }
                },

                {
                    data: {
                        id: 'accumulate_0_stick_3',
                        weight: 27,
                        color: '#74E883',
                        source: 'accumulate_0',
                        target: 'stick_3'
                    }
                },
                {
                    data: {
                        id: 'accumulate_1_stick_3',
                        weight: 36,
                        color: '#74E883',
                        source: 'accumulate_1',
                        target: 'stick_3'
                    }
                },
                {
                    data: {
                        id: 'accumulate_2_stick_3',
                        weight: 45,
                        color: '#74E883',
                        source: 'accumulate_2',
                        target: 'stick_3'
                    }
                },

                {
                    data: {
                        id: 'stick_0_stick_5',
                        weight: 45,
                        color: '#74E883',
                        source: 'stick_0',
                        target: 'stick_5'
                    }
                },
                {
                    data: {
                        id: 'stick_3_stick_5',
                        weight: 46,
                        color: '#74E883',
                        source: 'stick_3',
                        target: 'stick_5'
                    }
                },


                {
                    data: {
                        id: 'wind_power_0_stick_4',
                        weight: 151,
                        color: '#74E883',
                        source: 'wind_power_0',
                        target: 'stick_4'
                    }
                },
                {
                    data: {
                        id: 'sun_power_0_stick_4',
                        weight: 160,
                        color: '#74E883',
                        source: 'sun_power_0',
                        target: 'stick_4'
                    }
                },

                // { data: { id: 'stick_0_electric_substaion_0', weight: 188, color: '#74E883',  source: 'stick_0', target: 'electric_substaion_0' } },
                {
                    data: {
                        id: 'stick_1_electric_substaion_0',
                        weight: 10,
                        color: '#E8747C',
                        source: 'stick_1',
                        target: 'electric_substaion_0'
                    }
                },
                {
                    data: {
                        id: 'stick_2_electric_substaion_0',
                        weight: 11,
                        color: '#E8747C',
                        source: 'stick_2',
                        target: 'electric_substaion_0'
                    }
                },
                {
                    data: {
                        id: 'stick_4_electric_substaion_0',
                        weight: 12,
                        color: '#74E883',
                        source: 'stick_4',
                        target: 'electric_substaion_0'
                    }
                },
                {
                    data: {
                        id: 'stick_5_electric_substaion_0',
                        weight: 13,
                        color: '#74E883',
                        source: 'stick_5',
                        target: 'electric_substaion_0'
                    }
                },

                {
                    data: {
                        id: 'stick_1_district_0',
                        weight: 198,
                        color: '#E8747C',
                        source: 'stick_1',
                        target: 'district_0'
                    }
                },
                {
                    data: {
                        id: 'stick_1_district_1',
                        weight: 193,
                        color: '#E8747C',
                        source: 'stick_1',
                        target: 'district_1'
                    }
                },
                {
                    data: {
                        id: 'stick_1_district_2',
                        weight: 194,
                        color: '#E8747C',
                        source: 'stick_1',
                        target: 'district_2'
                    }
                },
                {
                    data: {
                        id: 'stick_2_district_3',
                        weight: 195,
                        color: '#E8747C',
                        source: 'stick_2',
                        target: 'district_3'
                    }
                },
                {
                    data: {
                        id: 'stick_2_district_4',
                        weight: 196,
                        color: '#E8747C',
                        source: 'stick_2',
                        target: 'district_4'
                    }
                },
                {
                    data: {
                        id: 'stick_2_district_5',
                        weight: 197,
                        color: '#E8747C',
                        source: 'stick_2',
                        target: 'district_5'
                    }
                },

                {
                    data: {
                        id: 'electric_substaion_0_hospital_0',
                        weight: 165,
                        color: '#E8747C',
                        source: 'electric_substaion_0',
                        target: 'hospital_0'
                    }
                },
                {
                    data: {
                        id: 'electric_substaion_0_hospital_1',
                        weight: 166,
                        color: '#E8747C',
                        source: 'electric_substaion_0',
                        target: 'hospital_1'
                    }
                },

                {
                    data: {
                        id: 'electric_substaion_0_mini_electric_substaion_0',
                        weight: 170,
                        color: '#6FB1FC',
                        source: 'electric_substaion_0',
                        target: 'mini_electric_substaion_0'
                    }
                },

                {
                    data: {
                        id: 'mini_electric_substaion_0_factory_0',
                        weight: 172,
                        color: '#E8747C',
                        source: 'mini_electric_substaion_0',
                        target: 'factory_0'
                    }
                },
                {
                    data: {
                        id: 'mini_electric_substaion_0_factory_1',
                        weight: 173,
                        color: '#E8747C',
                        source: 'mini_electric_substaion_0',
                        target: 'factory_1'
                    }
                },
                {
                    data: {
                        id: 'mini_electric_substaion_0_hospital_0',
                        weight: 174,
                        color: '#E8747C',
                        source: 'mini_electric_substaion_0',
                        target: 'hospital_0'
                    }
                },
                {
                    data: {
                        id: 'mini_electric_substaion_0_hospital_1',
                        weight: 175,
                        color: '#E8747C',
                        source: 'mini_electric_substaion_0',
                        target: 'hospital_1'
                    }
                }
            ],
        }

        // elements: {
        //   //selectable: false,
        //   grabbable: false,
    }); // cytoscape



    var selectedNodeHandler = function(evt) {
        //console.log(evt.data); // 'bar'

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

    // NOTE: Use selector(':selected') instead of event handler
    function addSelectHandler() {
        cy.on('select', 'node', function(evt) {
            console.log('select node:', evt.cyTarget);
            evt.cyTarget.animate({
                style: {
                    'background-color': nodeOptions.selected.bgColor
                }
            }, {
                duration: 100
            });
        });
        cy.on('unselect', 'node', function(evt) {
            console.log('unselect node:', evt.cyTarget);
            evt.cyTarget.stop();
            evt.cyTarget.style({
                'background-color': nodeOptions.normal.bgColor
            });
        });
        cy.on('select', 'edge', function(evt) {
            console.log('select edge:', evt.cyTarget);
            evt.cyTarget.animate({
                style: {
                    'line-color': edgeOptions.selected.lineColor
                }
            }, {
                duration: 100
            });
        });
        cy.on('unselect', 'edge', function(evt) {
            console.log('unselect edge:', evt.cyTarget);
            evt.cyTarget.stop();
            evt.cyTarget.style({
                'line-color': evt.cyTarget.data('color')
            });
        });
    }

    $("#fit").click(function() {
        console.log('cy=', cy);
        cy.fit();
    });

    $("#layout").click(function() {
        console.log('cy=', cy);
        cy.layout({
            name: 'dagre'
            // name: 'random'
        });
    });

}); // ready
