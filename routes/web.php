<?php

use Illuminate\Support\Facades\Route;

Route::redirect('/', '/apps');

Route::middleware('guest')->group(function () {
    Route::inertia('/login', 'auth/login');
    Route::inertia('/register', 'auth/register');
});

Route::middleware('auth')->group(function () {
    Route::inertia('/apps', 'apps');
    Route::inertia('/userinfo', 'userinfo');
    Route::inertia('/organize', 'organize');
    Route::inertia('/settings', 'settings');
});
