app.controller('AppController', function($scope, $http, API,$timeout){	
	var maxRecord = 5 	;
	$scope.maxRecord = maxRecord;
	$scope.sltCateId = "";

	$scope.sltUserId = "";
	$scope.sltStatus = "";
	$scope.txtKeyword = "";
	 var getTotalApps = function(){
	 	$http.get(API + 'api/apps/total').then(function successCallback (response){
	
		$scope.total = response.data /maxRecord +1 ;
		console.log(response.data);
		//return response.data;
		
		}  , function errorCallback(response) {
			console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  		}) ;
	 }
	var getListApps = function (max, page){
		var url=API + 'api/apps/listapps?max='+max+'&page='+page+"&cateid="+$scope.sltCateId+"&userid="+$scope.sltUserId+"&key="+$scope.txtKeyword+"&status="+$scope.sltStatus;
		console.log(url);
		$http.get(url).then(function successCallback (response){
		getTotalApps();
		$scope.apps = response.data;
		$scope.page = page;
		console.log(response.data);
		}  , function errorCallback(response) {
			console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  		}) ;
		
	 };

	getListApps(maxRecord,1);

	$scope.changePage = function(page){
		getListApps(maxRecord,page);
		$scope.page= page;
	}
	$scope.changeCate = function(){
		getListApps(maxRecord,1);
	}
	$scope.changeSystem = function(){
		getListApps(maxRecord,1);
	}
	$scope.changeUser = function(){
		getListApps(maxRecord,1);
	}
	$scope.delete = function(id){
		var isConfirmDelete = confirm('Bạn có chắc muốn xóa App này không');
		if(isConfirmDelete){
			$http.get(API + 'api/apps/delete/'+id).then(function successCallback (response){
			console.log(response);
			console.log($scope.page);
			getListApps(maxRecord,$scope.page);
		//	alert(response.data);
			}  , function errorCallback(response) {
			console.log(response);

			}) ;
		}else{
			return false;
		}
	}


	$scope.changeKey = function(){
		getListApps(maxRecord,1);
	}
	$scope.changeStatus = function() {
		getListApps(maxRecord,1);
	}
	$scope.setStatus = function(id,status){
		var url=API + "api/apps/set-status/"+id+"/"+status;
		console.log(url);
		$http.get(url).then(function successCallback (response){
			getListApps(maxRecord,$scope.page);
			console.log(response.data);
		}  , function errorCallback(response) {
			console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  		}) ;
		
	}
	$scope.setFeature = function(id,action){
		var url="";
		switch(action){
			case 'set':
				url=API + "managersites/post/ajax/make-feature/"+id;
			break;
			case 'undo':
				url=API + "managersites/post/ajax/undo-feature/"+id;
			break;
		}
		
		console.log(url);
		$http.get(url).then(function successCallback (response){
			getListApps(maxRecord,$scope.page);
			console.log(response.data);
		}  , function errorCallback(response) {
			console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  		}) ;
		
	}

});