//==================================
//	Kyle Russell
//	github.com/denkers/GameTop100
//	site-management-controller	
//==================================

(function()
{
	angular.module('main').controller('siteManagementController', function($scope, $rootScope)
	{
		$scope.siteSaveData			=	{};
		$scope.siteManageResponse	=	{};	

		$rootScope.getData(site_list_url, function(response)
		{
			$scope.site_list	=	response;	
		});

		$rootScope.getData(game_list_url, function(response)
		{
			$scope.game_list	=	response;
			console.log($scope.game_list);
		});

		$scope.openAddSiteModal	=	function()
		{
			if($scope.site_list.selectedSite != null)
				$scope.toggleEditSiteContainer($scope.site_list[$scope.site_list.selectedSite], $scope.site_list.selectedSite);

			$scope.siteSaveData	=	{ s_game: $scope.game_list[0].id };
			$rootScope.openModal(null, root_url + '/templates/user/siteadd.blade.php', null, 'md', $scope);
		};

		$scope.toggleEditSiteContainer = function(site, index)
		{
			if($scope.site_list.selectedSite != null && $scope.site_list.selectedSite != index)
			{
				var selectedSite				=	$scope.site_list[$scope.site_list.selectedSite];
				selectedSite.showViewContainer	=	false;
			}

			if(!site.showViewContainer)
			{
				$scope.siteSaveData.s_title	=	site.title;
				$scope.siteSaveData.s_desc	=	site.description;
				$scope.siteSaveData.s_add	=	site.address;
				$scope.siteSaveData.s_game	=	site.game_id;
			}

			$scope.site_list.selectedSite	=	(!site.showViewContainer)? index : null;
			site.showViewContainer = !site.showViewContainer;
		};

		$scope.saveSite = function(url)
		{
			if($scope.site_list.selectedSite == null)
				$scope.addSite();
			else
				$scope.editSite(url);
		};

		$scope.addSite	=	function()
		{
			var data	=	$scope.siteSaveData;
			data.s_tags	=	JSON.stringify(data.s_tags.split(","));

			$rootScope.postData(add_site_url, data, function(response)
			{
				if(response.status)
				{
					$rootScope.closeModal();
					$scope.siteManageResponse		=	response;
					$scope.siteManageResponse.show	=	true;
					$scope.site_list.push(response.addedSite);
				}
			});
		};

		$scope.editSite	=	function(url)
		{
			if($scope.site_list.selectedSite == null) return;

			var site		=	$scope.site_list[$scope.site_list.selectedSite];
			var params		=	{ site_id: site.id };
			url				=	$rootScope.setParams(url, params);
			var data		=	$scope.siteSaveData;
			data.s_id		=	site.id;	
			data.s_tags		=	JSON.stringify(data.s_tags.split(","));


			$rootScope.postData(url, data, function(response)
			{
				$scope.siteManageResponse		=	response;
				$scope.siteManageResponse.show	=	true;

				if(response.status)
				{
					$scope.site_list[$scope.site_list.selectedSite]	=	response.saved_site;
					$scope.toggleEditSiteContainer(site, $scope.site_list.selectedSite);
				}
			});
		};

		$scope.removeSite	=	function(index, url)
		{
			var site		=	$scope.site_list[index];
			var data		=	{ s_id:	site.id };	
			var params		=	{ site_id: site.id };
			url				=	$rootScope.setParams(url, params);

			$rootScope.postData(url, data, function(response)
			{
				$scope.siteManageResponse		=	response;
				$scope.siteManageResponse.show	=	true;	

				if(response.status)
					$scope.site_list.splice(index, 1);
			});
			
		};

		$scope.closeManageResponseAlert	=	function()
		{
			$scope.siteManageResponse	=	{};
		}
	});
})();
