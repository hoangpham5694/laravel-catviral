app.controller('GuestController', function($scope, $http, API,$timeout){	

	$scope.getAllCategories = function (){
		$http.get(API + 'api/category/list-cates').then(function successCallback (response){		
		$scope.categories = response.data;
		
	//	console.log(response.data);
		}  , function errorCallback(response) {
			console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  		}) ;
		
	 };
	$scope.getMostDownloadSoftwares = function (max){
		$http.get(API + 'api/software/most-download/'+max).then(function successCallback (response){		
		$scope.mostDownloadSoftwares = response.data;
		
	//	console.log(response.data);
		}  , function errorCallback(response) {
			console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  		}) ;
		
	 };
	$scope.getHighestViewSoftware = function (sysId){
		var url = API + 'api/software/highest-view-in-system/'+sysId;
			$http.get(url).then(function successCallback (response){		
			$scope.highestViewSoftware = response.data;

		//	console.log();
			var res = $scope.highestViewSoftware.tags.split(",");
			console.log(res);
		}  , function errorCallback(response) {
			console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  		}) ;
		
	 };
	 $scope.getListNewestSoftwares = function (offset,max,cateid,systemid){
		var url = API + 'api/software/list-newest/'+offset+'/'+max+"?cateid="+cateid+"&sysid="+systemid;
		console.log(url);
		$http.get(url).then(function successCallback (response){		
			$scope.highestViewSoftwares = response.data;
			var timeout = setTimeout(function() {
				$("img.lazy").lazyload();
			}, 200);
			console.log($scope.highestViewSoftwares);
	
		}  , function errorCallback(response) {
			console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  		}) ;
		
	 };
	$scope.getListLastUpdateSoftwares = function (offset,max,cateid,systemid){
		var url = API + 'api/software/list-last-update/'+offset+'/'+max+"?cateid="+cateid+"&sysid="+systemid;
		$http.get(url).then(function successCallback (response){		
			$scope.listLastUpdateSoftwares = response.data;

			console.log();
	
		}  , function errorCallback(response) {
			console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  		}) ;
		
	 };
	 $scope.getListRandomSoftwares = function (max,cateid,sysid){

		var url = API + 'api/software/list-random/'+max+'?cateid='+cateid+'&sysid='+sysid;
		console.log(url);
			$http.get(url).then(function successCallback (response){		
			$scope.listRandomSoftwares = response.data;

			console.log(response.data);
	
		}  , function errorCallback(response) {
			console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  		}) ;
		
	 };
	$scope.maxSoftwaresWithCate = 10;
	$scope.getListSoftwaresWithCate = function (page,cateid,order){
		$scope.cateid = cateid;
		$scope.order= order;
		$scope.pageListSoftwaresWithCate = page;
		var url = API + 'api/software/list-with-cate/'+$scope.maxSoftwaresWithCate+'/'+page+'?cateid='+$scope.cateid+'&orderby='+$scope.order;

		console.log(url);
			$http.get(url).then(function successCallback (response){		
			$scope.listSoftwaresWithCate = response.data.softwares;
			$scope.totalSoftwareWithCate = response.data.total  /$scope.maxSoftwaresWithCate +1;
			//console.log(response.data);
			var timeout = setTimeout(function() {
				$("img.lazy").lazyload();
			}, 100);
		}  , function errorCallback(response) {
			console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  		}) ;
		
	 };
	 $scope.getListSystems = function (){

		var url = API + 'api/system/list-systems';
		console.log(url);
			$http.get(url).then(function successCallback (response){		
			$scope.listSystems = response.data;

			//console.log(response.data);
	
		}  , function errorCallback(response) {
			console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  		}) ;
		
	 };

});
