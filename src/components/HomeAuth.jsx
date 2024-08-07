import React from 'react';
import useGetAllPosts from '../hooks/useGetAllPosts';
import NavBar from './NavBar';

const HomeAuth = () => {
    const { isLoading, posts } = useGetAllPosts();

    if (isLoading) {
        return (
            <>
                <NavBar />
                <div>Loading...</div>
            </>
        );
    }

    return (
        <div>
            <NavBar />
            <div className="tetrisPage">
                <hr />
                <hr />
                <h2 className="userNamex">Latest Posts</h2>
                <hr />
                <div className="postsContainerx">
                    {posts.map((post) => (
                        <div key={post.id} className="postx">
                            <h3 className="post-titlex">{post.title}</h3>
                            <p className="post-bodyx">{post.body}</p>
                            <div className="post-detailsx">
                                <img src={post.profilePicURL} alt={`${post.username}'s profile`} className="profile-picx post-avatarx" />
                                <div>
                                    Posted by: <a href={`/${post.username}`}>{post.username}</a>
                                </div>
                                <div>Created at: {new Date(post.createdAt).toLocaleString()}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeAuth;
