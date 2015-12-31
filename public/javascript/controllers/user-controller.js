(function()
{
	angular.module('main').controller('userController', function($scope, $rootScope, $http, $httpParamSerializer)
	{
		$scope.loginData		=	{};
		$scope.registerData		=	{};
		$scope.loginResponse	=	null;
		$scope.registerResponse	=	null;

		$scope.login		=	function()
		{
			$http
			({
				url: 'login',
				data: $httpParamSerializer($scope.loginData),
				method: 'POST'
			}).success(function(response)
			{
				$scope.loginResponse	=	response;

				if(response.status)
				{
					setTimeout(function()
					{
						$rootScope.closeModal();
					}, 2000);
				}
			})
			.error(function(response)
			{
				console.log(response);
			});
		};

		$scope.register		=	function()
		{
			$http
			({
				url: 'register',
				data: $httpParamSerializer($scope.registerData),
				method: 'POST'

			}).success(function(response)
			{
				$scope.registerResponse	=	response;

			}).error(function(response)
			{
				console.log(response);
			});
		};

		$scope.logout		=	function()
		{
			$http.get('user/logout')
			.success(function(response)
			{
				console.log(response);

			}).error(function(response)
			{
				console.log(response);
			});
		};

		$scope.$on('logoutReq', function(event, args)
		{
			$scope.logout();
		});
	});
})();