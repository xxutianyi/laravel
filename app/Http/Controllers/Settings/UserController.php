<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $page = $request->input('current', 1);
        $size = $request->input('pageSize', 15);

        $data = User::select();

        if ($request->filled('team_id')) {
            $data->whereRelation('teams', 'teams.id', $request->input('team_id'));
        }

        return apiResponse($data->paginate($size, ['*'], 'current', $page));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $user = User::create([
            ...$request->getAttributes(),
            'password' => Hash::make($request->get('phone')),
        ]);

        $user->teams()->sync($request->validated('team_ids'));

        return apiResponse($user);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return apiResponse($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user)
    {
        $user->update($request->getAttributes());
        $user->teams()->sync([]);
        $user->teams()->sync($request->validated('team_ids'));

        return apiResponse($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, User $user)
    {
        $request->user()->checkOrThrow("team:$user->id:delete");

        $user->delete();

        return apiResponse();
    }
}
