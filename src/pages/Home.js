import React, { useEffect, useState } from 'react';
import { Layout, Menu, theme} from 'antd';
import './Home.scss';
import {  getAllBlogs } from "../service/BlogService";

import CommentDrawer from "../components/CommentDrawer";
import Post from "../components/Post";

const { Header, Content } = Layout;

const items = [
    { key: 1, label: "Home" },
    { key: 2, label: "Profile" },
    { key: 3, label: "Create Blog" }
];


const Home = () => {
    const [posts, setPosts] = useState([]);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [currentComments, setCurrentComments] = useState([]);
    const [currentPostId, setCurrentPostId] = useState(null);

    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    const fetchAllBlog = async () => {
        try {
            const response = await getAllBlogs();
            setPosts(response.data);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        }
    };

    const handleViewComments = (postId, comments) => {
        setCurrentPostId(postId);
        setCurrentComments(comments);
        setIsDrawerVisible(true);
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
                                <Post key={post.id} post={post} index={index} onViewComments={handleViewComments} />
                            ))}
                        </div>
                    ) : (
                        <p>Loading posts...</p>
                    )}
                </div>
            </Content>

            <CommentDrawer
                visible={isDrawerVisible}
                onClose={() => setIsDrawerVisible(false)}
                postId={currentPostId}
                initialComments={currentComments}
            />

        </Layout>
    );
}

export default Home;
