import { Box, Text, Spinner } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../hooks/useGetUserProfileById";

const FeedPost = ({ post }) => {
  const { userProfile, isLoading, error } = useGetUserProfileById(post.createdBy);

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

  return (
    <Box mb={6} p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <PostHeader mb={20} post={post} creatorProfile={userProfile} />
      <Text ml={7} mb={10} fontSize="2xl" fontWeight="bold" mt={4}>
        Title: {post.title}
      </Text>
      <Text mb={10} ml={5}>
        {post.body}
      </Text>
      <PostFooter mb={20} ml={20} post={post} creatorProfile={userProfile} />
    </Box>
  );
};

export default FeedPost;
