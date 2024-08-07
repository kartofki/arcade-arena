import React from 'react';
import { Tooltip, IconButton, Spinner } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import useHandleLikes from '../hooks/useHandleLikes';

const PostItem = ({ post, authUser, visitingOwnProfileAndAuth, handleEditPostOpen, handleDeletePost, handleViewPostOpen, isInModal }) => {
    const { likes, isLoading, likePost, unlikePost } = useHandleLikes(post.id, authUser.uid);

    const hasLiked = likes.includes(authUser.uid);

    if (isInModal) {
        return (
            <div className="post-actions">
                <IconButton
                    aria-label="Like Post"
                    icon={hasLiked ? <FaHeartBroken /> : <FaHeart />}
                    onClick={hasLiked ? unlikePost : likePost}
                    isLoading={isLoading}
                    mt="-6px"
                    mr="-20px"
                    variant="unstyled"
                    _hover={{ bg: 'transparent' }}
                    _active={{ bg: 'transparent' }}
                />
                {isLoading ? <Spinner size="sm" /> : <span>{likes.length} Likes</span>}
            </div>
        );
    }

    return (
        <div className="post">
            <div className="post-title">{post.title}</div>
            <div className="post-body">{getFirstFiveWords(post.body)} <button onClick={() => handleViewPostOpen(post)}>Read More</button></div>
            <div className="post-actions">
                {visitingOwnProfileAndAuth && (
                    <>
                        <Tooltip label="Edit Post" aria-label="Edit Post">
                            <EditIcon w={5} h={5} cursor="pointer" onClick={() => handleEditPostOpen(post)} />
                        </Tooltip>
                        <Tooltip label="Delete Post" aria-label="Delete Post">
                            <DeleteIcon w={5} h={5} color="red.500" cursor="pointer" onClick={() => handleDeletePost(post.id)} />
                        </Tooltip>
                    </>
                ) 
    }
                <IconButton
                    aria-label="Like Post"
                    icon={hasLiked ? <FaHeartBroken /> : <FaHeart />}
                    onClick={hasLiked ? unlikePost : likePost}
                    isLoading={isLoading}
                    variant="unstyled"
                    mt="-9px"
                    _hover={{ bg: 'transparent' }}
                    _active={{ bg: 'transparent' }}
                />
                {isLoading ? <Spinner size="sm" /> : <span>{likes.length} Likes</span>}
            </div>
        </div>
    );
};

const getFirstFiveWords = (text) => {
    const words = text.split(' ');
    return words.length > 5 ? words.slice(0, 5).join(' ') + '...' : text;
};

export default PostItem;
