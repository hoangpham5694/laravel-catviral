app.controller('SystemPostListController', function($scope, $http, API,$timeout){	
	var maxRecord = 20 	;
	$scope.maxRecord = maxRecord;

	$scope.txtKeyword = "";

	var getListPosts = function (max, page){
		var url=API + 'adminsites/systempost/ajax/list/'+max+'/'+page+"?key="+$scope.txtKeyword;
		console.log(url);
		$http.get(url).then(function successCallback (response){
	
			$scope.listSystemPost = response.data.posts;
			$scope.totalSystemPost = response.data.total  /$scope.maxPostsWithCate +1;
			console.log(response.data);
		}  , function errorCallback(response) {
			console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  		}) ;
	
	}

	getListPosts(maxRecord,1);


	$scope.delete = function(id){
		var isConfirmDelete = confirm('Bạn có chắc muốn xóa bài viết này không');
		if(isConfirmDelete){
			$http.get(API + 'adminsites/systempost/ajax/delete/'+id).then(function successCallback (response){
			console.log(response);
			console.log($scope.page);
			getListPosts(maxRecord,1);
		//	alert(response.data);
			}  , function errorCallback(response) {
			console.log(response);

			}) ;
		}else{
			return false;
		}
	}


	$scope.changeKey = function(){
		getListPosts(maxRecord,1);
	}


});