import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const PostItem = ({ post }) => {
    return (
        <div>
    {post.title}{post.body}
        </div>

    );
};

export default PostItem;
