import React from 'react'
import CreatePost from './CreatePost'
import NavBar from './NavBar'
import useGetUserPosts from '../hooks/useGetUserPosts'
import { useEffect } from 'react'
import AllPosts from './AllPosts'

const Forum = () => {

    const {isLoading, posts} = useGetUserPosts();

    const noPostsFound = !isLoading && posts.length === 0;

    if(noPostsFound) return <div>No posts found</div>
  return (
    <div>
        <NavBar />
        <CreatePost />
       

			

       </div>
  )
}

export default Forum