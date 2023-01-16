(function () {
    'use strict';
    angular.module('toDoApp')
        .service('taskDetailService', taskDetailService);

    taskDetailService.$inject = ['$http', '$q']

    function taskDetailService($http, $q) {
        var taskDetailservice = {
            getTask: getTask
        }
        return taskDetailservice;

        function getTask(id) {
            var deferred = $q.defer();
            $http.get('http://localhost:3000/items/' + id)
                .then(function (data) {
                    deferred.resolve(data);
                }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }
})();
