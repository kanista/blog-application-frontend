import React from 'react';
import { Avatar, Typography } from 'antd';
import {UserOutlined} from "@ant-design/icons";

const { Text } = Typography;


const Comment = ({ comment }) => (
    <div className="comment" style={{
        backgroundColor: '#f5f5f5',
        padding: '12px',
        marginBottom: '12px',
        borderRadius: '8px',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
        maxWidth: '100%',
    }}>
        <Avatar icon={<UserOutlined />} />
        <div style={{ flex: 1 }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
            }}>
                <Text strong>{comment.user?.name || 'User'}</Text>
                <Text type="secondary" style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>
                    {new Date(comment.createdAt).toLocaleDateString()}
                </Text>
            </div>
            <div style={{ marginTop: '4px', wordWrap: 'break-word', maxWidth: '320px' }}>
                <Text>{comment.body}</Text>
            </div>
        </div>
    </div>
);

export default Comment;
