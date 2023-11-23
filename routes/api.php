<?php


use App\Http\Controllers\Api\Map_pinController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\Api\Admin\AdminController;
use App\Http\Controllers\Api\Admin\RoleController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\ThreadsController;
use App\Http\Controllers\UploadController;
use App\Models\Upload;
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
Route::get('/hazard-pins', [Map_pinController::class, 'getHazards'])->name('hazards');
Route::get('/lift-pins', [Map_pinController::class, 'getLifts'])->name('lifts');
Route::get('/poi-pins', [Map_pinController::class, 'getPois'])->name('pois');

Route::post('/pin/store', [Map_pinController::class, 'store'])->name('pins.store');

Route::delete('/map-pins/{id}', [Map_pinController::class, 'delete'])->name('delete');
Route::post('/map-pins/edit/{id}', [Map_pinController::class, 'edit'])->name('edit');
Route::get('/map-pins/show/{id}', [Map_pinController::class, 'show'])->name('show');

Route::get('/search-pins', [Map_pinController::class, 'search'])->name('search.pins');

// Messages
Route::get('/messages', [MessageController::class, 'index'])->name('messages');
Route::post('/messages/store', [MessageController::class, 'store'])->name('message.store');
Route::put('/messages/{id}', [MessageController::class, 'update']);

Route::post("/profile", [UserProfileController::class, 'update'])->name("profile.update");


// File Uploads
Route::get('/uploads', [UploadController::class, 'index']);
Route::get('/uploads/user', [UploadController::class, 'getUserUploads']);
Route::post('/uploads/{id}/set-profile-picture', [UploadController::class, 'setAsProfilePicture']);
Route::get('/uploads/{id}', [UploadController::class, 'show']);
Route::post('/uploads', [UploadController::class, 'store']);
Route::put('/uploadsupdate/{id}', [UploadController::class, 'update']);
Route::delete('/uploadsdelete/{id}', [UploadController::class, 'destroy']);
Route::get('/map-pin-image/{mapPinId}', [UploadController::class, 'getMapPinImage']);


Route::middleware(['auth', 'can:admin'])->group(function () { // using can:: will save us from making any conditions in the AdminController

    Route::get('/admin', [AdminController::class, 'showJson']);
    Route::get('/user-roles', [RoleController::class, "getAllRoles"]);
    Route::post('/user-roles/update', [RoleController::class, "updateRole"]);
    Route::resource('/events', EventController::class);

});

// FORUM
// Threads
Route::get('/forum/threads', [ThreadsController::class, 'index']);
Route::get('/forum/threads/{id}', [ThreadsController::class, 'show']);
Route::post('/forum/threads/create', [ThreadsController::class, 'store']);
Route::post('/forum/threads/update/{id}', [ThreadsController::class, 'update']);
Route::delete('/forum/threads/delete/{id}', [ThreadsController::class, 'destroy']);

//Posts
Route::post('/forum/posts/create', [PostsController::class, 'store']);
Route::delete('/forum/posts/delete/{id}', [PostsController::class, 'destroy']);
