<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        Route::macro('inertia', function ($uri, $component, $props = []) {
            return Route::get($uri, fn () => inertia($component, $props));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

        RateLimiter::for('verify', function (Request $request) {
            return Limit::perSecond(1, 30)->by($request->ip());
        });

        RateLimiter::for('openapi', function (Request $request) {
            return Limit::perSecond(1)->by($request->user() ?: $request->ip());
        });
    }
}
