<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IssuesController;
use App\Http\Controllers\VotesController;
use App\Http\Controllers\HomeController;


Route::get('/', function () {
    return view('welcome');
});
Auth::routes();


// Mandatory Routes

Route::post('/issue/join', 		[IssuesController::class, 	'joinIssue']);
Route::post('/issue/vote',	 	[VotesController::class, 	'sendVote']);
Route::get( '/issue/{issueId}', [IssuesController::class, 	'fetchIssueInfo']);


// End Mandatory Routes

Route::post('/issue/update', 	[IssuesController::class, 	'updateIssue']);
Route::get('/get/issues', 		[IssuesController::class,	'getIssues']);
Route::get('/list/issues', 		[IssuesController::class, 	'index']);
Route::post('/votes/get', 		[VotesController::class, 	'fecthVotes']);
Route::get('/test', 			[VotesController::class, 	'test']);
Route::get('/home', 			[HomeController::class, 	'index'])->name('home');

