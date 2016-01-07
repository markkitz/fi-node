import EventLogListCtrl from './EventLogListCtrl.js'
console.log(EventLogListCtrl)

angular.module('app.eventLog', ['ui.router']).config(function ($stateProvider) {
  $stateProvider.
      state('eventLog', {
        url: '/eventLog',
        template: '<div>eventLog</div><div ui-view></div>',
        controller: 'EventLogCtrl'
      }).
      state('eventLog.list', {
          url: '/list',
          template: '<div>list event log</div>',
          controller: 'ListCtrl'
      }).
      state('eventLog.test', {
          url: '/test',
          template: '<div>TEST</div>',
          controller: 'ListCtrl'
      }).
      state('eventLog.template', {
          url: '/template',
          templateUrl: './app/eventLog/template.html',
          controller: 'ListCtrl'
      })
      ;//<li><a ui-sref="eventLog.list">eventLog.list</a></li>
})
.controller('EventLogCtrl', EventLogListCtrl)
.controller('ListCtrl', function(){})
;
