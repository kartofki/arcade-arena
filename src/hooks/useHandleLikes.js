import { useState, useEffect, useCallback } from 'react';
import { firestore } from '../firebase/config'; // Ensure correct import of Firebase setup
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';

const useHandleLikes = (postId, userId) => {
    const [likes, setLikes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchLikes = useCallback(async () => {
        setIsLoading(true);
        try {
            const postDoc = await getDoc(doc(firestore, 'posts', postId));
            if (postDoc.exists()) {
                setLikes(postDoc.data().likes || []);
            }
        } catch (error) {
            console.error("Error fetching likes:", error);
        } finally {
            setIsLoading(false);
        }
    }, [postId]);

    const likePost = async () => {
        try {
            const postRef = doc(firestore, 'posts', postId);
            await updateDoc(postRef, {
                likes: arrayUnion(userId)
            });
            fetchLikes();
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const unlikePost = async () => {
        try {
            const postRef = doc(firestore, 'posts', postId);
            await updateDoc(postRef, {
                likes: arrayRemove(userId)
            });
            fetchLikes();
        } catch (error) {
            console.error("Error unliking post:", error);
        }
    };

    useEffect(() => {
        fetchLikes();
    }, [fetchLikes]);

    return { likes, isLoading, likePost, unlikePost };
};

export default useHandleLikes;
