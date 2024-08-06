import React, { useState, useEffect } from 'react';

import usePostStore from '../store/postStore';
import useUserProfileStore from '../store/userProfileStore';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/config';

const useGetUserPosts = () => {
    const [postsIsLoading, setPostsIsLoading] = useState(true);
    const { posts, setPosts } = usePostStore();
 
    const userProfile = useUserProfileStore((state) => state.userProfile);

    useEffect(() => {
        const getPosts = async () => {
            if (!userProfile) {
                setPostsIsLoading(false);
                return;
            }

            setPostsIsLoading(true);
            setPosts([]);

            try {
                const q = query(collection(firestore, "posts"), where("createdBy", "==", userProfile.uid));
                const querySnapshot = await getDocs(q);

                const posts = [];
                querySnapshot.forEach((doc) => {
                    posts.push({ ...doc.data(), id: doc.id });
                });

                posts.sort((a, b) => b.createdAt - a.createdAt);
                setPosts(posts);
            } catch (error) {
                console.log('error')
                setPosts([]);
            } finally {
                setPostsIsLoading(false);
            }
        };

        getPosts();
    }, [setPosts, userProfile]);

    return { postsIsLoading, posts };
};

export default useGetUserPosts;
