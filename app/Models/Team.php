<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Team extends Model
{
    use HasUuids;

    protected $fillable = [
        'name',
        'path',
        'parent_id',
    ];

    protected $with = [
        'children',
    ];

    protected function casts(): array
    {
        return [
            'users.permissions' => 'array',
        ];
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Team::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Team::class, 'parent_id');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'team_user')
            ->using(TeamUser::class);
    }

    public function delete(): ?bool
    {
        Team::where('parent_id', $this->id)
            ->update(['parent_id' => $this->parent_id ?: null]);

        if ($this->parent_id) {
            TeamUser::where('team_id', $this->id)
                ->update(['team_id' => $this->parent_id]);
        } else {
            TeamUser::where('team_id', $this->id)
                ->delete();
        }

        Team::updatePaths();

        return parent::delete();
    }

    public static function updatePaths(): void
    {
        Team::whereNull('parent_id')->each(function ($team) {
            $team->path = $team->name;
            $team->save();
        });

        Team::whereNotNull('parent_id')->each(function ($team) {
            $team->path = Team::find($team->parent_id)->path.'/'.$team->name;
            $team->save();
        });
    }
}
