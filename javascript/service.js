applArt.service('srvHome', function ($http) {
    this.read = function (callback) {
        $http({
            method: "Post",
            url: "../project1/data/home.json",
            headers: {
                'Content-type': "application/json"
            }
        }).then(function succsessFunction(responce) {
            //console.info("Result:" + JSON.stringify(responce));
            callback(responce)
        }, function errorFunction(responce) {
            alert("Error");
            service.debug("Error:" + JSON.stringify(responce));
        });
    };
});

applArt.service('srvStory', function ($http) {
    this.read = function (callback) {
        $http({
            method: 'POST',
            url: '../project1/data/story.json',
            headers: {'Content-type': 'application/json'}
        }).then(function succes(responce) {
            callback(responce);
        }, function error(responce) {
            alert('Error');
        });
    };
});

applArt.service('srvFaq', function ($http) {
    this.read = function (callback) {
        $http({
            method: 'POST',
            url: '../project1/data/faq.json',
            headers: {'Content-type': 'application/json'}
        }).then(function success(responce) {
            callback(responce);
        }, function error() {
            alert("Error");
        });
    };
});
applArt.service('DataService', function ($http) {
    this.read = function (url, callback) {
        $http({
            method: 'POST',
            url: '../project1/data/' + url + '.json',
            headers: {'Content-type': 'application/json'}
        }).then(function success(response) {
            console.table(response);
            callback(response);
        }, function error() {
            console.debug('Error');
        });
    }
});