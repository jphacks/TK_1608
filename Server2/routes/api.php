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
//header('Access-Control-Allow-Origin:  *');
//header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
//header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::get('/line/push/{userId}/{message}', 'LineAPIController@pushMessage');
Route::post('/line/recieve', 'LineAPIController@recieveMessage');
Route::get('/mode/now', 'ModeAPIController@getMode');
Route::get('/mode/change/{modename}', 'ModeAPIController@changeMode');
Route::get('/shiritori/newmessage', 'ShiritoriAPIController@getNewMessage');
Route::get('/chat/newmessage', 'ChatAPIController@getNewMessage');
