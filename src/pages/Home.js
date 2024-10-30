// import React, { useEffect, useState } from 'react';
// import {Button, Drawer, Layout, Menu, theme} from 'antd';
// import './Home.scss';
// import {addCommentToPost, getAllBlogs, getCommentsByPostId} from "../service/BlogService";
// import TextArea from "antd/es/input/TextArea";
//
// const { Header, Content } = Layout;
//
// const items = [
//     { key: 1, label: "Home" },
//     { key: 2, label: "Profile" },
//     { key: 3, label: "Create Blog" }
// ];
//
// const Home = () => {
//     const [posts, setPosts] = useState([]);
//     const [comments, setComments] = useState({});
//     const [drawerVisible, setDrawerVisible] = useState(false);
//     const [currentPostId, setCurrentPostId] = useState(null);
//     const [newComment, setNewComment] = useState("");
//     const [alertMessage, setAlertMessage] = useState(''); // Alert message state
//     const [alertType, setAlertType] = useState(''); // 'success' or 'error'
//
//     const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
//
//     // Fetch all blog posts from backend
//     const fetchAllBlog = async () => {
//         try {
//             const response = await getAllBlogs();
//             setPosts(response.data);  // Set posts when response is successful
//         } catch (error) {
//             console.error("Failed to fetch posts:", error);  // Error handling
//         }
//     };
//
//     const fetchComments = async (postId) => {
//         try {
//             const response = await getCommentsByPostId(postId);
//             console.log(response)
//             setComments(prevComments => ({
//                 ...prevComments,
//                 [postId]: response.data
//             }));
//         } catch (error) {
//             console.error("Failed to fetch comments:", error);
//         }
//     };
//
//     const openCommentsDrawer = (postId) => {
//         setCurrentPostId(postId);
//         fetchComments(postId);
//         setDrawerVisible(true);
//     };
//
//     const handleAddComment = async () => {
//         if (newComment.trim()) {
//             try {
//                 const response =await addCommentToPost(currentPostId, newComment);  // Assuming the function is implemented in BlogService
//                 setAlertMessage(response.message || "Comment successful!");
//                 setAlertType("success");
//
//                 fetchComments(currentPostId);  // Refresh comments after adding a new one
//                 setNewComment("");  // Clear the input
//             } catch (error) {
//                 console.error("Failed to add comment:", error);
//                 // Display error message
//                 setAlertMessage(error.message || "Failed to add comment");
//                 setAlertType("error");
//             }
//         }
//     };
//
//     useEffect(() => {
//         fetchAllBlog();  // Fetch posts when component mounts
//     }, []);
//
//     return (
//         <Layout>
//             <Header style={{ display: 'flex', alignItems: 'center' }}>
//                 <Menu
//                     theme="dark"
//                     mode="horizontal"
//                     defaultSelectedKeys={['1']}
//                     items={items}
//                     style={{ flex: 1, minWidth: 0 }}
//                 />
//             </Header>
//             <Content style={{ padding: '0 48px' }}>
//                 <div
//                     style={{
//                         background: colorBgContainer,
//                         minHeight: 280,
//                         padding: 24,
//                         borderRadius: borderRadiusLG,
//                     }}
//                 >
//                     {posts.length > 0 ? (
//                         <div className="post-list">
//                             {posts.map((post, index) => (
//                                 <div
//                                     key={post.id}
//                                     className={`post-container ${index % 2 === 0 ? 'left-align' : 'right-align'}`}
//                                 >
//                                     <div className="post-image">
//                                         <img
//                                             src={post.imageUrl || 'https://via.placeholder.com/150'}  // Fallback image
//                                             alt={post.title}
//                                         />
//                                     </div>
//                                     <div className="post-content">
//                                         <h2>{post.title}</h2>
//                                         <p>{post.body.substring(0, 150)}...</p>
//                                         <p><strong>Author:</strong> {post.user.name}</p>
//                                         <Button onClick={() => openCommentsDrawer(post.id)}>View Comments</Button>
//                                         <div className="comments-section">
//                                             {(comments[post.id] || []).map(comment => (
//                                                 <div key={comment.id} className="comment">
//                                                     <p><strong>{comment.createdAt}</strong>: {comment.body}</p>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <p>Loading posts...</p>
//                     )}
//                 </div>
//             </Content>
//
//             <Drawer
//                 title="Comments"
//                 placement="right"
//                 onClose={() => setDrawerVisible(false)}
//                 visible={drawerVisible}
//                 width={400}
//             >
//                 <div className="comments-section">
//                     {(comments[currentPostId] || []).map(comment => (
//                         <div key={comment.id} className="comment">
//                             <p><strong>{comment.createdAt}</strong>: {comment.body}</p>
//                         </div>
//                     ))}
//                     <TextArea
//                         rows={4}
//                         placeholder="Write a comment..."
//                         value={newComment}
//                         onChange={(e) => setNewComment(e.target.value)}
//                         style={{ marginTop: 16 }}
//                     />
//                     <Button
//                         type="primary"
//                         onClick={handleAddComment}
//                         style={{ marginTop: 8 }}
//                         disabled={!newComment.trim()}
//                     >
//                         Add Comment
//                     </Button>
//                 </div>
//             </Drawer>
//         </Layout>
//     );
// }
//
// export default Home;

