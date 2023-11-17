<?php


use App\Http\Controllers\Api\Map_pinController;
use App\Http\Controllers\MessageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/user', function (Request $request) {
    return $request->user() ?? ["unauthorized" => true];
});

//map_pin controller
Route::get('/map-pins', [Map_pinController::class, 'index'])->name('pins');
Route::delete('/map-pins/{id}', [Map_pinController::class, 'delete'])->name('delete');
Route::get('/map-pins/edit/{id}', [Map_pinController::class, 'edit'])->name('edit');
Route::get('/map-pins/show/{id}', [Map_pinController::class, 'show'])->name('show');
//message controller
Route::get('/messages', [MessageController::class, 'index'])->name('messages');
Route::post('/messages/store', [MessageController::class, 'store'])->name('message.store');

