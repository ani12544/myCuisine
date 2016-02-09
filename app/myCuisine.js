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
                posts = [];
                var number = [];
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


                            posts.push(data);



                        }
                        for (var i = 0; i < 3; i++) {
                            var a = Math.floor(Math.random() * (posts.length - 1)) + 1;

                            number.push(a)


                        }

                        var arr = [];
                        while(arr.length < 3){
                            var randomnumber=Math.floor(Math.random() * (posts.length - 1)) + 1;

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
                            food.push(posts[arr[i]]);
                        }

                        console.log(arr);

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


        .controller('Controller', ['homeFood',function (homeFood) {
            var vm = this;


            homeFood.getFood()
                .then(function (foods) {
                    vm.foods = foods;
                    $('.home-block').load('.home-block h4.title a ', function () {
                        Cufon.refresh();
                    });


                });







        }])




}());
/**
 * Created by Ani on 2/9/2016.
 */
