<?php

namespace App\Http\Requests\Auth;

use App\Rules\PhoneNumber;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Wisdech\SMSVerify\Facade\SMS;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'phone' => ['required', 'string', 'exists:users', new PhoneNumber],
            'code' => ['required_without:password', 'string'],
            'password' => ['required_without:code', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'phone.exists' => '手机号未注册',
        ];
    }

    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        $success = false;

        if ($this->filled('code')) {
            $success = SMS::checkVerifyCode($this->input('phone'), $this->input('code'));
        }

        if ($this->filled('password')) {
            $success = Auth::attempt($this->only('phone', 'password'), $this->boolean('remember'));

        }

        if (! $success) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'phone' => __('auth.failed'),
            ]);
        }

        RateLimiter::clear($this->throttleKey());
    }

    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'phone' => __('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->string('phone')).'|'.$this->ip());
    }
}
