import { create } from 'zustand';

const useUserProfileStore = create((set) => ({
    userProfile: null,
    profiles: {},
    setUserProfile: (userProfile) => set({ userProfile }),
    setProfile: (userId, profile) => set((state) => ({
        profiles: {
            ...state.profiles,
            [userId]: profile
        }
    })),
    addPost: (post) =>
        set((state) => ({
            userProfile: { ...state.userProfile, posts: [post.id, ...state.userProfile.posts] },
        })),
    deletePost: (postId) =>
        set((state) => ({
            userProfile: {
                ...state.userProfile,
                posts: state.userProfile.posts.filter((id) => id !== postId),
            },
        })),
}));

export default useUserProfileStore;
