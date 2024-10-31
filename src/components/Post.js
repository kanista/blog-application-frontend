import React from 'react';
import { Button } from 'antd';

const Post = ({ post, index, onViewComments }) => {

    console.log(post);

    return (
        <div className={`post-container ${index % 2 === 0 ? 'left-align' : 'right-align'}`}>
            <div className="post-image">
                <img src={post.imageUrl || 'https://via.placeholder.com/150'} alt={post.title} />
            </div>
            <div className="post-content">
                <h2>{post.title}</h2>
                <p>{post.body.substring(0, 150)}...</p>
                <p><strong>Author:</strong> {post.user.name}</p>
                <Button onClick={() => onViewComments(post.id, post.comment)}>View Comments</Button>
            </div>
        </div>
    );
};

export default Post;

