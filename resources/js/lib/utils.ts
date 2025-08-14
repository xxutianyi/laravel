import { GetProp, UploadProps } from 'antd';
import React from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export async function imageToBase64(image: FileType): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result as string);
        };
        reader.onerror = () => {
            reject();
        };
        reader.readAsDataURL(image);
    });
}

export function stopPropagation(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    e.stopPropagation();
}
