import React, { useEffect, useState } from 'react';
import { Box, Text, Heading, Spinner } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/config';
import NavBar from "./NavBar"

const PostView = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const docRef = doc(firestore, 'posts', postId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (isLoading) {
    return (
      <Box mb={6} p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Spinner size="lg" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mb={6} p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <>
    <NavBar />
    <Box mb={6} p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Heading as="h1" size="xl" mb={4}>
        {post.title}
      </Heading>
      <Text fontSize="md">
        {post.body}
      </Text>
    </Box>
    </>
  );
};

export default PostView;
