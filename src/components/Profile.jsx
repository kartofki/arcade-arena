import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetUserProfileByUsername from '../hooks/useGetUserProfileByUsername';
import NavBar from './NavBar';
import useAuthStore from '../store/authStore';
import { useDisclosure } from '@chakra-ui/react';
import EditProfile from './EditProfile';
import CreatePost from './CreatePost';
import useGetUserPosts from '../hooks/useGetUserPosts';
import EditPost from './EditPost';
import usePostStore from '../store/postStore';
import useUserHighestScores from '../hooks/useUserHighestScores'; // Import the new hook

const Profile = () => {
    const { username } = useParams();
    const { isLoading: isUserProfileLoading, userProfile } = useGetUserProfileByUsername(username);
    const authUser = useAuthStore((state) => state.user);
    const visitingOwnProfileAndAuth = authUser && userProfile && authUser.username === userProfile.username;

    // Modal controls for EditProfile, CreatePost, and EditPost
    const { isOpen: isEditProfileOpen, onOpen: onEditProfileOpen, onClose: onEditProfileClose } = useDisclosure();
    const { isOpen: isCreatePostOpen, onOpen: onCreatePostOpen, onClose: onCreatePostClose } = useDisclosure();
    const { isOpen: isEditPostOpen, onOpen: onEditPostOpen, onClose: onEditPostClose } = useDisclosure();
    const [selectedPost, setSelectedPost] = useState(null);

    const { isLoading: isPostsLoading, posts } = useGetUserPosts(username);
    const { deletePost } = usePostStore();

    const { scores, loading: isScoresLoading } = useUserHighestScores(username); // Fetch highest scores

    const handleEditPostOpen = (post) => {
        setSelectedPost(post);
        onEditPostOpen();
    };

    const handleDeletePost = async (postId) => {
        await deletePost(postId);
    };

    console.log(userProfile, isUserProfileLoading);

    if (isUserProfileLoading) {
        return (
            <>
                <NavBar />
                <div>Loading...</div>
            </>
        );
    }

    if (!isUserProfileLoading && !userProfile) {
        return (
            <>
                <NavBar />
                <div>User not found</div>
            </>
        );
    }

    if (!isUserProfileLoading && userProfile) {
        return (
            <div>
                <NavBar />
                <div>{userProfile.username}'s profile!</div>
                <div>Created at: {userProfile.createdAt}</div>
                <div>Email: {userProfile.email}</div>
                <div>
                    Profile pic: <img src={userProfile.profilePicURL} alt={`${userProfile.username}'s profile`} />
                </div>
                {visitingOwnProfileAndAuth && (
                    <>
                        <button onClick={onEditProfileOpen}>Edit profile</button>
                        <button onClick={onCreatePostOpen}>Add Post</button>
                    </>
                )}
                {isEditProfileOpen && <EditProfile isOpen={isEditProfileOpen} onClose={onEditProfileClose} />}
                {isCreatePostOpen && <CreatePost isOpen={isCreatePostOpen} onClose={onCreatePostClose} />}
                {isEditPostOpen && <EditPost isOpen={isEditPostOpen} onClose={onEditPostClose} post={selectedPost} />}

                <div>
                    <h3>Highest Scores</h3>
                    {isScoresLoading ? (
                        <div>Loading scores...</div>
                    ) : (
                        <div>
                            <div>Tetris: {scores.tetris}</div>
                            <div>Snake: {scores.snake}</div>
                        </div>
                    )}
                </div>

                {isPostsLoading ? (
                    <div>Loading posts...</div>
                ) : (
                    posts.map((post) => (
                        <div key={post.id}>
                            <div>{post.title}</div>
                            <div>{post.body}</div>
                            {visitingOwnProfileAndAuth && (
                                <>
                                    <button onClick={() => handleEditPostOpen(post)}>Edit Post</button>
                                    <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        );
    }

    return null; // This handles any unexpected cases
};

export default Profile;
