<?php

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Wisdech\SMSVerify\Exception\SMSException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->statefulApi();
        $middleware->encryptCookies();
        $middleware->redirectUsersTo('/apps');
        $middleware->redirectGuestsTo(fn($request) => redirectToLogin($request));

        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function (Response $response, Throwable $e, Request $request) {
            if ($request->expectsJson()) {

                if (is_a($e, AuthenticationException::class)) {
                    return apiResponse(null, $e->getMessage(), 401, API_RESPONSE_WARN);
                }

                if (is_a($e, ValidationException::class)) {
                    return apiResponse(null, $e->getMessage(), 422, API_RESPONSE_WARN);
                }

                if (is_a($e, ModelNotFoundException::class)) {
                    return apiResponse(null, $e->getMessage(), 404, API_RESPONSE_ERROR);
                }

                if (is_a($e, NotFoundHttpException::class)) {
                    return apiResponse(null, '请求的路径不存在', 404, API_RESPONSE_ERROR);
                }

                if (is_a($e, SMSException::class)) {
                    return apiResponse(null, $e->getMessage(), 600, API_RESPONSE_WARN);
                }

                return apiResponse($e->getTrace(), $e->getMessage(), -1, API_RESPONSE_ERROR);
            } else {

                $inertiaEnv = !app()->environment(['local', 'testing']);
                $inertiaStatus = in_array($response->getStatusCode(), [500, 503, 404, 403, 419]);

                if ($inertiaEnv && $inertiaStatus) {
                    return inertia('ErrorPage', ['status' => $response->getStatusCode()])
                        ->toResponse($request)
                        ->setStatusCode($response->getStatusCode());
                }
            }

            return $response;
        });
    })->create();
