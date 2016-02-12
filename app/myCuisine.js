$(function () {

    Parse.initialize("s4TbblXGlY9QDNtfMumutKwivNfu5f8RVpxZ20oR",
        "YnetlPvR1Lx4ibHZpAYd79cf2HxCnYYiqxQw66IE");


    var Menu = Parse.Object.extend('Menu');

    var Posts = Parse.Object.extend('Posts');

    var posts = new Posts();




    angular.module('myApp', ['ngRoute'])




        .factory('homeFood', ['$q', function ($q) {


            var query = new Parse.Query(Menu);

            function formatDate(date) {
                return ((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
            }

            function getFood() {
                var deferred = $q.defer();
                menu = [];

                var food=[];
                query.find({
                    success: function (results) {

                        for (var i = 0; i < results.length; i++) {

                            var data = {};
                            data.name = results[i].get('name');
                            data.comment = results[i].get('comment');
                            data.shortComment = results[i].get('comment').substring(0, 20);
                            data.price = results[i].get('price');
                            data.img = results[i].get('img');
                            data.date = formatDate(results[i].get('updatedAt'));
                            data.id = results[i].id;

                            menu.push(data);



                        }


                        var arr = [];
                        while(arr.length < 3){
                            var randomnumber=Math.floor(Math.random() * (menu.length - 1)) + 1;

                            var found=false;
                            for(var i=0;i<arr.length;i++){
                                if(arr[i]==randomnumber){
                                    found=true;
                                    break;
                                }
                            }
                            if(!found){
                                arr.push(randomnumber);
                            };
                        }


                        for(var i=0;i<3;i++){
                            food.push(menu[arr[i]]);
                        }



                        deferred.resolve(food);



                    }, error: function (error) {
                        deferred.reject(error);
                    }


                });


                return deferred.promise;
            }

            return {

                getFood: getFood
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

                var comment=[];
                query.find({
                    success: function (results) {

                        for (var i = 0; i < results.length; i++) {

                            var data = {};
                            data.name = results[i].get('name');
                            data.comment = results[i].get('comment');
                            data.shortComment = results[i].get('comment').substring(0, 300);
                            data.img = results[i].get('img');
                            data.date = formatDate(results[i].get('updatedAt'));
                            data.routeId = results[i].get('routeId');

                            posts.push(data);

                        }
                        var randomnumber=Math.floor(Math.random() * (menu.length - 1)) + 1;
                        comment.push(posts[randomnumber]);


                        deferred.resolve(comment);






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



        .controller('Controller', ['homeFood','posts',function (homeFood,posts) {
            var vm = this;


            homeFood.getFood()
                .then(function (foods) {
                    vm.foods = foods;

                    $('.home-block').load('.home-block h4.title a ', function () {
                        Cufon.refresh();
                    });


                });
            posts.getPost()
                .then(function (comment) {
                    vm.comment = comment;
                    console.log(comment.name);
                    $('.home-block').load('.home-block h4.title a ', function () {
                        Cufon.refresh();
                    });


                });




            //<![CDATA[
            var map;
            var geocoder;

            initialize();

            function initialize() {
                geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    'address': 'Mladost 1 Sofia Bulgaria',
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

                    map = new google.maps.Map(document.getElementById("gmaps-container-1"), myOptions);
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
                        maxWidth: 100
                    });

                    google.maps.event.addListener(marker, 'click', function () {
                        infowindow.open(map, marker);
                    });

                    google.maps.event.trigger(marker, "click");

                } else {
                    //alert("Geocode was not successful for the following reason: " + status);
                }
            }
            //]]>




        }])





}());
/**
 * Created by Ani on 2/9/2016.
 */
