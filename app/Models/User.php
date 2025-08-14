<?php

namespace App\Models;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasUuids,Notifiable;

    protected $fillable = [
        'name',
        'phone',
        'email',
        'avatar',
        'password',
        'permissions',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $with = ['teams'];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'permissions' => 'array',
            'teams.permissions' => 'array',
        ];
    }

    public function teams(): BelongsToMany
    {
        return $this->belongsToMany(Team::class)
            ->using(TeamUser::class)
            ->without('children');
    }

    public function check(string $check): bool
    {
        $permit = false;

        array_map(function ($permission) use (&$permit, $check) {
            if ($permission == '*') {
                $permit = true;
            }

            $permission = str_replace('*', '(.*)', $permission);

            if (preg_match("/^{$permission}$/", $check)) {
                $permit = true;
            }

        }, $this->permissions);

        return $permit;
    }

    public function checkOrThrow(string $permission): void
    {
        if (! $this->check($permission)) {
            throw new AuthorizationException('权限不足，无法完成操作');
        }
    }
}
