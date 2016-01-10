require('../src/app/eventLog/module.js')
//require('../src/app/eventLog/TestController.js')
angular.module('app', ['app.eventLog', 'ui.router', 'app.eventLog' ])
// .config(function ($stateProvider, $urlRouterProvider) {
//     $stateProvider.
//         state('app', {
//             url: '/',
//             template: '<div>index</div>',
//             controller: 'IndexCtrl'
//         }).
//         state('login', {
//             url: '/login',
//             template: '<div>login</div>',
//             controller: 'LoginCtrl'
//         }).
//         state('guides', {
//             url: '/guides',
//             template: '<div>guides<div ui-view></div></div>',
//             controller: 'GuidesCtrl'
//         }).
//         state('projects', {
//             url: '/projects',
//             template: '<div>projects</div><div ui-view></div>',
//             controller: 'ProjectsCtrl'
//         });
//
//         $urlRouterProvider.otherwise('/app');
// })
// .controller('IndexCtrl', function() {
//   console.log('Index');
// })
// .controller('LoginCtrl', function() {
//   console.log('Login');
// })
// .controller('GuidesCtrl', function() {
//   console.log('GuidesCtrl');
// })
// .controller('ProjectsCtrl', function() {
//   console.log('Projects');
// })
// .controller('ListCtrl', function() {
//   console.log('List');
// })


// angular.module('app.guides', ['ui.router']).config(function ($stateProvider) {
//     $stateProvider.
//         state('guides.login', {
//             url: '/login',
//             template: '<div>guides login</div>',
//             controller: 'LoginCtrl'
//         }).
//         state('guides.menu', {
//             url: '/login',
//             template: '<div>guides-menu</div>',
//             controller: 'LoginCtrl'
//         }).
//         state('guides.web', {
//             url: '/web',
//             template: '<div>guides web</div>',
//             controller: 'ListCtrl'
//         }).
//         state('guides.mobile', {
//             url: '/web',
//             template: '<div>guildes mobile</div>',
//             controller: 'ListCtrl'
//         });
// });
//
// angular.module('app.projects', ['ui.router']).config(function ($stateProvider) {
//     $stateProvider.
//         state('projects.login', {
//             url: '/login',
//             template: '<div>projects login</div>',
//             controller: 'LoginCtrl'
//         }).
//         state('projects.business', {
//             url: '/business',
//             template: '<div> projects business</div>',
//             controller: 'ListCtrl'
//         }).
//         state('projects.menu', {
//             url: '/menu',
//             template: '<div>projects menu</div>',
//             controller: 'ListCtrl'
//         }).
//         state('projects.community', {
//             url: '/community',
//             template: '<div>projects-community</div>',
//             controller: 'ListCtrl'
//         })
// });
