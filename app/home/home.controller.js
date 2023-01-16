(function () {
    'use strict';
    angular.module('toDoApp')
        .controller('HomeController', HomeController)

    HomeController.$inject = ['homeService'];

    function HomeController(homeService) {
        var vm = this;

        vm.tasks = [];
        vm.favoriteTasks = [];
        vm.newTask = '';

        function onInit() {
            vm.getTasks();
        }

        function getTasks() {
            homeService.getTasks().then(function (response) {
                vm.tasks = response.data;
                console.log(vm.tasks);
                vm.favoriteTasks = vm.tasks.filter(function (el) {
                    return el.isFav
                });
            }, function (){
                window.alert('problem with loading tasks')
            });
        }

        function addTask() {
            homeService.addTask(vm.newTask).then(function (response) {
                getTasks();
                vm.newTask = '';
            }, function (){
                window.alert('problem with adding task')
            })
        }

        function deleteTask(id) {
            homeService.deleteTask(id).then(function () {
                getTasks();
            }, function (){
                window.alert('problem with deleting task')
            })
        }


        function updateTask(data) {
            homeService.updateTask(data).then(function () {
                getTasks();
            }, function (){
                window.alert('error')
            });
        }

        function doneTask(task) {
            task.isChecked = !task.isChecked
            vm.updateTask(task)
        }

        function addToFavorites(task){
            task.isFav = true;
            vm.updateTask(task);
        }

        function removeFromFavorites(task){
            task.isFav = false;
            vm.updateTask(task);
        }

        function hideShow(){
            console.log('tst')
        }

        vm.$onInit = onInit;
        vm.getTasks = getTasks;
        vm.addTask = addTask;
        vm.deleteTask = deleteTask;
        vm.removeFromFavorites = removeFromFavorites;
        vm.addToFavorites = addToFavorites;
        vm.doneTask = doneTask;
        vm.updateTask = updateTask;
        vm.hideShow = hideShow;

    }
})();