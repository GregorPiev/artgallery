'use strict';
applArt.controller('topParrent', function ($scope) {
    $scope.$on("menuChange", function (event, data) {
        $scope.activeManu = data;
    });
    $scope.$on("marque", function (event, data) {
        var stateMarque = $('#marquee').data('state');
        if (typeof stateMarque != 'undefined') {
            $('#marquee').vTicker(data);
        }
    });
    $scope.setActiveMenu = function (itemMenu) {
        return (itemMenu == $scope.activeManu) ? 'active' : '';
    }
});
/**
 *
 */
applArt.controller('ctrlTopMenu', function ($scope) {
    $scope.activetMarque = function (data) {
        $scope.$emit('marque', data);
    };
});
/**
 *
 */
applArt.controller('ctrlHome', ['$scope', '$http', 'DataService', function ($scope, $http, DataService) {
        $scope.$emit('menuChange', 'Home');
        DataService.read('home', function (data) {
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
    }]);
/**
 *
 */
applArt.controller('ctrlStory', ['$scope', '$http', 'DataService', function ($scope, $http, DataService) {
        $scope.$emit('menuChange', 'About');
        DataService.read('story', function (responce) {
            //console.info("Responce:" + JSON.stringify(responce));
            $scope.content_top = responce.data.content_top;
            $scope.content_bottom = responce.data.content_bottom;
            $scope.img = responce.data.img;
        });
    }]);
/**
 *
 */
applArt.controller('ctrlFaq', ['$scope', '$http', 'DataService', function ($scope, $http, DataService) {
        $scope.$emit('menuChange', 'About');
        DataService.read('faq', function (responce) {
            //console.info("Responce:" + JSON.stringify(responce));
            $scope.collection = responce.data;
        });
    }]);
/**
 *
 */
applArt.controller('ctrlWork', ['$scope', '$http', 'DataService', function ($scope, $http, DataService) {
        $scope.$emit('menuChange', 'MyWork');
        DataService.read('mywork', function (data) {
            $scope.topic = data.data.topic;
            $scope.content = data.data.content;
            $scope.picture = data.data.picture;
            $scope.works = data.data.works;
        });
    }]);
/**
 *
 */
applArt.controller('ctrlAfil', ['$scope', '$http', 'DataService', function ($scope, $http, DataService) {
        $scope.$emit('menuChange', 'Affiliate');
        DataService.read('affiliate', function (data) {
            $scope.topic = data.data.topic;
            $scope.content = data.data.content;
            $scope.affiliates = data.data.affiliates;
        });
    }]);
/**
 *
 */
applArt.controller('ctrlContact', ['$scope', '$http', 'DataService', function ($scope, $http, DataService) {
        $scope.$emit('menuChange', 'Contact');
        DataService.read('contact', function (data) {
            //console.table(data);
            $scope.topic = data.data.topic;
            $scope.content = data.data.content;
            $scope.picture = data.data.img;
        });

    }]);
/**
 *
 */
applArt.controller('ctrlArtisans', ['$scope', '$http', 'DataService', function ($scope, $http, DataService) {
        //console.log("%c ctrl Artisans", "color:blue;");
        $scope.$emit('menuChange', 'Artisans');
        DataService.read('artisans', function (data) {
            $scope.topic = data.data.topic;
            $scope.content = data.data.content;
            $scope.picture = data.data.picture;

            $('#artisansList').dataTable({

                "sDom": 'T<"clear">lfrtip',
//                "oTableTools": {
//                    "sSwfPath": "lib/tabletools/swf/copy_csv_xls_pdf.swf",
//                    "aButtons": [
//                        {
//                            "sExtends": "pdf",
//                            "sButtonText": "Save as PDF"
//                        },
//                        {
//                            "sExtends": "xls",
//                            "sButtonText": "Save for Excel"
//                        }
//                    ]
//                },
                "bDestroy": true,
                "bLengthChange": true,
                "bAutoWidth": false,
                "aaData": data.data.artisans,
                "aaSorting": [[1, "desc"]],
                "aoColumns": [
                    {"mData": "artisanId", "sTitle": "Artisan Id", "bVisible": false},
                    {"mData": "fullname", "sTitle": "Full Name", "sClass": "columnX center",
                        "mRender": function (data, type, row) {
                            //console.log("%cFullname:" + JSON.stringify(row), "color:green;");
                            return "<a href='/project1/#/Artisanwork/" + row.artisanId + "' data-art='" + JSON.stringify(row) + "'>" + row.fullname + "</a>";
                        }
                    },
                    {"mData": "data", "sTitle": "Registration Date", "sClass": "columnX center"},
                    {"mData": "quintity", "sTitle": "Quintity Items", "sType": "numeric", "sClass": "columnX center"}
                ],
                "fnFooterCallback": function (nRow, aaData, iStart, iEnd, aiDisplay) {
                    var sumArtisWorks = 0;
                    for (var i = 0; i < aiDisplay.length; i++) {
                        sumArtisWorks += parseFloat(aaData[aiDisplay[i]]['quintity']);
                    }
                    $("#artQuint").text(sumArtisWorks);
                }
            });


        });
    }]);
/**
 *
 */
applArt.controller('ctrlArtisanwork', ['$scope', '$http', '$stateParams', '$state', 'DataService', function ($scope, $http, $stateParams, $state, DataService) {
        //console.log("%c ctrl Artisanwork", "color:blue;");
        var artisanId = $stateParams.artisanId;
        //console.log("%c ctrl ArtisanWork=> artisanId: " + artisanId, "color:blue;");
        var worklist;
        $scope.$emit('menuChange', 'Artisanwork');

        DataService.read('artisanwork', function (data) {
            $scope.artlist = data.data.artisans;
            angular.forEach(data.data.artisans, function (value, key) {
                if (value.artisanId == artisanId) {
                    //console.log("%cArtisan Value:" + JSON.stringify(value), "color:brown;");
                    $scope.topic = data.data.topic + ":" + value.fullname;
                    $scope.content = value.description;
                    $scope.picture = value.picture;
                    worklist = value.works;
                }
            });

            $scope.changeArtisan = function (artisanId) {
                $state.go('Artisanwork', {artisanId});
            }

            $('#artisansWorksList').dataTable({

                "sDom": 'T<"clear">lfrtip',
                "bDestroy": true,
                "bLengthChange": true,
                "bAutoWidth": false,
                "aaData": worklist,
                "aaSorting": [[0, "asc"]],
                "aoColumns": [
                    {"mData": "title", "sTitle": "Title", "sClass": "columnX center",
                        "mRender": function (data, type, row) {
                            return "<a href='javascript:void(0)' class='artbut' data-toggle='modal' data-target='#workModal' data-art='" + JSON.stringify(row) + "' >" + row.title + "</a>";
                        }
                    },
                    {"mData": "description", "sTitle": "Description", "sClass": "columnX center"},
                    {"mData": "picture", "sTitle": "Picture", "sClass": "columnX center",
                        "mRender": function (data, type, row) {
                            return "<img src='" + row.picture + "' width='25'>";
                        }
                    },
                    {"mData": null, "sTitle": "View", "sClass": "columnX center",
                        "mRender": function (data, type, row) {
                            return "<button type='button' class='artbut btn btn-info btn-sm' data-toggle='modal' data-target='#workModal' data-art='" + JSON.stringify(row) + "'>View</button>";
                        }
                    }

                ],
                "fnFooterCallback": function (nRow, aaData, iStart, iEnd, aiDisplay) {
                    var sumArtisWorks = 0;
                    for (var i = 0; i < aiDisplay.length; i++) {
                        sumArtisWorks++;
                    }
                    $("#artQuint").text(sumArtisWorks);
                }
            });


        });
    }]);
/**
 *
 */
applArt.controller('ctrlDonate', function ($scope, $http, DataService) {
    $scope.$emit('menuChange', 'Donate');
    DataService.read('donate', function (data) {

        $scope.topic = data.data.topic;
        $scope.content = data.data.contane;
        $scope.countries = data.data.countries;
    });
    $scope.regions = [];
    $scope.regionspay = [];

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
/**
 *
 */
applArt.controller('SignCtrl', ['$scope', '$location', 'Upload', function ($scope, $location, Upload) {
        $scope.sendVal = function (file) {
            let client = {fname: '', short: '', description: '', email: ''};
            let pfname = $scope.client.fname;
            let pshort = $scope.client.short;
            let pdescription = $scope.client.description;
            let pemail = $scope.client.email;
            console.log("%cName:" + pfname + "\nShort:" + pshort + "\nDescription:" + pdescription + "\nEmail:" + pemail, "color:brown; font-size:14px;");

            file.upload = Upload.upload({
                method: 'POST',
                url: '../project1/php/api-upload.php',
                data: {
                    op: 'addResign',
                    fname: pfname,
                    short: pshort,
                    description: pdescription,
                    email: pemail,
                    file: file
                }
            });

            file.upload.then(function (data) {
                console.debug("%cSuccess: " + data, "color:orange;");
                client = {fname: '', short: '', description: '', email: ''};
                angular.element("#closeButton").trigger("click");
                if (data.data.code == 1) {
                    $location.path('/Listofregistered');
                } else {
                    alert(data.data.msg);
                    $location.path('/contactus');
                }
            }, function (resp) {
                console.log('%cError status: ' + resp.status, "color:#f00;");
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            }
            );

        };
    }]);
/**
 *
 */
applArt.controller('ctrlListofregistered', ['$scope', '$http', 'DataService', function ($scope, $http, DataService) {
        //console.log("%cctrlListOfRegistered", "color:blue;");
        $scope.$emit('menuChange', 'Listofregistered');
        var reqdata1 = {idpage: 1, table: 'pages'};
        $scope.regitem = {idart: 0, fullname: '', short: '', description: '', email: '', picture: ''};
        $scope.regitem = {};
        DataService.getPageValues(reqdata1, function (data) {
            //console.debug("%cData: " + JSON.stringify(data.data.data), "color:green;");
            $scope.topic = data.data.data.topic;
            $scope.content = data.data.data.content;
            $scope.picture = data.data.data.picture;
        });

        var reqdata2 = {id: 0, idname: 'idart', table: 'artisans'};
        DataService.getListValues(reqdata2, function (data) {
            //console.debug("%cData: " + JSON.stringify(data.data.data), "color:green;");
            $scope.showRegisteredTable(data.data.data);
        });

        $scope.showRegisteredTable = function (data) {
            $('#registeredList').dataTable({

                "sDom": 'T<"clear">lfrtip',
                "bDestroy": true,
                "bLengthChange": true,
                "bAutoWidth": false,
                "aaData": data,
                "aaSorting": [[1, "asc"]],
                "aoColumns": [
                    {"mData": "idart", "sTitle": "AId", "bVisible": false},
                    {"mData": "fullname", "sTitle": "Full Name", "sClass": "columnX center"},
                    {"mData": "short", "sTitle": "Short Description", "sClass": "columnX center"},
                    {"mData": "description", "sTitle": "Full Description", "sClass": "columnX center"},
                    {"mData": "email", "sTitle": "Email", "sClass": "columnX center"},
                    {"mData": "picture", "defaultContent": "", "sTitle": "Picture", "bSortable": false, "sClass": "columnX center", "bUseRendered": false,
                        "mRender": function (data, type, row) {
                            //console.log("%cPicture:" + row.picture, "color:navy;font-size:16px;");
                            if (row.picture != null) {
                                return "<img src='/project1/images/coll/" + row.picture + "' width='25'>";
                            }
                        }
                    },
                    {"mData": null, "sTitle": "Delete", "bSortable": false, "sClass": "columnX center", "bUseRendered": false,
                        "mRender": function (data, type, row) {
                            return "<a href='javascript:void(0)' class='btn  btn-primary btn-sm delrshuma' data-id='" + row.idart + "'>Delete</a>";
                        }
                    },
                    {"mData": null, "defaultContent": "", "sTitle": "Update", "bSortable": false, "sClass": "columnX center", "bUseRendered": false,
                        "mRender": function (data, type, row) {
                            return "<a href='javascript:void(0)' class='btn  btn-success btn-sm updshuma' data-row='" + JSON.stringify(row) + "'>Update</a>";
                        }
                    }
                ],
                "fnFooterCallback": function (nRow, aaData, iStart, iEnd, aiDisplay) {
                    var sumArtisWorks = 0;
                    for (var i = 0; i < aiDisplay.length; i++) {
                        sumArtisWorks++;
                    }
                    $("#artQuint").text(sumArtisWorks);
                }
            });

        };

        $('#registeredList').on('click', '.delrshuma', function () {
            let idArt = $(this).attr('data-id');
            $scope.deleteRshuma(idArt);
        });


        $('#registeredList').on('click', '.updshuma', function () {
            let regVal = JSON.parse($(this).attr('data-row'));
            //console.info("%cRegis Val:" + JSON.stringify(regVal), "color:blue;");

            $scope.$apply(function () {
                $scope.regitem = {idart: regVal.idart, fullname: regVal.fullname, short: regVal.short, description: regVal.description, email: regVal.email, pictur: regVal.picture};
                //console.info("%cRegItem 1: " + JSON.stringify($scope.regitem), "color:green;");
            });
            //console.info("%cRegItem 2: " + JSON.stringify($scope.regitem), "color:brown;");

            $("#popEdit").toggle('slow');
        });




        $scope.deleteRshuma = function (idart) {
            let reqdata = {table: "artisans", fieldname: "idart", id: idart}
            //console.log("%cDelete rshuma:" + JSON.stringify(reqdata), "color:olivie;");
            DataService.delete(reqdata, function (data) {
                //console.log("%cDelete rshuma result:" + JSON.stringify(data), "color:violet;");
                var reqdatalist = {id: 0, idname: 'idart', table: 'artisans'};
                DataService.getListValues(reqdatalist, function (data) {
                    //console.debug("%cData: " + JSON.stringify(data.data.data), "color:green;");
                    $scope.showRegisteredTable(data.data.data);
                });
            });
        };

        $scope.showPictOrInput = function (pict) {
            //console.log("%cPict:" + pict, "color:green;");
            var result = (pict != null) ? true : false;
            //console.log("%cResult:" + result, "color:brown;");
            return result;
        };

    }]);