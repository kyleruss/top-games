(function()
{
	angular.module('main').controller('navController', function($scope, $rootScope, $log)
	{
		$scope.openLogin	=	function()
		{	
			$rootScope.openModal(null, 'templates/user/login.blade.php', 'userController');
		};

		$scope.openRegister	=	function()
		{	
			$rootScope.openModal(null, 'templates/user/register.blade.php', 'userController');
		};

		$scope.openLogout	=	function()
		{
			var template	=	'<message-modal title="Sign-out" message="Signing out, one moment please"></message-modal>';
			$rootScope.openModal(template, null, 'userController');

			setTimeout(function()
			{
				$rootScope.$broadcast('logoutReq', []);
			}, 3000);
		};
	});
})();