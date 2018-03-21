<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


//Route::resource('categories', 'CategoryAPIController');

//Route::resource('apps', 'AppAPIController');

Route::group(['prefix' => 'apps'], function(){
    //   Route::get('/', ['as' => 'admin-dashboard' ,'uses' => 'AdminController@getIndex']);
       Route::get('listapps', 'AppAPIController@listapps');
       Route::get('total', 'AppAPIController@total');
       Route::get('set-status/{id}/{status}', 'AppAPIController@setStatus');
       
       Route::get('delete/{id}', 'AppAPIController@delete');
       Route::get('listappsnew', 'AppAPIController@listAppsNew');
      
});
Route::group(['prefix' => 'app-hot'], function(){
    Route::post('order',['as'=>'post-app-order-hot','uses'=>'AppAPIController@postOrderAppHot']);
       
      
});
Route::get('related/quizzes.json',['uses'=>'AppAPIController@getAppDetail']);
