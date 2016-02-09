
$(function () {

    Parse.initialize("s4TbblXGlY9QDNtfMumutKwivNfu5f8RVpxZ20oR",
        "YnetlPvR1Lx4ibHZpAYd79cf2HxCnYYiqxQw66IE");


    var Menu = Parse.Object.extend('Menu');

    var Posts = Parse.Object.extend('Posts');

    var posts=new Posts();










    angular.module('headerApp', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {

            $routeProvider
                .when('/menu', {

                    templateUrl: 'templates/dinnerMenu.html'

                })
                .when('/location', {
                    templateUrl: 'templates/storeLocation.html'

                })
                .when('/post/:id', {
                    templateUrl: 'templates/postTitle.html',
                    controller: 'Controller',
                    controllerAs: 'vm'
                })
        }])

        .controller('Controller', ['$routeParams','food', function ($routeParams,food) {

            var vm = this;
            id = $routeParams.id;
            routeId=id;


           food.getCurrentFood(id)
                .then(function (food) {
                    vm.food = food;

                    $('#comment-wrap').load('h3 ', function() { Cufon.refresh(); });
                });


        }])
        .factory('food',['$q',function($q){

            var queryObject = new Parse.Query(Menu);

            function formatDate(date) {
                return ((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());
            }

            function getCurrentFood(id) {
                var deferred = $q.defer();

                queryObject.get(id)
                    .then(function (result) {
                        var data={};
                        data.name=result.get('name');
                        data.category=result.get('category');
                        data.date=formatDate(result.get('updatedAt'));
                        data.id=result.id;

                        deferred.resolve(data);

                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {

                getCurrentFood:getCurrentFood
            }
        }])








}());

