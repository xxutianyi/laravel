<?php

use App\Models\Team;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

if (! function_exists('redirectToLogin')) {
    function redirectToLogin(Request $request): string
    {
        $intended = urlencode($request->fullUrl());

        return "/login?redirectUri=$intended";
    }
}

if (! function_exists('apiResponse')) {

    define('API_RESPONSE_INFO', 1);
    define('API_RESPONSE_WARN', 2);
    define('API_RESPONSE_ERROR', 3);

    function apiResponse($data = null, $message = 'success', $code = 0, $showType = 0, $headers = []): JsonResponse
    {
        $data = [
            'code' => $code,
            'data' => $data,
            'type' => $showType,
            'message' => $message,
        ];

        return response()->json($data, 200, $headers);
    }
}

if (! function_exists('allPermissions')) {
    function allPermissions(): array
    {
        $permissions = [];

        $permissions[] = '*';

        $permissions[] = 'user:*';
        $permissions[] = 'user:*:read';
        $permissions[] = 'user:*:read:phone';
        $permissions[] = 'user:*:read:email';
        $permissions[] = 'user:*:write';
        $permissions[] = 'user:*:delete';
        $permissions[] = 'user:*:write:permission';

        $permissions[] = 'team:*';
        $permissions[] = 'team:*:read';
        $permissions[] = 'team:*:write';
        $permissions[] = 'team:*:delete';

        Team::all()->map(function ($team) use (&$permissions) {
            $permissions[] = "team:$team->id:*";
            $permissions[] = "team:$team->id:read";
            $permissions[] = "team:$team->id:write";
            $permissions[] = "team:$team->id:read:users";
            $permissions[] = "team:$team->id:write:users";
            $permissions[] = "team:$team->id:delete:users";
        });

        return $permissions;
    }
}
