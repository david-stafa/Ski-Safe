<?php


use App\Http\Controllers\Api\Map_pinController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\UserProfileController; 
use App\Http\Controllers\Api\Admin\AdminController; 
use App\Http\Controllers\Api\Admin\RoleController; 
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
    return $request->user() ?? ["unauthorized"=> true];
});


Route::get('/map-pins', [Map_pinController::class, 'index'])->name('pins');
Route::get('/messages', [MessageController::class, 'index'])->name('messages');
Route::post('/messages/store', [MessageController::class, 'store'])->name('message.store');
Route::post("/profile", [UserProfileController::class, 'update'])->name("profile.update");


Route::middleware(['auth', 'can:admin'])->group(function() { // using can:: will save us from making any conditions in the AdminController

    Route::get('/admin', [AdminController::class, 'showJson']);
    Route::get('/user-roles', [RoleController::class, "getAllRoles"]);
    Route::post('/user-roles/update', [RoleController::class, "updateRole"]);
});