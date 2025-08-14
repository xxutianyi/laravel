<?php

namespace App\Http\Requests\Settings;

use App\Http\Requests\Request;
use App\Models\User;
use App\Rules\PhoneNumber;
use Illuminate\Validation\Rule;

class UserRequest extends Request
{
    public function authorize(): bool
    {
        return $this->user()->check('user:*:write');
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'phone' => ['required', 'not_in:users', new PhoneNumber],
            'email' => ['nullable', 'email', 'max:255', 'not_in:users'],
            'team_ids' => ['nullable', 'array', 'exists:teams,id'],
            'permissions' => ['nullable', 'array', Rule::in(allPermissions())],
        ];
    }

    public function messages(): array
    {
        return [
            'team_ids.exists' => '所选团队不存在',
            'permissions.in' => '权限代码不再可选范围内',
        ];
    }

    public function getAttributes(?User $user = null): array
    {
        return $this->validated();
    }
}
