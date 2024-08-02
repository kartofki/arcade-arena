import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/config"
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import useAuthStore from "../store/authStore";

const useSignUpWithEmailAndPassword = () => {
	const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth);
	const loginUser = useAuthStore((state) => state.login);

	const signup = async (inputs) => {
		if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
			console.log('error')
			return;
		}

		const usersRef = collection(firestore, "users");

		const q = query(usersRef, where("username", "==", inputs.username));
		const querySnapshot = await getDocs(q);

		if (!querySnapshot.empty) {
			console.log('error')
			return;
		}

		try {
			const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
			if (!newUser && error) {
				console.log('error')
				return;
			}
			if (newUser) {
				const userDoc = {
					uid: newUser.user.uid,
					email: inputs.email,
					username: inputs.username,
					fullName: inputs.fullName,
					bio: "",
					profilePicURL: "",
					followers: [],
					following: [],
					posts: [],
					createdAt: Date.now(),
				};
				await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
			}
		} catch (error) {
			console.log('error')
		}
	};

	return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;