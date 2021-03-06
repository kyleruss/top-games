@extends('layout.user')

@section('js')
	@parent
	{{ HTML::script('javascript/directives/site-directives.js'); }}
@stop

@section('user_content')
<script>
	var site_list_url	=	'{{ URL::route("getMySiteList"); }}';
	var game_list_url	=	'{{ URL::route("getGameList"); }}';
	var add_site_url	=	'{{ URL::route("postAddSite"); }}';
</script>

<div data-ng-controller='siteManagementController'>
	<div id='site_list_container'>
		<div class='page-header'>
			<h3>Manage sites
				<br><small>Add, remove and edit your sites</small>
			</h3>
		</div>
		<!-- MAIN SITE CONTROLS -->
		<div id='site_controls'>
			<div class='btn-group'>
				<!-- ADD SITE CONTROL -->
				<button id='add_site_btn' class='btn btn-default' data-ng-click='openAddSiteModal()'>
					<span class='glyphicon glyphicon-plus'></span> Add
				</button>

				<!-- PREMIUM SITE CONTROL -->
				<button id='premium_site_btn' class='btn btn-default'>
					<span class='glyphicon glyphicon-star'></span> Premium
				</button>
			</div>
		</div>
		<br>

		<uib-alert data-ng-if='siteManageResponse.show' close='closeManageResponseAlert()' dismiss-on-timeout='2000'
		type='<% siteManageResponse.status? "success" : "danger" %>'>
			<span class='<% siteManageResponse.status? "glyphicon glyphicon-ok-sign" : "glyphicon glyphicon-remove-sign" %>'></span> 
			<% siteManageResponse.message  %>
		</uib-alert>	
		<!-- SITE LIST -->
		<ul class='list-group site_group'>
				<li data-ng-repeat='site in site_list' class='list-group-item list_site_item clearifx'>
					<div class='list_site_item_container row'>

						<!-- SITE BANNER -->
						<div class='site_banner col-md-12'>
		
						</div>

						<!-- SITE RANK DETAILS -->
						<div class='site_rank_details col-md-1'>
							<div class='rank_display'>
								<% $index + 1 %>
							</div>
						</div>

						<!-- SITE DETAILS -->
						<div class='site_item_details col-md-7'>
							<h5 class='list_site_title'><% site.title %>
								<br><small><% site.description %></small>
							</h5>					
						</div>

						<!-- SITE CONTROLS -->
						<div class='site_item_controls col-md-4'>

							<!-- REMOVE SITE CONTROl -->
							<a uib-tooltip='Remove site' tooltip-placement='top' data-ng-click='removeSite($index, "{{ URL::route("postRemoveSite", 1); }}"); $event.preventDefault()' class='site_control_link plain_link remove_site_control'> 
								<span class='glyphicon glyphicon-remove'></span>
							</a>
		
							<!-- EDIT SITE CONTROL -->	
							<a uib-tooltip='Edit site' tooltip-placement='top' data-ng-click='toggleEditSiteContainer(site, $index); $event.preventDefault()' class='site_control_link plain_link edit_site_control <% site_list.selectedSite == $index? "active_control" : "" %>' href='#'> 
								<span class='glyphicon glyphicon-pencil'></span>
							</a>

							<!-- PREMIUM SITE CONROL -->
							<a class='site_control_link plain_link premium_site_control' href='{{ URL::route("postMakePremiumSite",1); }}'>
								<span class='glyphicon glyphicon-star'></span>
							</a>

							<!-- VIEW SITE CONTROL -->
							<a uib-tooltip='Go to site' tooltip-placement='top' class='site_control_link plain_link view_site_control' href='<% site.address %>'>
								<span class='glyphicon glyphicon-share-alt'></span>
							</a>
						</div>

						<!-- SITE VIEW CONTAINER -->
						<div uib-collapse='!site.showViewContainer' class='site_view_container col-md-12'>
							<div class='col-md-12'>
								<div class='page-header'>
									<h3>Edit site</h3>
								</div> 
							</div>

							<siteform site-save-data='<% siteSaveData %>' game-list='<% game_list %>' response='<%  %>'>
							</siteform>
							
						</div>
					</div>
				</li>
		</ul>
	</div>
</div>
@stop
