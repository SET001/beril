angular.module('beril', ['ui.router'])
.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
function ($locationProvider, $stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/about");
	$stateProvider
		.state('about', {
			url: '/about',
			views:{
				content: {
					templateUrl: 'src/views/about.html',
				}
			}
		})
		.state('examples', {
			url: '/examples',
			views: {
				'menu': {templateUrl: 'src/views/examples/menu.html'}
			},
		})
		.state('examples.page', {
			url: '/:page',
			views: {
				'content@': {
					controller: ($stateParams) => {
						require(['src/js/examples/' + $stateParams.page + '/example'], (example) =>	example());
					}
				}
			},
		})
		.state('tutorial', {
			url: '/tutorial',
			views: {
				'menu': {templateUrl: 'src/views/tutorial/menu.html'}
			},
		})
		.state('tutorial.page', {
			url: '/:page',
			views: {
				'content@': {
					templateUrl: (params) =>	'src/views/tutorial/' + params.page + '.html'
				}
			},
		})
		.state('docs', {
			url: '/docs',
			views: {
				'menu': {templateUrl: 'src/views/docs/menu.html'}
			},
		})
}]);
