// Morris.js Charts sample data for Городская энергитическия система template

$(function() {

    // Area Chart
    Morris.Area({
        element: 'morris-area-chart',
        data: [{
            period: '2015 Q1',
            gas: 2666,
            heat: null,
            energy: 2647
        }, {
            period: '2015 Q2',
            gas: 2778,
            heat: 2294,
            energy: 2441
        }, {
            period: '2015 Q3',
            gas: 4912,
            heat: 1969,
            energy: 2501
        }, {
            period: '2015 Q4',
            gas: 3767,
            heat: 3597,
            energy: 5689
        }, {
            period: '2016 Q1',
            gas: 6810,
            heat: 1914,
            energy: 2293
        }, {
            period: '2016 Q2',
            gas: 5670,
            heat: 4293,
            energy: 1881
        }, {
            period: '2016 Q3',
            gas: 4820,
            heat: 3795,
            energy: 1588
        }, {
            period: '2016 Q4',
            gas: 15073,
            heat: 5967,
            energy: 5175
        }, {
            period: '2017 Q1',
            gas: 10687,
            heat: 4460,
            energy: 2028
        }, {
            period: '2017 Q2',
            gas: 8432,
            heat: 5713,
            energy: 1791
        }],
        xkey: 'period',
        ykeys: ['gas', 'heat', 'energy'],
        labels: ['Газ', 'Тепло', 'Электричество'],
        pointSize: 4,
        hideHover: 'auto',
        resize: true,
        lineColors: ['#87d6c6', '#54cdb4','#1ab394'],
        lineWidth:2,
        pointSize:1,
    });

    // Donut Chart
    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "Download Sales",
            value: 12
        }, {
            label: "In-Store Sales",
            value: 30
        }, {
            label: "Mail-Order Sales",
            value: 20
        }],
        resize: true
    });

    // Line Chart
    Morris.Line({
        // ID of the element in which to draw the chart.
        element: 'morris-line-chart',
        // Chart data records -- each entry in this array corresponds to a point on
        // the chart.
        data: [{
            d: '2017-10-01',
            visits: 802
        }, {
            d: '2017-10-02',
            visits: 783
        }, {
            d: '2017-10-03',
            visits: 820
        }, {
            d: '2017-10-04',
            visits: 839
        }, {
            d: '2017-10-05',
            visits: 792
        }, {
            d: '2017-10-06',
            visits: 859
        }, {
            d: '2017-10-07',
            visits: 790
        }, {
            d: '2017-10-08',
            visits: 1680
        }, {
            d: '2017-10-09',
            visits: 1592
        }, {
            d: '2017-10-10',
            visits: 1420
        }, {
            d: '2017-10-11',
            visits: 882
        }, {
            d: '2017-10-12',
            visits: 889
        }, {
            d: '2017-10-13',
            visits: 819
        }, {
            d: '2017-10-14',
            visits: 849
        }, {
            d: '2017-10-15',
            visits: 870
        }, {
            d: '2017-10-16',
            visits: 1063
        }, {
            d: '2017-10-17',
            visits: 1192
        }, {
            d: '2017-10-18',
            visits: 1224
        }, {
            d: '2017-10-19',
            visits: 1329
        }, {
            d: '2017-10-20',
            visits: 1329
        }, {
            d: '2017-10-21',
            visits: 1239
        }, {
            d: '2017-10-22',
            visits: 1190
        }, {
            d: '2017-10-23',
            visits: 1312
        }, {
            d: '2017-10-24',
            visits: 1293
        }, {
            d: '2017-10-25',
            visits: 1283
        }, {
            d: '2017-10-26',
            visits: 1248
        }, {
            d: '2017-10-27',
            visits: 1323
        }, {
            d: '2017-10-28',
            visits: 1390
        }, {
            d: '2017-10-29',
            visits: 1420
        }, {
            d: '2017-10-30',
            visits: 1529
        }, {
            d: '2017-10-31',
            visits: 1892
        }, ],
        // The name of the data record attribute that contains x-visitss.
        xkey: 'd',
        // A list of names of data record attributes that contain y-visitss.
        ykeys: ['visits'],
        // Labels for the ykeys -- will be displayed when you hover over the
        // chart.
        labels: ['Visits'],
        // Disables line smoothing
        smooth: false,
        resize: true
    });

    // Bar Chart
    Morris.Bar({
        element: 'morris-bar-chart',
        data: [{
            device: 'gas',
            geekbench: 136
        }, {
            device: 'gas 3G',
            geekbench: 137
        }, {
            device: 'gas 3GS',
            geekbench: 275
        }, {
            device: 'gas 4',
            geekbench: 380
        }, {
            device: 'gas 4S',
            geekbench: 655
        }, {
            device: 'gas 5',
            geekbench: 1571
        }],
        xkey: 'device',
        ykeys: ['geekbench'],
        labels: ['Geekbench'],
        barRatio: 0.4,
        xLabelAngle: 35,
        hideHover: 'auto',
        resize: true
    });


});

