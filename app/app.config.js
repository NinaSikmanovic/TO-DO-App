angular
    .module('toDoApp')
    .config(config);

function config($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'app/home/home.template.html',
            controller: 'HomeController',
            controllerAs: 'vm'
        })
        .when('/home/:taskId', {
            templateUrl: 'app/task-detail/task-detail.template.html',
            controller: 'TaskDetailController',
            controllerAs: 'vm'
        })
        .otherwise({
            redirectTo: '/home'
        });
}

