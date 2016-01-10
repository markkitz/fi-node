routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      template: require('./home.html'),
      controller: 'HomeController',
      controllerAs: 'home'
    })
    .state('test', {
      url: '/test',
      template: require('./homeTest.html'),
      controller: 'HomeController',
      controllerAs: 'home'
    })

    ;
}
