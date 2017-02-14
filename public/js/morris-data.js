// this requests the file and executes a callback with the parsed result once
//   it is available

$(function() {
    // var my_url = "http://www.json-generator.com/api/json/get/bVsmlpmmJK"
    // var json = (function() {
    //     var json = null;
    //     $.ajax({
    //         'async': true,
    //         'global': false,
    //         'url': my_url,
    //         'dataType': "json",
    //         'success': function(data) {
    //             json = data;
    //         }
    //     });
    //     return json;
    // })();

    // for (var i = 0; i < json.length; i++) {
    //     // for (var i in ) {
    //     if (object.hasOwnProperty(i)) {
    //         console.log(i);
    //         var tmp = JSON.parse(i);
    //         console.log(tmp);
    //     }
    // }
    // console.log(my_url);
    // Line Chart
    Morris.Line({
        // ID of the element in which to draw the chart.
        element: 'morris-line-chart',
        // Chart data records -- each entry in this array corresponds to a point on
        // the chart.
        //url = http://www.json-generator.com/api/json/get/bVsmlpmmJK?indent=2

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
});
