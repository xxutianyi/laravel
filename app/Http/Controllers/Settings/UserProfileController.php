<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Rules\PhoneNumber;
use Illuminate\Http\Request;

class UserProfileController extends Controller
{
    public function show(Request $request)
    {
        return apiResponse($request->user());
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => ['required', 'not_in:users', new PhoneNumber],
            'email' => ['nullable', 'email', 'max:255', 'not_in:users'],
            'avatar' => ['string'],
        ]);

        $request->user()->update($validated);

        return apiResponse($request->user());
    }
}
