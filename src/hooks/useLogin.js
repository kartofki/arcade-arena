import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";

const useLogin = () => {
    const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
    const loginUser = useAuthStore((state) => state.login);

    const login = async (inputs) => {
        if (!inputs.email || !inputs.password) {
            return; 
        }

        try {
            const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);

            if (userCred) {
                const docRef = doc(firestore, "users", userCred.user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    localStorage.setItem("user-info", JSON.stringify(userData));
                    loginUser(userData);
                } else {
                    console.log("No such document!");
                }
            }
        } catch (error) {
            console.log("Error logging in:", error.message);
        }
    };

    return { loading, error, login };
};

export default useLogin;
