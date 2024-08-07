import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetUserProfileByUsername from '../hooks/useGetUserProfileByUsername';
import NavBar from './NavBar';
import useAuthStore from '../store/authStore';
import { useDisclosure, Tooltip } from '@chakra-ui/react';
import EditProfile from './EditProfile';
import CreatePost from './CreatePost';
import useGetUserPosts from '../hooks/useGetUserPosts';
import EditPost from './EditPost';
import usePostStore from '../store/postStore';
import useUserHighestScores from '../hooks/useUserHighestScores';
import { timeAgo } from '../utils/timeAgo';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import PostItem from './PostItem'; // Import the new PostItem component
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Flex,
    Stack,
    Heading
} from '@chakra-ui/react';

const Profile = () => {
    const { username } = useParams();
    const { isLoading: isUserProfileLoading, userProfile } = useGetUserProfileByUsername(username);
    const authUser = useAuthStore((state) => state.user);
    const visitingOwnProfileAndAuth = authUser && userProfile && authUser.username === userProfile.username;

    const { isOpen: isEditProfileOpen, onOpen: onEditProfileOpen, onClose: onEditProfileClose } = useDisclosure();
    const { isOpen: isCreatePostOpen, onOpen: onCreatePostOpen, onClose: onCreatePostClose } = useDisclosure();
    const { isOpen: isEditPostOpen, onOpen: onEditPostOpen, onClose: onEditPostClose } = useDisclosure();
    const { isOpen: isViewPostOpen, onOpen: onViewPostOpen, onClose: onViewPostClose } = useDisclosure();
    const [selectedPost, setSelectedPost] = useState(null);

    const { isLoading: isPostsLoading, posts } = useGetUserPosts(username);
    const { deletePost } = usePostStore();

    const { scores, loading: isScoresLoading } = useUserHighestScores(username);

    const handleEditPostOpen = (post) => {
        setSelectedPost(post);
        onEditPostOpen();
    };

    const handleViewPostOpen = (post) => {
        setSelectedPost(post);
        onViewPostOpen();
    };

    const handleDeletePost = async (postId) => {
        await deletePost(postId);
        onViewPostClose();
    };

    const handleViewPostClose = () => {
        setSelectedPost(null);
        onViewPostClose();
        window.location.reload(); // Trigger a page refresh
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
                <div className="tetrisPage">
                    <hr />
                    <hr />
                    <h2 className="userName">Profile</h2>
                    <hr></hr>
                    <div className="profileContainer">
                        <h2 className="userName">{userProfile.username}'s profile!</h2>
                        <div className="theFlexRow">
                            <div className="nameAndPic">
                                <img src={userProfile.profilePicURL} alt={`${userProfile.username}'s profile`} className="profile-pic" />
                                <div className="smallInfoContainer">
                                    <div className="smallInfo">Created: {timeAgo(new Date(userProfile.createdAt).getTime())}</div>
                                    <div className="smallInfo">Email: {userProfile.email}</div>
                                </div>
                                {visitingOwnProfileAndAuth && (
                                    <div className="profile-actions">
                                        <button onClick={onEditProfileOpen}>Edit profile</button>
                                        <CreatePost />
                                    </div>
                                )}
                            </div>
                            <div className="scoresDiv">
                                {isScoresLoading ? (
                                    <div>Loading scores...</div>
                                ) : (
                                    <div>
                                        <div className="allScores">Best scores:</div>
                                        <div>Tetris: {scores.tetris}</div>
                                        <div>Snake: {scores.snake}</div>
                                        <div>Flappy Bird: {scores.flappybird}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {isEditProfileOpen && <EditProfile isOpen={isEditProfileOpen} onClose={onEditProfileClose} />}
                       
                        {isEditPostOpen && <EditPost isOpen={isEditPostOpen} onClose={onEditPostClose} post={selectedPost} />}
                        {isViewPostOpen && (
                            <Modal isOpen={isViewPostOpen} onClose={handleViewPostClose}>
                                <ModalOverlay />
                                <ModalContent bg={"black"} boxShadow={"xl"} border={"1px solid gray"} mx={3}>
                                    <ModalHeader />
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Flex bg={"black"}>
                                            <Stack spacing={4} w={"full"} maxW={"md"} bg={"black"} p={6} my={0}>
                                                <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }} color={"white"}>
                                                    {selectedPost?.title}
                                                </Heading>
                                                <div className="post-body">{selectedPost?.body}</div>
                                                <PostItem
                                                    post={selectedPost}
                                                    authUser={authUser}
                                                    visitingOwnProfileAndAuth={visitingOwnProfileAndAuth}
                                                    handleEditPostOpen={handleEditPostOpen}
                                                    handleDeletePost={handleDeletePost}
                                                    handleViewPostOpen={handleViewPostOpen}
                                                    isInModal={true}
                                                />
                                            </Stack>
                                        </Flex>
                                    </ModalBody>
                                </ModalContent>
                            </Modal>
                        )}
                    </div>
                    <hr />
                    <h2 className="userName">Personal Log</h2>
                    <hr></hr>
                    <div className="postsContainer">
                        {isPostsLoading ? (
                            <div>Loading posts...</div>
                        ) : (
                            posts.map((post) => (
                                <PostItem
                                    key={post.id}
                                    post={post}
                                    authUser={authUser}
                                    visitingOwnProfileAndAuth={visitingOwnProfileAndAuth}
                                    handleEditPostOpen={handleEditPostOpen}
                                    handleDeletePost={handleDeletePost}
                                    handleViewPostOpen={handleViewPostOpen}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default Profile;
