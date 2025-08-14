'use client';

import { imageToBase64 } from '@/lib/utils';
import { PlusOutlined } from '@ant-design/icons';
import { useCountDown } from 'ahooks';
import { Button, Form, Input, Tooltip, Upload, UploadProps } from 'antd';
import { InputProps } from 'antd/es/input';
import clsx from 'clsx';
import { useState } from 'react';

interface CustomInputProps {
    value?: string;
    onChange?: (value: string) => void;
}

interface SmsVerifyInputProps extends Omit<InputProps, 'onChange' | 'value'>, CustomInputProps {
    numberField?: string;
    onSendMessage?: (number: string) => void;
}

interface Base64ImageUploaderProps extends CustomInputProps {
    size?: number;
    listType?: UploadProps['listType'];
}

export function SmsVerifyInput(props: SmsVerifyInputProps) {
    const { value, onChange, onSendMessage, numberField, ...inputProps } = props;

    const form = Form.useFormInstance();
    const [targetDate, setTargetDate] = useState<number>();
    const [countdown] = useCountDown({ targetDate });
    const seconds = Math.round(countdown / 1000);

    function sendCode() {
        form.validateFields([numberField ?? 'mobile'])
            .then(() => {
                setTargetDate(Date.now() + 1000 * 30);
                onSendMessage?.(form.getFieldValue(numberField ?? 'mobile'));
            })
            .catch(() => {});
    }

    return (
        <div className="grid grid-cols-3 gap-2">
            <Input
                {...inputProps}
                className="col-span-2"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
            />
            <Button onClick={sendCode} disabled={seconds !== 0} className="col-span-1">
                {seconds === 0 ? '获取验证码' : `${seconds}秒后重试`}
            </Button>
        </div>
    );
}

export function Base64ImageUploader({ value, onChange, size, listType }: Base64ImageUploaderProps) {
    return (
        <div className="flex items-center justify-center">
            <Upload
                style={{ width: size ?? 102, height: size ?? 102 }}
                listType={listType ?? 'picture-card'}
                showUploadList={false}
                beforeUpload={async (file) => {
                    const url = await imageToBase64(file);
                    onChange?.(url);
                    return false;
                }}
            >
                {value ? (
                    <Tooltip title="点击上传新图片">
                        <img
                            src={value}
                            alt="image"
                            className={clsx(
                                'cover h-full w-full',
                                listType === 'picture-circle' ? 'rounded-full' : 'rounded-xl',
                            )}
                        />
                    </Tooltip>
                ) : (
                    <button style={{ border: 0, background: 'none' }} type="button">
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>上传图片</div>
                    </button>
                )}
            </Upload>
        </div>
    );
}
