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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//map_pin controller
Route::get('/map-pins', [Map_pinController::class, 'index'])->name('pins');
Route::get('/map-pins/{id}', [Map_pinController::class, 'destroy'])->name('destroy');
//message controller
Route::get('/messages', [MessageController::class, 'index'])->name('messages');
Route::post('/messages/store', [MessageController::class, 'store'])->name('message.store');

