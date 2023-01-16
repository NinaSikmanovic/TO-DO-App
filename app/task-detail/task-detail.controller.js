(function () {
    'use strict';
    angular.module('toDoApp')
        .controller('TaskDetailController', TaskDetailController)

    TaskDetailController.$inject = ['taskDetailService', '$routeParams', 'homeService', '$location'];

    function TaskDetailController(taskDetailService, $routeParams, homeService, $location) {
        var vm = this;
        vm.task = '';
        vm.getTask = getTask;
        vm.$onInit = onInit;
        vm.deleteTask = deleteTask;
        vm.addToFavorites = addToFavorites;

        function getTask(id) {
            taskDetailService.getTask(id).then(function (response) {
                vm.task = response.data;
            }, function (){
                window.alert('problem with loading task')
            });
        }

        function onInit() {
            vm.getTask($routeParams.taskId);
        }

        function deleteTask(id) {
            homeService.deleteTask(id);
            $location.path('http://localhost:3000')
        }

        function addToFavorites(task) {
            task.isFav = true;
            homeService.updateTask(task);
        }
    }
})();
