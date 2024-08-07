import React from 'react';
import useGetAllPosts from '../hooks/useGetAllPosts';
import useLatestScores from '../hooks/useLatestScores'; // Use the updated hook
import NavBar from './NavBar';

const HomeAuth = () => {
    const { isLoading: postsLoading, posts } = useGetAllPosts();
    const { scores: latestScores, loading: scoresLoading } = useLatestScores();

    if (postsLoading || scoresLoading) {
        return (
            <>
                <NavBar />
                <div>Loading...</div>
            </>
        );
    }

    const getWordCount = (text) => text.split(/\s+/).length;

    return (
        <div>
            <NavBar />
            <div className="homeAuth">

                <hr />
                <h2 className="userNamex">Latest Scores</h2>
                <hr />
                <div className="scoresContainer">
                    {latestScores.length > 0 ? (
                        latestScores.map((score, index) => (
                            <div key={index} className="scoreItem">
                                <div>{score.username} played {score.game} and scored {score.score}.</div>
                            </div>
                        ))
                    ) : (
                        <div>No scores available.</div>
                    )}
                </div>
                <hr />
                <hr />
                <h2 className="userNamex">Latest Posts</h2>
                <hr />
                <div className="postsContainerx">
                    {posts.map((post) => (
                        <div key={post.id} className="postx">
                            <h3 className="post-titlex">{post.title}</h3>
                            <p className={`post-bodyx ${getWordCount(post.body) > 20 ? 'scrollable' : ''}`}>
                                {post.body}
                            </p>
                            <div className="post-detailsx">
                                <img src={post.profilePicURL || '/path/to/placeholder.png'} alt={`${post.username}'s profile`} className="profile-picx post-avatarx" />
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
