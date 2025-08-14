import { CaretDownFilled } from '@ant-design/icons';
import { Tree as AntdTree, TreeDataNode, TreeProps } from 'antd';
import React from 'react';

export interface WithChildren<T = unknown> {
    children?: WithChildren<T>[];
}

export interface XuDevTree<T extends Record<string, string | any>>
    extends Omit<TreeProps, 'fieldNames' | 'treeData'> {
    fieldNames: {
        key: keyof T;
        title: keyof T;
    };
    action?: React.FC<{ entity: T }>;
    treeData: (WithChildren<T> | T)[];
}

export function Tree<T extends Record<string, string | any>>(props: XuDevTree<T>) {
    const { fieldNames, action, treeData, ...treeProps } = props;
    const Action = action;

    const switcherIcon = (
        <div style={{ height: '100%', lineHeight: '44px' }}>
            <CaretDownFilled style={{ lineHeight: '44px' }} />
        </div>
    );

    const titleRender = (node: T) => (
        <div style={{ display: 'flex' }} key={node[fieldNames.key ?? 'id']}>
            <span
                style={{
                    paddingLeft: 4,
                    paddingRight: 4,
                    fontSize: 14,
                    lineHeight: '44px',
                }}
            >
                {`${node[fieldNames.title]}`}
            </span>
            {Action && <Action entity={node} />}
        </div>
    );

    return (
        <AntdTree<any>
            className="custom-tree"
            treeData={treeData as unknown as TreeDataNode[]}
            blockNode={true}
            defaultExpandAll={true}
            switcherIcon={switcherIcon}
            fieldNames={fieldNames as any}
            titleRender={titleRender}
            {...treeProps}
        />
    );
}
