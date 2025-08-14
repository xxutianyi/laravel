<?php

namespace App\Http\Requests\Settings;

use App\Http\Requests\Request;

class ClientRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if ($this->filled('id')) {
            return $this->user()->check("client:$this->id:write");
        }

        return $this->user()->check('client:*:write');

    }

    public function rules(): array
    {
        return [
            'name' => 'required',
            'icon' => 'nullable',
            'home' => 'nullable',
            'tags' => 'nullable',
            'permissions' => 'nullable',
            'description' => 'nullable',
            'redirect_uris' => 'required',
        ];
    }

    public function customAttributes(): array
    {
        return $this->only(['icon', 'home',  'description', 'permissions']);
    }
}
