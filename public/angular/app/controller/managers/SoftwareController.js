app.controller('SoftwareListController', function($scope, $http, API,$timeout){	
	var maxRecord = 20 	;
	$scope.maxRecord = maxRecord;
	$scope.sltCateId = "";
	$scope.sltSystemId = "";
	$scope.sltUserId = "";
	$scope.sltStatus = "";
	$scope.txtKeyword = "";
	 var getTotalSoftwares = function(){
	 	$http.get(API + 'managersites/software/ajax/total').then(function successCallback (response){
	
		$scope.total = response.data /maxRecord +1 ;
		console.log(response.data);
		//return response.data;
		
		}  , function errorCallback(response) {
			console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  		}) ;
	 }
	var getListSoftwares = function (max, page){
		var url=API + 'managersites/software/ajax/list/'+max+'/'+page+"?cateid="+$scope.sltCateId+"&sysid="+$scope.sltSystemId+"&userid="+$scope.sltUserId+"&key="+$scope.txtKeyword+"&status="+$scope.sltStatus;
		console.log(url);
		$http.get(url).then(function successCallback (response){
		getTotalSoftwares();
		$scope.softwares = response.data;
		$scope.page = page;
		console.log(response.data);
		}  , function errorCallback(response) {
			console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  		}) ;
		
	 };

	getListSoftwares(maxRecord,1);

	$scope.changePage = function(page){
		getListSoftwares(maxRecord,page);
		$scope.page= page;
	}
	$scope.changeCate = function(){
		getListSoftwares(maxRecord,1);
	}
	$scope.changeSystem = function(){
		getListSoftwares(maxRecord,1);
	}
	$scope.changeUser = function(){
		getListSoftwares(maxRecord,1);
	}
	$scope.delete = function(id){
		var isConfirmDelete = confirm('Bạn có chắc muốn xóa video này không');
		if(isConfirmDelete){
			$http.get(API + 'managersites/software/ajax/delete/'+id).then(function successCallback (response){
			console.log(response);
			console.log($scope.page);
			getListSoftwares(maxRecord,$scope.page);
		//	alert(response.data);
			}  , function errorCallback(response) {
			console.log(response);

			}) ;
		}else{
			return false;
		}
	}


	$scope.changeKey = function(){
		getListSoftwares(maxRecord,1);
	}
	$scope.changeStatus = function() {
		getListSoftwares(maxRecord,1);
	}
	$scope.setStatus = function(id,status){
		var url=API + "managersites/software/ajax/setstatus/"+id+"/"+status;
		console.log(url);
		$http.get(url).then(function successCallback (response){
			getListSoftwares(maxRecord,$scope.page);
			console.log(response.data);
		}  , function errorCallback(response) {
			console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  		}) ;
		
	}


});