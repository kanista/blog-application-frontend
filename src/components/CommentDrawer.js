import React, { useEffect, useState } from 'react';
import { Button, Drawer, Input } from 'antd';
import {addCommentToPost, getCommentsByPostId} from '../service/BlogService';
import Comment from './Comment';
import Alert from './Alert';
const { TextArea } = Input;

const CommentDrawer = ({ visible, onClose, postId, initialComments }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    console.log(comments)

    const fetchComments = async (postId) => {
        try {
            const response = await getCommentsByPostId(postId);
            setComments(response.data)
        } catch (error) {
            console.error("Failed to fetch comments:", error);
        }
    };

    const handleAddComment = async () => {
        if (newComment.trim()) {
            try {
                const response = await addCommentToPost(postId, newComment);
                setAlertMessage(response.message || 'Comment added successfully!');
                setAlertType('success');
                await fetchComments(postId);
                setNewComment('');
            } catch (error) {
                console.error('Failed to add comment:', error);
                setAlertMessage(error.message || 'Failed to add comment');
                setAlertType('error');
            }
        }
    };

    useEffect(() => {
        // Set comments to initialComments when initialComments prop changes
        if (initialComments?.length) {
            setComments(initialComments);
        }
    }, [initialComments]);

    return (
        <Drawer
            title="Comments"
            placement="right"
            onClose={onClose}
            open={visible}
            width={400}
        >
            {alertMessage && (
                <Alert
                    message={alertMessage}
                    type={alertType}
                    onClose={() => setAlertMessage('')}
                    style={{ marginBottom: 16 }}
                />
            )}

            <TextArea
                rows={4}
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                style={{ marginBottom: 8 }}
            />
            <Button
                type="primary"
                onClick={handleAddComment}
                block
                disabled={!newComment.trim()}
            >
                Add Comment
            </Button>

            <div className="comments-section" style={{ marginTop: 16 }}>
                {comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        </Drawer>
    );
};

export default CommentDrawer;

