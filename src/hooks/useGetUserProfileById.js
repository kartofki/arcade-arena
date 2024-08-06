import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/config";
import useShowToast from "./useShowToast";

const useGetUserProfileById = (userId) => {
	const [userProfile, setUserProfile] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const showToast = useShowToast();

	useEffect(() => {
		const fetchUserProfile = async () => {
			if (!userId) return;

			setIsLoading(true);
			try {
				const docRef = doc(firestore, "users", userId);
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					setUserProfile(docSnap.data());
				} else {
					setError("User profile not found");
				}
			} catch (error) {
				setError(error.message);
				showToast("Error", error.message, "error");
			} finally {
				setIsLoading(false);
			}
		};

		fetchUserProfile();
	}, [userId, showToast]);

	return { userProfile, isLoading, error };
};

export default useGetUserProfileById;
