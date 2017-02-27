var app = angular.module("twenty",['ui.router','ui.bootstrap','ang-drag-drop']);

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/board");

    $stateProvider
        .state("board", {
            url: "/board",
            template:'<board></board>'
        });      
});