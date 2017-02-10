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
    $("#cy-container").height(win.innerHeight() - 130);
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
          'width': 100,
          'height': 100,
          'content': 'data(text)',
          //          'text-opacity': 0.5,
          'text-valign': 'center',
          'color': 'white',
          'background-color': nodeOptions.normal.bgColor,
          'text-outline-width': 1,
          'text-outline-color': '#222'
        }
      },

      {
        selector: 'edge',
        style: {
          'width': 10,
          'target-arrow-shape': 'triangle',
          'line-color': 'data(color)',
          'target-arrow-color': '#9dbaea'
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
      }
    ],

    elements: {
    nodes: [
      { data: { id: 'factory', text: 'Фабрика' } },
      { data: { id: 'hospital', text: 'Госпиталь' } },
      { data: { id: 'district', text: 'Микрорайон' } },
      { data: { id: 'diesel_power', text: 'Дизель генератор' } },
      { data: { id: 'wind_power', text: 'Ветряк' } },
      { data: { id: 'sun_power', text: 'Солнечная батарея' } },
      { data: { id: 'electric_substaion', text: 'Электрическая станция' } },
      { data: { id: 'mini_electric_substaion', text: 'Электрическая подстанция' } }
    ],

    edges: [
      { data: { id: 'diesel_power_electric_substaion', weight: 1, color: '#74E883',  source: 'diesel_power', target: 'electric_substaion' } },
      { data: { id: 'sun_power_electric_substaion', weight: 2, color: '#74E883',  source: 'sun_power', target: 'electric_substaion' } },
      { data: { id: 'wind_power_electric_substaion', weight: 3, color: '#74E883',  source: 'wind_power', target: 'electric_substaion' } },
      { data: { id: 'electric_substaion_factory', weight: 4, color: '#E8747C',  source: 'electric_substaion', target: 'factory' } },
      { data: { id: 'electric_substaion_district', weight: 5, color: '#E8747C',  source: 'electric_substaion', target: 'district' } },
      { data: { id: 'electric_substaion_mini_electric_substaion', weight: 6, color: '#6FB1FC',  source: 'electric_substaion', target: 'mini_electric_substaion' } },
      { data: { id: 'mini_electric_substaion_hospital', weight: 7, color: '#E8747C',  source: 'mini_electric_substaion', target: 'hospital' } }
    ]
  }

    // elements: {
    //   //selectable: false,
    //   grabbable: false,
    //   nodes: [{
    //     data: {
    //       id: '0',
    //       text: 'abc'
    //     }
    //   }, {
    //     data: {
    //       id: '1',
    //       text: 'def'
    //     }
    //   }, {
    //     data: {
    //       id: '2',
    //       text: 'ghi'
    //     }
    //   }, {
    //     data: {
    //       id: '3',
    //       text: 'jkl'
    //     }
    //   }], // nodes
    //   edges: [{
    //       data: {
    //         color: '#f00',
    //         source: '0',
    //         target: '1'
    //       }
    //     }, {
    //       data: {
    //         color: '#f00',
    //         source: '1',
    //         target: '2'
    //       }
    //     }, {
    //       data: {
    //         color: '#f00',
    //         source: '2',
    //         target: '3'
    //       }
    //     }, {
    //       data: {
    //         color: '#f00',
    //         source: '0',
    //         target: '2'
    //       }
    //     }, {
    //       data: {
    //         color: '#000',
    //         source: '0',
    //         target: '3'
    //       }
    //     }, {
    //       data: {
    //         color: '#f00',
    //         source: '0',
    //         target: '3'
    //       }
    //     }] // edges
    // } // elements
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
    });
  });

}); // ready
