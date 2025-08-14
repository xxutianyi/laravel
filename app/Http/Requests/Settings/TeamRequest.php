<?php

namespace App\Http\Requests\Settings;

use App\Http\Requests\Request;
use App\Models\Team;
use Illuminate\Validation\ValidationException;

class TeamRequest extends Request
{
    public function authorize(): bool
    {
        if ($this->filled('id')) {
            return $this->user()->check("team:$this->id:write");
        }

        return $this->user()->check('team:*:write');

    }

    public function rules(): array
    {
        return [
            'name' => 'required',
            'parent_id' => ['nullable', 'exists:teams,id'],
        ];
    }

    public function getAttributes(?Team $team = null): array
    {
        $validated = $this->validated();

        if (array_key_exists('parent_id', $validated)) {

            if ($team && $validated['parent_id'] == $team->id) {
                unset($validated['parent_id']);

                throw ValidationException::withMessages([
                    'parent_id' => '上级部门不可选择部门本身',
                ]);
            } else {
                $validated['path'] = Team::find($validated['parent_id'])->path.'/'.$validated['name'];
            }

        } else {
            $validated['parent_id'] = null;
            $validated['path'] = $validated['name'];
        }

        return $validated;
    }
}
