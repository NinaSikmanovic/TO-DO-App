(function () {
    'use strict';
    angular.module('toDoApp')
        .service('homeService', homeService);

    homeService.$inject = ['$http', '$q']

    function homeService($http, $q) {

        var homeService = {
            getTasks: getTasks,
            addTask: addTask,
            deleteTask: deleteTask,
            updateTask: updateTask,
            doneTask: doneTask,
        };
        return homeService;

        function getTasks() {
            var deferred = $q.defer();
            $http.get('http://localhost:3000/items/')
                .then(function (data) {
                    deferred.resolve(data);
                }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function addTask(newTask) {
            var deferred = $q.defer();
            var data = {
                "title": newTask,
                "isFav": false,
                "isChecked": false
            }
            $http.post('http://localhost:3000/items', JSON.stringify(data))
                .then(function (data) {
                    deferred.resolve(data);
                }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function deleteTask(id) {
            var deferred = $q.defer();
            $http.delete('http://localhost:3000/items/' + id)
                .then(function (data) {
                    deferred.resolve(data);
                }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function updateTask(data) {
            var deferred = $q.defer();

            $http.put('http://localhost:3000/items/' + data.id, JSON.stringify(data))
                .then(function (data) {
                    deferred.resolve(data);
                }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function doneTask(id, isDone) {
            var deferred = $q.defer();
            var data = {
                "isDone": isDone
            }
            $http.put('http://localhost:3000/items/' + id, JSON.stringify(data))
                .then(function (data) {
                    deferred.resolve(data);
                }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }
})();

