$(function () {

    Parse.initialize("s4TbblXGlY9QDNtfMumutKwivNfu5f8RVpxZ20oR",
        "YnetlPvR1Lx4ibHZpAYd79cf2HxCnYYiqxQw66IE");


    var Menu = Parse.Object.extend('Menu');

    var Posts = Parse.Object.extend('Posts');

    var posts = new Posts();



    angular.module('myApp', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {

            $routeProvider
                .when('/menu', {
                    templateUrl: 'templates/menu.html',
                    controller: 'MyController',
                    controllerAs: 'vm'


                })
                .when('/post/:id', {
                    templateUrl: 'templates/post.html',
                    controller: 'DetailsController',
                    controllerAs: 'vm'
                })
                .when('/location', {
                    templateUrl: 'templates/location.html',
                    controller: 'LocationController',
                    controllerAs: 'vm'
                })

                .otherwise({ redirectTo: '/menu' })




        }])
        .factory('salads', ['$q', function ($q) {


            var queryObject = new Parse.Query(Menu);


            function getSalads() {
                var deferred = $q.defer();
                salads = [];
                queryObject.equalTo('category', 'Salads');//---filter
                queryObject.find({

                    success: function (results) {

                        for (var i = 0; i < results.length; i++) {


                            var data = {};
                            data.name = results[i].get('name');
                            data.comment = results[i].get('comment');
                            data.shortComment = results[i].get('comment').substring(0, 20);
                            data.img = results[i].get('img');
                            data.price = results[i].get('price');

                            data.id = results[i].id;
                            salads.push(data);


                        }
                        deferred.resolve(salads);

                    }, error: function (error) {
                        deferred.reject(error);
                    }


                });


                return deferred.promise;
            }


            return {
                getSalads: getSalads

            }


        }])

        .factory('pasta', ['$q', function ($q) {
            var queryObject = new Parse.Query(Menu);


            function getPasta() {
                var deferred = $q.defer();
                pasta = [];
                queryObject.equalTo('category', 'Pasta');//---filter
                queryObject.find({
                    success: function (results) {

                        for (var i = 0; i < results.length; i++) {

                            var data = {};
                            data.name = results[i].get('name');
                            data.comment = results[i].get('comment');
                            data.shortComment = results[i].get('comment').substring(0, 20);
                            data.img = results[i].get('img');
                            data.price = results[i].get('price');
                            data.id = results[i].id;

                            pasta.push(data);


                        }

                        deferred.resolve(pasta);

                    }, error: function (error) {
                        deferred.reject(error);
                    }


                });


                return deferred.promise;
            }

            return {

                getPasta: getPasta
            }


        }])
        .factory('seafood', ['$q', function ($q) {


            var queryObject = new Parse.Query(Menu);


            function getSeafood() {
                var deferred = $q.defer();
                seafood = [];
                queryObject.equalTo('category', 'Seafood');//---filter
                queryObject.find({
                    success: function (results) {

                        for (var i = 0; i < results.length; i++) {

                            var data = {};
                            data.name = results[i].get('name');
                            data.comment = results[i].get('comment');
                            data.shortComment = results[i].get('comment').substring(0, 20);
                            data.img = results[i].get('img');
                            data.price = results[i].get('price');
                            data.id = results[i].id;


                            seafood.push(data);


                        }

                        deferred.resolve(seafood);

                    }, error: function (error) {
                        deferred.reject(error);
                    }


                });


                return deferred.promise;
            }

            return {

                getSeafood: getSeafood
            }


        }])
        .factory('posts', ['$q', function ($q) {


            var query = new Parse.Query(Posts);

            function formatDate(date) {
                return ((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
            }

            function getPost() {
                var deferred = $q.defer();
                posts = [];
                var number = [];
                var food=[];
                query.find({
                    success: function (results) {

                        for (var i = 0; i < results.length; i++) {

                            var data = {};
                            data.name = results[i].get('name');
                            data.comment = results[i].get('comment');
                            data.img = results[i].get('img');
                            data.date = formatDate(results[i].get('updatedAt'));
                            data.routeId = results[i].get('routeId');


                            posts.push(data);



                        }

                        deferred.resolve(posts);






                    }, error: function (error) {
                        deferred.reject(error);
                    }


                });


                return deferred.promise;
            }

            return {

                getPost: getPost
            }


        }])

        .factory('currentPosts', ['$q', function ($q) {


            var query = new Parse.Query(Posts);

            function formatDate(date) {
                return ((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
            }

            function getCurrentPosts(routeId) {
                var deferred = $q.defer();
                posts = [];

                query.find({
                    success: function (results) {

                        for (var i = 0; i < results.length; i++) {


                            var data = {};
                            data.name = results[i].get('name');
                            data.comment = results[i].get('comment');
                            data.img = results[i].get('img');
                            data.routeId = results[i].get('routeId');
                            data.date = formatDate(results[i].get('updatedAt'));

                            if (routeId === data.routeId) {
                                posts.push(data);
                            }

                        }

                        deferred.resolve(posts);


                    }, error: function (error) {
                        deferred.reject(error);
                    }


                });


                return deferred.promise;
            }

            return {

                getCurrentPosts: getCurrentPosts
            }


        }])
        .factory('currentfood', ['$q', function ($q) {

            var queryObject = new Parse.Query(Menu);


            function getCurrentFood(id) {
                var deferred = $q.defer();

                queryObject.get(id)
                    .then(function (result) {
                        var data = {};
                        data.name = result.get('name');
                        data.comment = result.get('comment');
                        data.img = result.get('img');
                        data.price = result.get('price');
                        data.id = result.id;

                        deferred.resolve(data);

                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {

                getCurrentFood: getCurrentFood
            }
        }])


        .controller('MyController', ['salads', 'pasta', 'seafood', 'posts', function (salads, pasta, seafood, posts) {
            var vm = this;


            salads.getSalads()
                .then(function (salads) {
                    vm.salads = salads;
                    $('.home-block').load('.home-block h4.title a ', function () {
                        Cufon.refresh();
                    });


                });


            pasta.getPasta()
                .then(function (pasta) {
                    vm.pasta = pasta;

                    $('.home-block').load('.home-block h4.title a ', function () {
                        Cufon.refresh();
                    });


                });

            seafood.getSeafood()
                .then(function (seafood) {
                    vm.seafood = seafood;


                    $('.home-block').load('.home-block h4.title a ', function () {
                        Cufon.refresh();
                    });


                });
            posts.getPost()
                .then(function (posts) {

                    vm.posts = posts;


                })


        }])
        .controller('DetailsController', ['$routeParams', 'currentfood', 'currentPosts', function ($routeParams, currentfood, currentPosts) {

            var vm = this;
            id = $routeParams.id;
            routeId = id;


            currentfood.getCurrentFood(id)
                .then(function (food) {
                    vm.food = food;


                });

            currentPosts.getCurrentPosts(routeId)
                .then(function (posts) {
                    vm.posts = posts;
                });

            $('#btn-add-comments').on('click', function () {

                var data = {
                    name: $('#name').val(),
                    img: $('#img').val(),
                    comment: $('#comment').val()

                };

                var post = new Posts();

                post.set('name', data.name);
                post.set('img', data.img);
                post.set('comment', data.comment);
                post.set('routeId', routeId);

                post.save(null, {
                    success: function () {
                        $routeParams.reload();
                    }
                });
            });


            $("#navigation li button").on("click", function (e) {
                e.preventDefault();


                var classclick = $(this).hasClass("click");


                if (classclick == true) {
                    var distance = $('#mainpage').css('right');

                    if (distance == "auto" || distance == "0px") {
                        $(this).addClass("open");
                        openSidepage();
                        $("#aboutright").css("display", "block");
                    } else {
                        closeSidepage();
                        $("#aboutright").css("display", "none");
                    }
                }
            }); // end click event handler

            $("#navigation li button").on("hover", function () {
                var classval = $(this).hasClass("hovertrigger");

                if (classval == true) {
                    var distance = $('#mainpage').css('left');

                    if (distance == "auto" || distance == "0px") {
                        $(this).addClass("open");
                        openSidepage();
                        $("#aboutright").css("display", "block");
                    }
                }
            }); // end hover event handler

            $("#closebtn").on("click", function (e) {
                e.preventDefault();
                closeSidepage();
                $("#aboutright").css("display", "none");
            }); // end close button event handler

            function openSidepage() {
                $('#mainpage').animate({
                    right: '350px'
                }, 400, 'easeOutBack');
            }

            function closeSidepage() {
                $("#navigation li button").removeClass("open");
                $('#mainpage').animate({
                    right: '0px'
                }, 400, 'easeOutQuint');
            }
        }])

        .controller('LocationController', [function () {

            var map;
            var geocoder;

            initialize();

            function initialize() {
                geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    'address': 'sofia Mladost 1',
                    'partialmatch': true
                }, geocodeResult);
            }

            function geocodeResult(results, status) {

                if (status == 'OK' && results.length > 0) {
                    var latlng = new google.maps.LatLng(results[0].geometry.location.b, results[0].geometry.location.c);
                    var myOptions = {
                        zoom: 17,
                        center: results[0].geometry.location,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

                    map = new google.maps.Map(document.getElementById("gmaps-container"), myOptions);
                    var marker = new google.maps.Marker({
                        position: results[0].geometry.location,
                        map: map
                    });

                    var contentString = '<div id="et-gmaps-content">' +
                        '<div id="bodyContent">' +
                        '<p><a target="_blank" href="http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=' + escape(results[0].formatted_address) + '&amp;ie=UTF8&amp;view=map">' + results[0].formatted_address + '</a>' +
                        '</p>' +
                        '</div>' +
                        '</div>';

                    var infowindow = new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 100,
                        maxHeight: 200
                    });

                    google.maps.event.addListener(marker, 'click', function () {
                        infowindow.open(map, marker);
                    });

                    google.maps.event.trigger(marker, "click");

                } else {
                    //alert("Geocode was not successful for the following reason: " + status);
                }
            }


        }])

        .controller('navController', [function () {


            $("#navigation li button").on("click", function (e) {
                e.preventDefault();


                var classclick = $(this).hasClass("click");


                if (classclick == true) {
                    var distance = $('#mainpage').css('right');

                    if (distance == "auto" || distance == "0px") {
                        $(this).addClass("open");
                        openSidepage();
                        $("#aboutright").css("display", "block");
                    } else {
                        closeSidepage();
                        $("#aboutright").css("display", "none");
                    }
                }
            }); // end click event handler

            $("#navigation li button").on("hover", function () {
                var classval = $(this).hasClass("hovertrigger");

                if (classval == true) {
                    var distance = $('#mainpage').css('left');

                    if (distance == "auto" || distance == "0px") {
                        $(this).addClass("open");
                        openSidepage();
                        $("#aboutright").css("display", "block");
                    }
                }
            }); // end hover event handler

            $("#closebtn").on("click", function (e) {
                e.preventDefault();
                closeSidepage();
                $("#aboutright").css("display", "none");
            }); // end close button event handler

            function openSidepage() {
                $('#mainpage').animate({
                    right: '350px'
                }, 400, 'easeOutBack');
            }

            function closeSidepage() {
                $("#navigation li button").removeClass("open");
                $('#mainpage').animate({
                    right: '0px'
                }, 400, 'easeOutQuint');
            }


        }])

}());
