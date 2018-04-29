applArt.config(function ($stateProvider, $urlRouterProvider) {
    /*Error 404*/
    $urlRouterProvider.otherwise('/');
    //console.log("Config start");
    $stateProvider.state('Home', {
        url: '/',
        views: {
            'slider': {
                templateUrl: 'partials/slider.html'
            },
            'content': {
                controller: 'ctrlHome',
                templateUrl: 'content/home.html'
            }
        }
    }).state('Mystory', {
        url: '/mystory',
        views: {
            'slider': {templteUrl: 'content/slider_empty.html'},
            'content': {
                controller: 'ctrlStory',
                templateUrl: 'content/mystory.html'
            }
        }
    }).state('faqpage', {
        url: '/faqpage',
        views: {
            'slider': {templateUrl: 'content/slider_empty.html'},
            'content': {
                controller: 'ctrlFaq',
                templateUrl: 'content/faqpage.html'
            }
        }
    }).state('myworks', {
        url: '/myworks',
        views: {
            'slider': {templateUrl: 'content/slider_empty.html'},
            'content': {
                controller: 'ctrlWork',
                templateUrl: 'content/mywork.html'
            }
        }
    }).state('Affiliate', {
        url: '/Affiliate',
        views: {
            'slider': {templateUrl: 'content/slider_empty.html'},
            'content': {
                controller: 'ctrlAfil',
                templateUrl: 'content/affiliate.html'
            }
        }
    }).state('Donate', {
        url: "/donate",
        views: {
            'slider': {templateUrl: 'content/slider_empty.html'},
            'content': {
                controller: 'ctrlDonate',
                templateUrl: 'content/donate.html'
            }
        }
    }).state('Artisans', {
        url: "/Artisans",
        views: {
            'slider': {templateUrl: 'content/slider_empty.html'},
            'content': {
                controller: 'ctrlArtisans',
                templateUrl: 'content/artisans.html'
            }
        }
    }).state('Artisanwork', {
        url: "/Artisanwork/:artisanId",
        views: {
            'slider': {templateUrl: 'content/slider_empty.html'},
            'content': {
                controller: 'ctrlArtisanwork',
                templateUrl: 'content/artisans-work.html'
            }
        }
    }).state('Listofregistered', {
        url: '/Listofregistered',
        views: {
            slider: {templateUrl: 'content/slider_empty.html'},
            content: {
                controller: 'ctrlListofregistered',
                templateUrl: 'content/ListOfRegistered.html'
            }
        }
    }).state('contactus', {
        url: '/contactus',
        views: {
            slider: {templateUrl: 'content/slider_empty.html'},
            content: {
                controller: 'ctrlContact',
                templateUrl: 'content/contact.html'
            }
        }
    });
});