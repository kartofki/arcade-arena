import { create } from "zustand";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebase/config";

const usePostStore = create((set) => ({
	posts: [],
	createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
	deletePost: async (id) => {
		// Update local state first
		set((state) => ({ posts: state.posts.filter((post) => post.id !== id) }));

		// Then remove the document from Firestore
		const postRef = doc(firestore, "posts", id);
		await deleteDoc(postRef);
	},
	setPosts: (posts) => set({ posts }),
	editPost: async (updatedPost) => {
		// Update local state
		set((state) => ({
			posts: state.posts.map((post) =>
				post.id === updatedPost.id ? updatedPost : post
			),
		}));

		// Update Firestore document
		const postRef = doc(firestore, "posts", updatedPost.id);
		await updateDoc(postRef, {
			title: updatedPost.title,
			body: updatedPost.body,
		});
	},
	addComment: (postId, comment) =>
		set((state) => ({
			posts: state.posts.map((post) => {
				if (post.id === postId) {
					return {
						...post,
						comments: [...post.comments, comment],
					};
				}
				return post;
			}),
		})),
}));

export default usePostStore;
