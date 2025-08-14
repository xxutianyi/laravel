<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class PhoneNumber implements ValidationRule
{
    /**
     * 运行验证规则。
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $pattern = "/^1(3[0-9]|4[014-9]|5[0-35-9]|6|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/";

        if (! preg_match($pattern, $value)) {
            $fail('手机号格式不正确');
        }
    }
}
