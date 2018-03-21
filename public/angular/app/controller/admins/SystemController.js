app.controller('SystemController', function($scope, $http, API,$timeout){	
	var maxRecord = 20 	;
	$scope.maxRecord = maxRecord;
	 var getTotalSystem = function(){
	 	$http.get(API + 'adminsites/system/ajax/total').then(function successCallback (response){
	
		$scope.total = response.data /maxRecord +1 ;
		console.log(response.data);
		//return response.data;
		
		}  , function errorCallback(response) {
			console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  		}) ;
	 }
	var getListSystem = function (max, page){
		var url =API + 'adminsites/system/ajax/list/'+max+'/'+page;
		console.log(url);
		$http.get(url).then(function successCallback (response){
		getTotalSystem();
		$scope.systems = response.data;
		$scope.page = page;
		console.log(response.data);
		}  , function errorCallback(response) {
			console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  		}) ;
		
	 };

	getListSystem(maxRecord,1);
	$scope.changePage = function(page){
		getListSystem(maxRecord,page);
	}
	$scope.delete = function(id){
		var isConfirmDelete = confirm('Bạn có chắc muốn xóa hệ điều hành này không');
		if(isConfirmDelete){
			$http.get(API + 'adminsites/system/ajax/delete/'+id).then(function successCallback (response){
			console.log(response);
			console.log($scope.page);
			getListSystem(maxRecord,$scope.page);
		//	alert(response.data);
			}  , function errorCallback(response) {
			console.log(response);

			}) ;
		}else{
			return false;
		}
	}
	$scope.modal = function(state,id,name){
		//console.log(state);
		$("#modalAdd").modal("show");
		$scope.state = state;
		switch(state){
			case 'add':
				$scope.modalTitle = "Thêm hệ điều hành";
				$scope.systemName ="";
				
			break;
			case 'edit':
				$scope.modalTitle = "Sửa hệ điều hành " + id;
				$scope.systemId= id;
				$scope.systemName = name;

			break;
		}
		 

		
	}
	$scope.confirm = function(state){
		switch(state){
			case 'add':
				var url= API + 'adminsites/system/ajax/add?sysname='+ $scope.systemName;
			break;
			case 'edit':
				var url= API + 'adminsites/system/ajax/edit?sysid='+ $scope.systemId+'&sysname='+$scope.systemName;
			break;

		}
		console.log(url);
		$http.get(url).then(function successCallback (response){

		//console.log(response.data);
			alert(response.data);
			$("#modalAdd").modal("hide");
			getListSystem(maxRecord,1);
		}  , function errorCallback(response) {
			//alert("Xảy ra lỗi trong khi ");
			console.log(response.data);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  		}) ;
	}


});