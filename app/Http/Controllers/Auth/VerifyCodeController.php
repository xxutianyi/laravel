<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Rules\PhoneNumber;
use Illuminate\Http\Request;
use Wisdech\SMSVerify\Facade\SMS;

class VerifyCodeController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'phone' => ['required', new PhoneNumber],
        ]);

        SMS::sendVerifyCode($validated['phone']);

        return apiResponse();
    }
}
