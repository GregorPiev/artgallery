applArt.service('DataService', function ($http) {
    this.read = function (url, callback) {
        console.info("%cURL:" + url, "color:indigo;");
        $http({
            method: 'POST',
            url: '../project1/data/' + url + '.json',
            headers: {'Content-type': 'application/json'}
        }).then(function success(response) {
//console.table(response);
            callback(response);
        }, function error() {
//console.debug('Error');
        });
    };
    this.add = function (data, callback) {
        //console.info("Save: " + JSON.stringify(data));
        var postdata = {
            op: "add",
            data: data
        };
        var req = {
            method: 'POST',
            url: '../project1/php/api.php',
            data: JSON.stringify(postdata),
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Origin': '*'

            }
        };
        $http(req).then(function (resp) {
            console.debug("%cSuccess: " + JSON.stringify(resp), "color:orange;");
            callback(resp);
        }, function (resp) {
            console.error("%cError:" + JSON.stringify(resp), "color:#f00;");
            callback(resp);
        });
    };

    this.addContPict = function (data, pict, callback) {
        //console.info("Save: " + JSON.stringify(data));
        var postdata = {
            op: "addPict",
            data: data
        };
        var req = {
            method: 'POST',
            url: '../project1/php/api.php',
            data: {
                cont: JSON.stringify(postdata),
                pict: pict
            },
            headers: {
                'Content-type': 'undefined',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Origin': '*'

            }
        };
        $http(req).then(function (resp) {
            console.debug("%cSuccess: " + JSON.stringify(resp), "color:orange;");
            callback(resp);
        }, function (resp) {
            console.error("%cError:" + JSON.stringify(resp), "color:#f00;");
            callback(resp);
        });
    };


    this.getPageValues = function (data, callback) {
        //console.info("%cData Post:" + JSON.stringify(data), "color:green;");
        var postdata = {
            op: "page",
            data: data
        };
        var req = {
            method: 'POST',
            url: '../project1/php/api.php',
            data: JSON.stringify(postdata),
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Origin': '*'

            }
        };
        $http(req).then(function (resp) {
            //console.debug("%cSuccess: " + JSON.stringify(resp), "color:orange;");
            callback(resp);
        }, function (resp) {
            console.error("%cError:" + JSON.stringify(resp), "color:#f00;");
            callback(resp);
        });
    };
    this.getListValues = function (data, callback) {
        var postdata = {
            op: "list",
            data: data
        };
        var req = {
            method: 'POST',
            url: '../project1/php/api.php',
            data: JSON.stringify(postdata),
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Origin': '*'

            }
        };
        $http(req).then(function (resp) {
            //console.debug("%cSuccess: " + JSON.stringify(resp), "color:orange;");
            callback(resp);
        }, function (resp) {
            //console.error("%cError:" + JSON.stringify(resp), "color:#f00;");
            callback(resp);
        });
    };

    this.delete = function (data, callback) {
        var postdata = {
            op: "delete",
            data: data
        };
        var req = {
            method: 'POST',
            url: '../project1/php/api.php',
            data: JSON.stringify(postdata),
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Origin': '*'

            }
        };
        $http(req).then(function (resp) {
            //console.debug("%cSuccess: " + JSON.stringify(resp), "color:orange;");
            callback(resp);
        }, function (resp) {
            //console.error("%cError:" + JSON.stringify(resp), "color:#f00;");
            callback(resp);
        });
    };
});