import React, { useEffect, useState } from 'react';
import {Avatar, Button, Drawer, Layout, Menu, theme, Typography} from 'antd';
import './Home.scss';
import { addCommentToPost, getAllBlogs, getCommentsByPostId } from "../service/BlogService";
import TextArea from "antd/es/input/TextArea";

const { Header, Content } = Layout;
const { Text } = Typography;

const items = [
    { key: 1, label: "Home" },
    { key: 2, label: "Profile" },
    { key: 3, label: "Create Blog" }
];

function UserOutlined() {
    return null;
}

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({});
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [currentPostId, setCurrentPostId] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [alertMessage, setAlertMessage] = useState(''); // Alert message state
    const [alertType, setAlertType] = useState(''); // 'success' or 'error'

    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    const fetchAllBlog = async () => {
        try {
            const response = await getAllBlogs();
            setPosts(response.data);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        }
    };

    const fetchComments = async (postId) => {
        try {
            const response = await getCommentsByPostId(postId);
            setComments(prevComments => ({
                ...prevComments,
                [postId]: response.data
            }));
        } catch (error) {
            console.error("Failed to fetch comments:", error);
        }
    };

    const openCommentsDrawer = (postId) => {
        setCurrentPostId(postId);
        fetchComments(postId);
        setDrawerVisible(true);
    };

    const handleAddComment = async () => {
        if (newComment.trim()) {
            try {
                const response = await addCommentToPost(currentPostId, newComment);
                setAlertMessage(response.message || "Comment added successfully!");
                setAlertType("success");

                fetchComments(currentPostId);
                setNewComment("");
            } catch (error) {
                console.error("Failed to add comment:", error);
                setAlertMessage(error.message || "Failed to add comment");
                setAlertType("error");
            }
        }
    };

    useEffect(() => {
        fetchAllBlog();
    }, []);

    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={items} style={{ flex: 1, minWidth: 0 }} />
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <div style={{ background: colorBgContainer, minHeight: 280, padding: 24, borderRadius: borderRadiusLG }}>
                    {posts.length > 0 ? (
                        <div className="post-list">
                            {posts.map((post, index) => (
                                <div key={post.id} className={`post-container ${index % 2 === 0 ? 'left-align' : 'right-align'}`}>
                                    <div className="post-image">
                                        <img src={post.imageUrl || 'https://via.placeholder.com/150'} alt={post.title} />
                                    </div>
                                    <div className="post-content">
                                        <h2>{post.title}</h2>
                                        <p>{post.body.substring(0, 150)}...</p>
                                        <p><strong>Author:</strong> {post.user.name}</p>
                                        <Button onClick={() => openCommentsDrawer(post.id)}>View Comments</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Loading posts...</p>
                    )}
                </div>
            </Content>

            <Drawer
                title="Comments"
                placement="right"
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
                width={400}
            >
                {/* New Comment Input */}
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

                {/* List of comments */}
                <div className="comments-section" style={{ marginTop: 16 }}>
                    {(comments[currentPostId] || []).map(comment => (
                        <div key={comment.id} className="comment" style={{
                            backgroundColor: '#f5f5f5',
                            padding: '12px',
                            marginBottom: '12px',
                            borderRadius: '8px',
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'flex-start'
                        }}>
                            <Avatar icon={<UserOutlined />} />
                            <div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%'
                                }}>
                                    <Text strong>{comment.user?.name || 'User'}</Text>
                                    <Text type="secondary" style={{fontSize: '12px', marginLeft:'150px'}}>
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                    </Text>
                                </div>

                                <Text>{comment.body}</Text>
                            </div>
                        </div>
                    ))}
                </div>
            </Drawer>
        </Layout>
    );
}

export default Home;
