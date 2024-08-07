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
import { timeAgo } from '../utils/timeAgo'; // Import the timeAgo utility function
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Flex,
    Stack,
    Heading,
    Button
} from '@chakra-ui/react';

const Profile = () => {
    const { username } = useParams();
    const { isLoading: isUserProfileLoading, userProfile } = useGetUserProfileByUsername(username);
    const authUser = useAuthStore((state) => state.user);
    const visitingOwnProfileAndAuth = authUser && userProfile && authUser.username === userProfile.username;

    // Modal controls for EditProfile, CreatePost, EditPost, and ViewPost
    const { isOpen: isEditProfileOpen, onOpen: onEditProfileOpen, onClose: onEditProfileClose } = useDisclosure();
    const { isOpen: isCreatePostOpen, onOpen: onCreatePostOpen, onClose: onCreatePostClose } = useDisclosure();
    const { isOpen: isEditPostOpen, onOpen: onEditPostOpen, onClose: onEditPostClose } = useDisclosure();
    const { isOpen: isViewPostOpen, onOpen: onViewPostOpen, onClose: onViewPostClose } = useDisclosure();
    const [selectedPost, setSelectedPost] = useState(null);

    const { isLoading: isPostsLoading, posts } = useGetUserPosts(username);
    const { deletePost } = usePostStore();

    const { scores, loading: isScoresLoading } = useUserHighestScores(username); // Fetch highest scores

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
    };

    const getFirstFiveWords = (text) => {
        const words = text.split(' ');
        return words.length > 5 ? words.slice(0, 5).join(' ') + '...' : text;
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
                                        <button onClick={onCreatePostOpen}>Add Post</button>
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
                        {isCreatePostOpen && <CreatePost isOpen={isCreatePostOpen} onClose={onCreatePostClose} />}
                        {isEditPostOpen && <EditPost isOpen={isEditPostOpen} onClose={onEditPostClose} post={selectedPost} />}
                        {isViewPostOpen && (
                            <Modal isOpen={isViewPostOpen} onClose={onViewPostClose}>
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
                                                {visitingOwnProfileAndAuth && (
                                                    <Stack spacing={6} direction={["column", "row"]}>
                                                        <Button
                                                            bg={"red.400"}
                                                            color={"white"}
                                                            w='full'
                                                            size='sm'
                                                            _hover={{ bg: "red.500" }}
                                                            onClick={() => handleDeletePost(selectedPost.id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                        <Button
                                                            bg={"blue.400"}
                                                            color={"white"}
                                                            size='sm'
                                                            w='full'
                                                            _hover={{ bg: "blue.500" }}
                                                            onClick={() => handleEditPostOpen(selectedPost)}
                                                        >
                                                            Edit
                                                        </Button>
                                                    </Stack>
                                                )}
                                            </Stack>
                                        </Flex>
                                    </ModalBody>
                                </ModalContent>
                            </Modal>
                        )}
                    </div>
                    <div className="postsContainer">
                        {isPostsLoading ? (
                            <div>Loading posts...</div>
                        ) : (
                            posts.map((post) => (
                                <div key={post.id} className="post">
                                    <div className="post-title">{post.title}</div>
                                    <div className="post-body">{getFirstFiveWords(post.body)} <button onClick={() => handleViewPostOpen(post)}>Read More</button></div>
                                    <div className="post-actions">
                                        {visitingOwnProfileAndAuth ? (
                                            <>
                                                <button onClick={() => handleEditPostOpen(post)}>Edit Post</button>
                                               
                                                <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
                                            </>
                                        ) : (
                                            <button onClick={() => handleViewPostOpen(post)}>View Post</button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return null; // This handles any unexpected cases
};

export default Profile;
