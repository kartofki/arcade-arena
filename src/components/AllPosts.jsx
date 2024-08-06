import React, { useState } from 'react';
import useGetAllPosts from '../hooks/useGetAllPosts';
import { Box, Button, Spinner, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar"

const AllPosts = () => {
    const { isLoading, posts } = useGetAllPosts();
    const navigate = useNavigate();

    const handleReadMore = (postId) => {
        navigate(`/posts/${postId}`);
    };

    return (
        <>
        <NavBar />
        <Box mt="5">
            {isLoading ? (
                <Box textAlign="center">
                    <Spinner size="xl" />
                </Box>
            ) : posts.length > 0 ? (
                <Box>
                    {posts.map((post) => (
                        <Box
                            key={post.id}
                            marginLeft="30"
                            p="12"
                            shadow="md"
                            borderWidth="1px"
                            mb="2"
                        >
                            <Text fontWeight="bold" marginLeft="5">{post.title}</Text>
                            <Text mt={6} ml={5} paddingBottom={5}>
                                {post.body ? post.body.substring(0, 100) : 'No content available'}...
                            </Text>
                            <Button mb={-10} ml={4} size="sm" onClick={() => handleReadMore(post.id)}>
                                Read more
                            </Button>
                        </Box>
                    ))}
                </Box>
            ) : (
                <Text>No posts available</Text>
            )}
        </Box>
        </>
    );
};

export default AllPosts;
