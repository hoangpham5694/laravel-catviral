<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', ['as'=>'getIndex' ,'uses' => 'GuestController@getIndex']);
Route::get('test-job', ['uses' => 'GuestController@getTestJob']);

Route::get('login',['as' => 'login', 'uses' => 'LoginController@getLogin']);
Route::post('login',['as' => 'postLogin', 'uses' => 'LoginController@postLogin']);
Route::get('logout',['as' => 'getLogout', 'uses' => 'LoginController@getLogout']);
// Route::group(['middleware'=>'isroleadmin'], function(){
//     Route::group(['prefix' => 'admin'], function(){
//         Route::get('/', ['as' => 'admin-dashboard' ,'uses' => 'AdminController@getIndex']);
//     });

// });

Route::get('test',function(){
    echo '<br>Guard check'.Auth::guard('admin')->check();
});

Route::get('fb-go',['uses'=>'FacebookController@fbGo']);
Route::get('fb-callback',['uses'=>'FacebookController@fbCallback']);
Route::group(['prefix' => 'app'], function(){
    Route::get('{slug}/{id}',['uses'=>'GuestController@getAppView']);
    Route::get('{slug}/{id}/{imagedomain}/{date}/{uniquename}',['uses'=>'GuestController@getAppViewShare']);
    Route::get('loading/{slug}/{id}/{imagedomain}/{day}/{uniquename}/{jobId}',['uses'=>'GuestController@getAppLoading']);
    Route::get('result/{slug}/{id}/{imagedomain}/{day}/{uniquename}',['uses'=>'GuestController@getAppResult']);
    
 });

 Route::get('check-job/{jobid}',['uses'=>'FacebookController@getCheckJob']);

//Auth::routes();

Route::group(['middleware'=>'isroleadmin'], function(){
    Route::group(['prefix' => 'admin'], function(){
     //   Route::get('/', ['as' => 'admin-dashboard' ,'uses' => 'AdminController@getIndex']);
        Route::get('/home', 'Admin\HomeController@index');
            
        // Route::resource('apps', 'Admin\AppController');
        Route::group(['prefix' => 'apps'], function(){
            Route::get('/',['as'=>'app-index','uses'=>'Admin\AppController@index']);
            Route::get('create',['as'=>'app-create','uses'=>'Admin\AppController@create']);
            Route::post('create',['as'=>'app-post-create','uses'=>'Admin\AppController@postCreate']);
            Route::get('{id}/edit',['as'=>'app-edit','uses'=>'Admin\AppController@edit']);
            Route::post('{id}/edit',['as'=>'app-post-edit','uses'=>'Admin\AppController@postEdit']);
            Route::get('{id}',['as'=>'app-get-detail','uses'=>'Admin\AppController@show']);

           

        });
        Route::group(['prefix' => 'tools'], function(){
            Route::get('upload-code',['as'=>'get-tool-upload','uses'=>'ToolController@getUploadCode']);
            Route::post('upload-code',['as'=>'post-tool-upload','uses'=>'ToolController@postUploadCode']);
            Route::get('override',['as'=>'get-tool-override','uses'=>'ToolController@getOverride']);
            Route::post('override',['as'=>'post-tool-override','uses'=>'ToolController@postOverride']);
        });
        Route::group(['prefix' => 'app-hot'], function(){
            Route::get('/',['as'=>'get-app-list-hot','uses'=>'Admin\AppController@getListAppHot']);
            Route::get('create',['as'=>'get-app-create-hot','uses'=>'Admin\AppController@getCreateAppHot']);
            Route::post('create',['as'=>'post-app-create-hot','uses'=>'Admin\AppController@postCreateAppHot']);
       //     Route::post('order',['as'=>'post-app-order-hot','uses'=>'Admin\AppController@postOrderAppHot']);
        });

        Route::group(['prefix' => 'test-apps'], function(){
            Route::get('{slug}/{id}',['uses'=>'Admin\HomeController@getAppView']);
            Route::get('{slug}/{id}/{imagedomain}/{date}/{uniquename}',['uses'=>'Admin\HomeController@getAppViewShare']);
            Route::get('loading/{slug}/{id}/{imagedomain}/{day}/{uniquename}/{jobId}',['uses'=>'Admin\HomeController@getAppLoading']);
            Route::get('result/{slug}/{id}/{imagedomain}/{day}/{uniquename}',['uses'=>'Admin\HomeController@getAppResult']);
            Route::get('fb-go',['uses'=>'Admin\HomeController@fbGo']);
            Route::get('fb-callback',['uses'=>'Admin\HomeController@fbCallback']);
        });
        
        Route::resource('categories', 'Admin\CategoryController');
        Route::resource('users', 'Admin\UserController');
    });

});




