<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function __invoke(Request $request)
    {
        $permissions = allPermissions();

        return apiResponse($permissions);
    }
}
