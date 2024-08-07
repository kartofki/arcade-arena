import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/config';
import useUserProfileStore from '../store/userProfileStore';

const useGetAllPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    const fetchUserProfile = async (userId) => {
        const userProfileStore = useUserProfileStore.getState();
        let userProfile = userProfileStore.profiles[userId];

        if (!userProfile) {
            try {
                const userProfileDoc = await getDoc(doc(firestore, "users", userId));
                userProfile = userProfileDoc.data();
                userProfileStore.setProfile(userId, userProfile);
            } catch (error) {
                console.error('Error fetching user profile: ', error);
            }
        }

        return userProfile;
    };

    useEffect(() => {
        const getPosts = async () => {
            setIsLoading(true);
            setPosts([]);

            try {
                const q = query(collection(firestore, "posts"), orderBy("createdAt", "desc"), limit(3));
                const querySnapshot = await getDocs(q);

                const posts = [];
                for (const doc of querySnapshot.docs) {
                    const post = { ...doc.data(), id: doc.id };
                    const userProfile = await fetchUserProfile(post.createdBy);

                    if (userProfile) {
                        post.username = userProfile.username;
                        post.profilePicURL = userProfile.profilePicURL || 'default-profile-pic-url'; 
                    } else {
                        post.username = 'Unknown User';
                        post.profilePicURL = 'default-profile-pic-url'; 
                    }

                    posts.push(post);
                }

                setPosts(posts);
            } catch (error) {
                console.error('Error fetching posts: ', error);
            } finally {
                setIsLoading(false);
            }
        };

        getPosts();
    }, []);

    return { isLoading, posts };
};

export default useGetAllPosts;
