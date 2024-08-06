import React, { useState, useEffect } from 'react';
import useShowToast from './useShowToast';
import usePostStore from '../store/postStore';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/config';

const useGetAllPosts = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { posts, setPosts } = usePostStore();
	const showToast = useShowToast();

	useEffect(() => {
		const getPosts = async () => {
			setIsLoading(true);
			setPosts([]);

			try {
				const q = collection(firestore, "posts");
				const querySnapshot = await getDocs(q);

				const posts = [];
				querySnapshot.forEach((doc) => {
					posts.push({ ...doc.data(), id: doc.id });
				});

				posts.sort((a, b) => b.createdAt - a.createdAt);
				setPosts(posts);
			} catch (error) {
				showToast("Error", error.message, "error");
				setPosts([]);
			} finally {
				setIsLoading(false);
			}
		};

		getPosts();
	}, [setPosts, showToast]);

	return { isLoading, posts };
};

export default useGetAllPosts;
