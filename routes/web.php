<?php

use Illuminate\Support\Facades\Route;

Route::redirect('/', '/apps');

Route::middleware('guest')->group(function () {
    Route::inertia('/login', 'Auth/Login');
    Route::inertia('/register', 'Auth/Register');
});

Route::middleware('auth')->group(function () {
    Route::inertia('/apps', 'apps');
    Route::inertia('/userinfo', 'UserInfo');
    Route::inertia('/organize', 'Organize');
});
