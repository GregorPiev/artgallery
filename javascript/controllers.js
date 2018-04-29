applArt.controller('ctrlHome', function ($scope, $http, srvHome) {
    srvHome.read(function (data) {
        //console.info("Result:" + JSON.stringify(data));
        var result = data.data;
        if (data.status == 200) {
            $scope.messages = result.content;
            $scope.gallery = result.gallery;
            $scope.newscollection = result.news;
        }
    });
    $scope.client = {fname: '', password: '', email: ''}
    $scope.sendVal = function () {
        alert(JSON.stringify($scope.client));
    };
});
applArt.controller('ctrlStory', ['$scope', '$http', 'srvStory', function ($scope, $http, srvStory) {
        srvStory.read(function (responce) {
            //console.info("Responce:" + JSON.stringify(responce));
            $scope.content_top = responce.data.content_top;
            $scope.content_bottom = responce.data.content_bottom;
            $scope.img = responce.data.img;
        });
    }]);

applArt.controller('ctrlFaq', ['$scope', '$http', 'srvFaq', function ($scope, $http, srvFaq) {
        srvFaq.read(function (responce) {
            console.info("Responce:" + JSON.stringify(responce));
            $scope.collection = responce.data;
        });
    }]);
applArt.controller('ctrlWork', ['$scope', '$http', 'DataService', function ($scope, $http, DataService) {
        DataService.read('mywork', function (data) {
            $scope.topic = data.data.topic;
            $scope.content = data.data.content;
            $scope.picture = data.data.picture;
            $scope.works = data.data.works;
        });
    }]);
applArt.controller('ctrlAfil', ['$scope', '$http', 'DataService', function ($scope, $http, DataService) {
        DataService.read('affiliate', function (data) {
            $scope.topic = data.data.topic;
            $scope.content = data.data.content;
            $scope.affiliates = data.data.affiliates;
        });
    }]);
applArt.controller('ctrlContact', ['$scope', '$http', 'DataService', function ($scope, $http, DataService) {
        DataService.read('contact', function (data) {
            console.table(data);
            $scope.topic = data.data.topic;
            $scope.content = data.data.content;
            $scope.picture = data.data.img;
        });

    }]);
applArt.controller('ctrlDonate', function ($scope, $http, DataService) {
    DataService.read('donate', function (data) {

        $scope.topic = data.data.topic;
        $scope.content = data.data.contane;
        $scope.countries = data.data.countries;
    });
    $scope.regions = [];
    $scope.regionspay = [];

//    $scope.getRegionsList = function (countryList) {
//        var choosedCountry = countryList.valueOf();
//        $http.get('data/regions.json').success(function (data) {
//            $.each(data, function (key, val) {
//                if (val.CountryName == choosedCountry) {
//                    $scope.regions = val.Regions;
//                }
//            });
//
//        });
//    }

    $scope.getRegionsList = function (countryList) {
        var choosedCountry = countryList.valueOf();
        DataService.read('regions', function (data) {

            $.each(data.data, function (key, val) {
                if (val.CountryName == choosedCountry) {
                    $scope.regions = val.Regions;
                    console.info("Country Name:" + val.CountryName);
                    console.info("Regions:" + val.Regions);
                    return false;
                }
            });
        });
    }



    $scope.getRegionsListPay = function (countryListPay) {
        var choosedCountryPay = countryListPay.valueOf();
        $http.get('data/regions.json').success(function (data) {
            $.each(data, function (key, val) {
                if (val.CountryName == choosedCountryPay) {
                    $scope.regionspay = val.Regions;
                }
            });
        });
    }



});

