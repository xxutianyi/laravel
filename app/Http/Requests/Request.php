<?php

namespace App\Http\Requests;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Http\FormRequest;

class Request extends FormRequest
{
    protected function failedAuthorization()
    {
        throw new AuthorizationException('权限不足，无法完成操作');
    }
}
