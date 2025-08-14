<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\TeamRequest;
use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $page = $request->input('current', 1);
        $size = $request->input('pageSize', 15);

        $data = Team::without('children')->select();

        return apiResponse($data->paginate($size, ['*'], 'current', $page));
    }

    public function options()
    {
        $data = Team::whereNull('parent_id')->get();

        return apiResponse($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TeamRequest $request)
    {
        $team = Team::create($request->getAttributes());

        return apiResponse($team);
    }

    /**
     * Display the specified resource.
     */
    public function show(Team $team)
    {
        return apiResponse($team);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TeamRequest $request, Team $team)
    {
        $team->update($request->getAttributes($team));

        return apiResponse($team);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Team $team)
    {
        $request->user()->checkOrThrow("team:$team->id:delete");

        $team->delete();

        return apiResponse();
    }
}
