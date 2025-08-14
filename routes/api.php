<?php

use App\Http\Controllers as WebApi;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => apiResponse());

Route::prefix('auth')->middleware('web')->group(function () {
    Route::post('login', [WebApi\Auth\LoginController::class, 'store'])->middleware('guest');
    Route::post('logout', [WebApi\Auth\LoginController::class, 'destroy'])->middleware('auth');
    Route::post('verify-code', [WebApi\Auth\VerifyCodeController::class, 'store'])->middleware('throttle:verify');
});

Route::middleware('auth')->group(function () {
    Route::put('/password', [WebApi\Settings\PasswordController::class, 'update']);
    Route::get('/profile', [WebApi\Settings\UserProfileController::class, 'show']);
    Route::put('/profile', [WebApi\Settings\UserProfileController::class, 'update']);
    Route::get('/permissions', WebApi\Settings\PermissionController::class);
    Route::get('/teams/options', [WebApi\Settings\TeamController::class, 'options']);
    Route::apiResource('/users', WebApi\Settings\UserController::class);
    Route::apiResource('/teams', WebApi\Settings\TeamController::class);
});
